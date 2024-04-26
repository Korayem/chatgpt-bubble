// js/chatWidget.js

const chatWidgetButton = document.createElement('button');
chatWidgetButton.id = 'chatWidgetButton';
chatWidgetButton.textContent = 'Chat';
document.body.appendChild(chatWidgetButton);

const chatWidgetContainer = document.createElement('div');
chatWidgetContainer.id = 'chatWidgetContainer';
chatWidgetContainer.style.display = 'none';
document.body.appendChild(chatWidgetContainer);

const chatHistoryContainer = document.createElement('div');
chatHistoryContainer.id = 'chatHistoryContainer';
chatWidgetContainer.appendChild(chatHistoryContainer);

const chatInput = document.createElement('input');
chatInput.id = 'chatInput';
chatInput.type = 'text';
chatInput.placeholder = 'Type your message...';
chatWidgetContainer.appendChild(chatInput);

const sendButton = document.createElement('button');
sendButton.id = 'sendButton';
sendButton.textContent = 'Send';
chatWidgetContainer.appendChild(sendButton);

chatWidgetButton.addEventListener('click', () => {
  const isHidden = chatWidgetContainer.style.display === 'none';
  chatWidgetContainer.style.display = isHidden ? 'block' : 'none';
});

sendButton.addEventListener('click', () => {
  const message = chatInput.value.trim();
  if (message) {
    sendMessage(message);
    chatInput.value = '';
  }
});

function initChatWidget() {
  retrieveChatHistory().then(history => {
    if (history) {
      history.forEach(msg => {
        receiveMessage(msg);
      });
    }
  });
}

function sendMessage(message) {
  const messageBubble = document.createElement('div');
  messageBubble.textContent = message;
  chatHistoryContainer.appendChild(messageBubble);
  storeChatHistory(message);
  fetchGenAIResponse(message).then(response => {
    receiveMessage(response);
  });
}

function receiveMessage(message) {
  const messageBubble = document.createElement('div');
  messageBubble.textContent = message;
  chatHistoryContainer.appendChild(messageBubble);
}

function storeChatHistory(message) {
  // Assuming retrieveChatHistory and storeChatHistory are implemented in js/storage.js
  retrieveChatHistory().then(history => {
    const updatedHistory = history ? [...history, message] : [message];
    chrome.storage.local.set({ chatHistory: updatedHistory });
  });
}

function retrieveChatHistory() {
  return new Promise(resolve => {
    chrome.storage.local.get(['chatHistory'], result => {
      resolve(result.chatHistory);
    });
  });
}

function fetchGenAIResponse(message) {
  // Assuming fetchGenAIResponse is implemented in js/api.js
  // This function should return a promise that resolves with the response from the GenAI endpoint
  // The actual implementation will depend on the API specifics and is not provided here
}

// Initialize the chat widget when the script loads
initChatWidget();