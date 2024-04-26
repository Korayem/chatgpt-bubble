chrome.runtime.onInstalled.addListener(() => {
  console.log('Website Comment Chrome Extension installed.');
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'injectChatWidget') {
    chrome.scripting.executeScript({
      target: { tabId: sender.tab.id },
      files: ['js/contentScript.js']
    });
  }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.active) {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ['js/contentScript.js']
    });
  }
});

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['js/contentScript.js']
  });
});