'use strict';

chrome.omnibox.onInputChanged.addListener(
  function(text, suggest) {
    suggest([
        {content: text + " (github)", description: text + "(github)"},
        {content: text + " (bitbucket)", description: text + "(bitbucket)"}
    ]);
  });

chrome.omnibox.onInputEntered.addListener(
  function(text) {
    var url = '';
    if( text.includes('(github)') ) {
      var t = text.replace(' (github)','');
      url = 'https://github.com/search?q=' + t;
    } else if( text.includes('(bitbucket)') ) {
      var t = text.replace(' (bitbucket)','');
      // i don't actually have a bitbucket account... this will look into the Chromium Embedded Framework account/repo...
      var bbacc = '%7Bdc443723-7652-4c63-b340-033e522146db%7D';
      url = `https://bitbucket.org/search?account=${bbacc}&q=` + t;
    } else {
      url = 'https://www.google.com/search?num=100&q=' + encodeURIComponent(text);
    }
    chrome.tabs.query({active: true}, function(tab) {
      chrome.tabs.update(tab.id, {url: url});
    });
  });
