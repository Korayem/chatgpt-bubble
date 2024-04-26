document.addEventListener('DOMContentLoaded', function() {
    const chatWidgetButton = document.getElementById('chatWidgetButton');

    chatWidgetButton.addEventListener('click', function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.scripting.executeScript({
                target: {tabId: tabs[0].id},
                files: ['js/contentScript.js']
            }, () => {
                chrome.tabs.sendMessage(tabs[0].id, {action: 'toggleChatWidget'});
            });
        });
    });
});