Shared Dependencies for the Website Comment Chrome Extension:

Exported Variables:
- `apiKeys`: Object containing API keys for different GenAI providers.
- `userSettings`: Object containing user preferences such as `max_tokens`, `temperature`, etc.
- `chatHistory`: Object to store chat history per tab.
- `currentTabContext`: String containing the Markdown-converted content of the current tab.

Data Schemas:
- `ProviderSettings`: Schema for storing settings for each GenAI provider including `model`, `serverURL`, `apiKey`, `max_tokens`, `temperature`, etc.
- `TabChatHistory`: Schema for storing chat history associated with a specific tab ID.
- `PageContext`: Schema for storing the cleaned and converted context of the current page.

ID Names of DOM Elements:
- `chatWidgetButton`: ID for the floating button to open the chat widget.
- `chatWidgetContainer`: ID for the container of the chat widget.
- `chatInput`: ID for the input text field in the chat widget.
- `sendButton`: ID for the send button in the chat widget.
- `chatHistoryContainer`: ID for the container displaying chat history messages.
- `settingsForm`: ID for the settings form in the options page.
- `apiKeyInput`: ID for the input field for API keys in the settings form.

Message Names:
- `injectChatWidget`: Message name for the command to inject the chat widget into the current page.
- `saveChatHistory`: Message name for the command to save the current chat history.
- `updateSettings`: Message name for the command to update user settings.
- `fetchPageContext`: Message name for the command to fetch the current page context.

Function Names:
- `initChatWidget`: Function to initialize the chat widget on the page.
- `sendMessage`: Function to send a message from the chat input.
- `receiveMessage`: Function to receive and display a message in the chat widget.
- `saveSettings`: Function to save user settings to Chrome Storage.
- `loadSettings`: Function to load user settings from Chrome Storage.
- `convertToMarkdown`: Function in `markdownConverter.js` to convert HTML content to Markdown.
- `cleanDOM`: Function in `domCleaner.js` to clean up non-content HTML tags.
- `storeChatHistory`: Function to store chat history in Chrome Storage.
- `retrieveChatHistory`: Function to retrieve chat history from Chrome Storage.
- `updateChatHistory`: Function to update the chat history in the UI.
- `injectContentScript`: Function in `background.js` to inject the content script into the current tab.
- `fetchGenAIResponse`: Function in `api.js` to fetch responses from GenAI endpoints.

Please note that the actual implementation may require additional shared dependencies or slight variations in naming conventions based on the specific requirements and coding standards.