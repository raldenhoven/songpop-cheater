// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Props to the live HTTP headers example
// http://code.google.com/chrome/extensions/trunk/samples.html#cc8563a6666add797264184a960c7b7c8bd3e64d

chrome.browserAction.onClicked.addListener(function() {
  chrome.windows.getCurrent(function(win) {
    chrome.tabs.getSelected(win.id, actionClicked);
  });
});

var version = "1.0";

function actionClicked(tab) {
  chrome.debugger.attach({tabId:tab.id}, version, onAttach.bind(null, tab.id));
}

function onAttach(tabId) {
  // Show erros
  if (chrome.extension.lastError) {
    alert(chrome.extension.lastError.message);
    return;
  }

  // Get the current tab url
  var tablink;
  chrome.tabs.getSelected(null,function(tab) {
    tablink = tab.url;
    //Only works on the songpop page on facebook
  if( tablink.indexOf("apps.facebook.com/songpop") != -1){
    // We are on the right page... launch second html
    chrome.windows.create(
     {url: "cheat.html?" + tabId, type: "popup", width: 400, height: 400});
  }else{
    alert('Go to https://apps.facebook.com/songpop/ to use this plugin!!!');
  }
  });
  
}

