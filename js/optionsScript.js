document.addEventListener( 'DOMContentLoaded', function ()
{
    const settingsForm = document.getElementById( 'settingsForm' );
    const apiKeyInput = document.getElementById( 'openAIKey' );
    const modelSelect = document.getElementById( 'openAIModel' );
    const serverURLInput = document.getElementById( 'openRouterKey' );
    const maxTokensInput = document.getElementById( 'maxTokens' );
    const temperatureInput = document.getElementById( 'temperature' );

    // Load settings from storage and populate the form
    function loadSettings ()
    {
        chrome.storage.sync.get( [ 'userSettings' ], function ( result )
        {
            if ( result.userSettings )
            {
                apiKeyInput.value = result.userSettings.apiKey || '';
                modelSelect.value = result.userSettings.model || '';
                serverURLInput.value = result.userSettings.serverURL || '';
                maxTokensInput.value = result.userSettings.max_tokens || '';
                temperatureInput.value = result.userSettings.temperature || '';
            }
        } );
    }

    // Save settings to storage
    function saveSettings ()
    {
        const userSettings = {
            apiKey: apiKeyInput.value,
            model: modelSelect.value,
            serverURL: serverURLInput.value,
            max_tokens: maxTokensInput.value,
            temperature: temperatureInput.value
        };

        chrome.storage.sync.set( { userSettings }, function ()
        {
            console.log( 'Settings saved' );
        } );
    }

    // Event listener for form submission
    settingsForm.addEventListener( 'submit', function ( event )
    {
        event.preventDefault();
        saveSettings();
    } );

    // Initialize settings form on load
    loadSettings();
} );
