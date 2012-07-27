// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var tabId = parseInt(window.location.search.substring(1));

window.addEventListener("load", function() {
  chrome.debugger.sendCommand({tabId:tabId}, "Network.enable");
  chrome.debugger.onEvent.addListener(onEvent);
});

window.addEventListener("unload", function() {
  chrome.debugger.detach({tabId:tabId});
});

var requests = {};

function onEvent(debuggeeId, message, params) {
  if (tabId != debuggeeId.tabId)
    return;

  if (message == "Network.requestWillBeSent") {
    var requestDiv = requests[params.requestId];
    if (!requestDiv) {
      var requestDiv = document.createElement("div");
      requestDiv.className = "request";
      requests[params.requestId] = requestDiv;
      var urlLine = document.createElement("div");
      urlLine.textContent = params.request.url;
      requestDiv.appendChild(urlLine);
    }

    host = parseURL(params.request.url).host;
    if( host.indexOf("appspot.com") != -1){
      // We found a Json request
      $.getJSON(params.request.url, function(data) {
        if( data.hasOwnProperty("quiz") ){
          $('.genre').html( data['quiz']['genreName'] );
          $('.answers').html(' ');
          $(data['quiz']['questions']).each( function(){
            var question = this,
                answerIndex = question['answerIndex'],
                answer = question['songs'][answerIndex];
            $listItem = $('<li></li>');
            $listItem.html(answer['artist'] + " - " + answer['title']);
            $('.answers').append($listItem);
          });
        }
      });
    }
  }
}

function parseURL(url) {
  var result = {};
  var match = url.match(
      /^([^:]+):\/\/([^\/:]*)(?::([\d]+))?(?:(\/[^#]*)(?:#(.*))?)?$/i);
  if (!match)
    return result;
  result.scheme = match[1].toLowerCase();
  result.host = match[2];
  result.port = match[3];
  result.path = match[4] || "/";
  result.fragment = match[5];
  return result;
}
