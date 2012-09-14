console.log('I create contact');

(function() {
var script = document.createElement('script'); script.type = 'text/javascript'; script.async = true;
script.src = chrome.extension.getURL('inline.js'); 
var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(script, s);
})();
