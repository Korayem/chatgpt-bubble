// Define the storage keys for the extension
const STORAGE_KEYS = {
  API_KEYS: 'apiKeys',
  USER_SETTINGS: 'userSettings',
  CHAT_HISTORY: 'chatHistory'
};

// Save API keys to Chrome Storage
function saveApiKeys(apiKeys) {
  chrome.storage.local.set({ [STORAGE_KEYS.API_KEYS]: apiKeys });
}

// Load API keys from Chrome Storage
function loadApiKeys(callback) {
  chrome.storage.local.get([STORAGE_KEYS.API_KEYS], (result) => {
    callback(result[STORAGE_KEYS.API_KEYS] || {});
  });
}

// Save user settings to Chrome Storage
function saveUserSettings(userSettings) {
  chrome.storage.local.set({ [STORAGE_KEYS.USER_SETTINGS]: userSettings });
}

// Load user settings from Chrome Storage
function loadUserSettings(callback) {
  chrome.storage.local.get([STORAGE_KEYS.USER_SETTINGS], (result) => {
    callback(result[STORAGE_KEYS.USER_SETTINGS] || {});
  });
}

// Save chat history for a specific tab to Chrome Storage
function saveChatHistory(tabId, chatHistory) {
  chrome.storage.local.get([STORAGE_KEYS.CHAT_HISTORY], (result) => {
    const allChatHistories = result[STORAGE_KEYS.CHAT_HISTORY] || {};
    allChatHistories[tabId] = chatHistory;
    chrome.storage.local.set({ [STORAGE_KEYS.CHAT_HISTORY]: allChatHistories });
  });
}

// Load chat history for a specific tab from Chrome Storage
function loadChatHistory(tabId, callback) {
  chrome.storage.local.get([STORAGE_KEYS.CHAT_HISTORY], (result) => {
    const allChatHistories = result[STORAGE_KEYS.CHAT_HISTORY] || {};
    callback(allChatHistories[tabId] || []);
  });
}

// Clear chat history for a specific tab from Chrome Storage
function clearChatHistory(tabId) {
  chrome.storage.local.get([STORAGE_KEYS.CHAT_HISTORY], (result) => {
    const allChatHistories = result[STORAGE_KEYS.CHAT_HISTORY] || {};
    delete allChatHistories[tabId];
    chrome.storage.local.set({ [STORAGE_KEYS.CHAT_HISTORY]: allChatHistories });
  });
}