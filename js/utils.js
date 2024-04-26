// Utility functions for the Website Comment Chrome Extension

const getActiveTab = () => {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (chrome.runtime.lastError) {
        reject(new Error(chrome.runtime.lastError));
      } else {
        resolve(tabs[0]);
      }
    });
  });
};

const sendMessageToTab = (tabId, message) => {
  return new Promise((resolve, reject) => {
    chrome.tabs.sendMessage(tabId, message, (response) => {
      if (chrome.runtime.lastError) {
        reject(new Error(chrome.runtime.lastError));
      } else {
        resolve(response);
      }
    });
  });
};

const updateBadge = (text) => {
  chrome.action.setBadgeText({ text });
};

const checkForValidUrl = (tab) => {
  // Define the URL pattern for the pages where the chat widget should be active
  const urlPattern = /^https?:\/\/.+/; // Adjust this pattern to match the desired URLs
  return urlPattern.test(tab.url);
};

const escapeHTML = (str) => {
  // This function ensures that text is escaped before being used as HTML
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
};

const injectScript = (tabId, file) => {
  return new Promise((resolve, reject) => {
    chrome.scripting.executeScript({
      target: { tabId },
      files: [file],
    }, (injectionResults) => {
      if (chrome.runtime.lastError) {
        reject(new Error(chrome.runtime.lastError));
      } else {
        resolve(injectionResults);
      }
    });
  });
};

const storeData = (key, data) => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.set({ [key]: data }, () => {
      if (chrome.runtime.lastError) {
        reject(new Error(chrome.runtime.lastError));
      } else {
        resolve();
      }
    });
  });
};

const retrieveData = (key) => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(key, (result) => {
      if (chrome.runtime.lastError) {
        reject(new Error(chrome.runtime.lastError));
      } else {
        resolve(result[key]);
      }
    });
  });
};

// Export utility functions for use in other modules
export {
  getActiveTab,
  sendMessageToTab,
  updateBadge,
  checkForValidUrl,
  escapeHTML,
  injectScript,
  storeData,
  retrieveData
};