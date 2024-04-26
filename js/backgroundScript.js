chrome.runtime.onInstalled.addListener( () =>
{
  console.log( 'Website Comment Chrome Extension installed.' );
} );

chrome.tabs.onUpdated.addListener( ( tabId, changeInfo, tab ) =>
{
  if ( changeInfo.status === 'complete' && tab.url )
  {
    chrome.scripting.executeScript( {
      target: { tabId: tabId },
      files: [ 'js/contentScript.js' ]
    } );
  }
} );

chrome.runtime.onMessage.addListener( ( request, sender, sendResponse ) =>
{
  if ( request.message === 'injectChatWidget' )
  {
    chrome.scripting.insertCSS( {
      target: { tabId: sender.tab.id },
      files: [ 'css/content.css' ]
    } );
    chrome.scripting.executeScript( {
      target: { tabId: sender.tab.id },
      files: [ 'js/chatWidget.js' ]
    } );
  } else if ( request.message === 'saveChatHistory' )
  {
    chrome.storage.local.set( { [ request.tabId ]: request.chatHistory }, () =>
    {
      console.log( 'Chat history saved for tab: ' + request.tabId );
    } );
  } else if ( request.message === 'updateSettings' )
  {
    chrome.storage.sync.set( { userSettings: request.settings }, () =>
    {
      console.log( 'User settings updated' );
    } );
  } else if ( request.message === 'fetchPageContext' )
  {
    chrome.scripting.executeScript( {
      target: { tabId: sender.tab.id },
      func: fetchPageContext,
      args: [ sender.tab.id ]
    }, ( results ) =>
    {
      if ( results && results.length > 0 )
      {
        sendResponse( { context: results[ 0 ].result } );
      }
    } );
    return true; // Indicates that the response is asynchronous
  }
} );

function fetchPageContext ( tabId )
{
  // This function will be executed in the context of the webpage, not the extension
  const bodyText = document.body.innerText;
  return bodyText; // Placeholder for actual context fetching logic
}