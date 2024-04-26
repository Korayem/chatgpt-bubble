// Load settings from storage and populate the form fields
function loadSettings() {
  chrome.storage.sync.get(['apiKeys', 'userSettings'], function (data) {
    if (data.apiKeys) {
      for (const provider in data.apiKeys) {
        const apiKeyInput = document.getElementById(`apiKeyInput-${provider}`);
        if (apiKeyInput) {
          apiKeyInput.value = data.apiKeys[provider];
        }
      }
    }
    if (data.userSettings) {
      for (const setting in data.userSettings) {
        const settingInput = document.getElementById(setting);
        if (settingInput) {
          settingInput.value = data.userSettings[setting];
        }
      }
    }
  });
}

// Save settings to storage
function saveSettings() {
  const apiKeys = {};
  const userSettings = {};

  document.querySelectorAll('.api-key-input').forEach(input => {
    const provider = input.dataset.provider;
    apiKeys[provider] = input.value;
  });

  document.querySelectorAll('.user-setting-input').forEach(input => {
    userSettings[input.id] = input.value;
  });

  chrome.storage.sync.set({ apiKeys, userSettings }, function () {
    console.log('Settings saved.');
  });
}

// Event listener for the settings form submission
document.getElementById('settingsForm').addEventListener('submit', function (event) {
  event.preventDefault();
  saveSettings();
});

// Initialize the options page by loading the current settings
document.addEventListener('DOMContentLoaded', loadSettings);