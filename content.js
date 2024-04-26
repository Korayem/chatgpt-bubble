// content.js

const chatWidgetButtonId = 'chatWidgetButton';
const chatWidgetContainerId = 'chatWidgetContainer';
const chatInputId = 'chatInput';
const sendButtonId = 'sendButton';
const chatHistoryContainerId = 'chatHistoryContainer';

// Inject the chat widget HTML into the current page
function injectChatWidget() {
  const chatWidgetButton = document.createElement('button');
  chatWidgetButton.id = chatWidgetButtonId;
  chatWidgetButton.textContent = 'Chat';
  document.body.appendChild(chatWidgetButton);

  const chatWidgetContainer = document.createElement('div');
  chatWidgetContainer.id = chatWidgetContainerId;
  chatWidgetContainer.innerHTML = `
    <div id="${chatHistoryContainerId}"></div>
    <input type="text" id="${chatInputId}" placeholder="Type your message here...">
    <button id="${sendButtonId}">Send</button>
  `;
  document.body.appendChild(chatWidgetContainer);

  // Add event listeners
  chatWidgetButton.addEventListener('click', toggleChatWidget);
  document.getElementById(sendButtonId).addEventListener('click', sendMessage);
}

// Toggle the chat widget visibility
function toggleChatWidget() {
  const chatWidgetContainer = document.getElementById(chatWidgetContainerId);
  chatWidgetContainer.style.display = chatWidgetContainer.style.display === 'none' ? 'block' : 'none';
}

// Send message from the chat input
function sendMessage() {
  const chatInput = document.getElementById(chatInputId);
  const message = chatInput.value.trim();
  if (message) {
    // Send message to background script for processing
    chrome.runtime.sendMessage({ type: 'sendMessage', message: message }, (response) => {
      if (response) {
        updateChatHistory(response);
      }
    });
    chatInput.value = '';
  }
}

// Update the chat history in the UI
function updateChatHistory(message) {
  const chatHistoryContainer = document.getElementById(chatHistoryContainerId);
  const messageBubble = document.createElement('div');
  messageBubble.textContent = message;
  chatHistoryContainer.appendChild(messageBubble);
}

// Fetch and clean the current page context
function fetchPageContext() {
  chrome.runtime.sendMessage({ type: 'fetchPageContext' }, (response) => {
    if (response) {
      // Inject the cleaned and converted context into the system message prompt
      // This part will be handled by the background script
    }
  });
}

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'injectChatWidget') {
    injectChatWidget();
    fetchPageContext();
    sendResponse({ status: 'Chat widget injected' });
  }
});

// Inject the chat widget when the content script loads
injectChatWidget();