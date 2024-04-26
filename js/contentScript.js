// contentScript.js

(function() {
  const chatWidgetHtml = `
    <div id="chatWidgetContainer" class="chat-widget-container">
      <div id="chatHistoryContainer" class="chat-history-container"></div>
      <div class="chat-input-container">
        <input type="text" id="chatInput" class="chat-input" placeholder="Type your message...">
        <button id="sendButton" class="send-button">Send</button>
      </div>
    </div>
  `;

  const chatWidgetButtonHtml = `
    <button id="chatWidgetButton" class="chat-widget-button">Chat</button>
  `;

  // Inject the chat widget button into the page
  document.body.insertAdjacentHTML('beforeend', chatWidgetButtonHtml);
  const chatWidgetButton = document.getElementById('chatWidgetButton');

  // Event listener for the chat widget button
  chatWidgetButton.addEventListener('click', function() {
    // Check if the chat widget is already present
    if (!document.getElementById('chatWidgetContainer')) {
      // Inject the chat widget into the page
      document.body.insertAdjacentHTML('beforeend', chatWidgetHtml);
      initChatWidget();
    }
  });

  function initChatWidget() {
    const chatInput = document.getElementById('chatInput');
    const sendButton = document.getElementById('sendButton');
    const chatHistoryContainer = document.getElementById('chatHistoryContainer');

    // Load chat history for the current tab
    chrome.runtime.sendMessage({ message: 'retrieveChatHistory' }, function(response) {
      if (response && response.chatHistory) {
        chatHistoryContainer.innerHTML = response.chatHistory;
      }
    });

    // Event listener for the send button
    sendButton.addEventListener('click', function() {
      const message = chatInput.value.trim();
      if (message) {
        sendMessage(message);
        chatInput.value = '';
      }
    });

    // Event listener for the enter key in the chat input
    chatInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        sendButton.click();
      }
    });
  }

  function sendMessage(message) {
    // Send the message to the background script to process and get a response
    chrome.runtime.sendMessage({ message: 'fetchGenAIResponse', text: message }, function(response) {
      if (response && response.answer) {
        receiveMessage(response.answer);
      }
    });
  }

  function receiveMessage(answer) {
    const chatHistoryContainer = document.getElementById('chatHistoryContainer');
    const messageBubble = document.createElement('div');
    messageBubble.className = 'message-bubble';
    messageBubble.textContent = answer;
    chatHistoryContainer.appendChild(messageBubble);

    // Save the updated chat history
    chrome.runtime.sendMessage({ message: 'saveChatHistory', chatHistory: chatHistoryContainer.innerHTML });
  }

  // Clean up the current page and convert it to Markdown for context
  chrome.runtime.sendMessage({ message: 'fetchPageContext' }, function(response) {
    if (response && response.pageContext) {
      // Send the page context to the chat widget as a system message
      receiveMessage(`Page context: ${response.pageContext}`);
    }
  });

  // Listen for messages from the background script
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.message === 'updateChatHistory') {
      const chatHistoryContainer = document.getElementById('chatHistoryContainer');
      if (chatHistoryContainer) {
        chatHistoryContainer.innerHTML = request.chatHistory;
      }
    }
  });
})();