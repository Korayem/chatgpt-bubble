// js/api.js

const fetchGenAIResponse = async (provider, prompt, settings) => {
  const endpoint = settings[provider].serverURL;
  const apiKey = settings[provider].apiKey;
  const data = {
    prompt: prompt,
    max_tokens: settings[provider].max_tokens,
    temperature: settings[provider].temperature,
    model: settings[provider].model,
    ...settings[provider].additionalSettings
  };

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`Error from ${provider}: ${response.statusText}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error(`fetchGenAIResponse error: ${error}`);
    throw error;
  }
};

const getProviderSettings = async () => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(['userSettings'], (result) => {
      if (chrome.runtime.lastError) {
        reject(new Error('Failed to retrieve settings from storage.'));
      } else {
        resolve(result.userSettings || {});
      }
    });
  });
};

const sendGenAIRequest = async (prompt) => {
  try {
    const settings = await getProviderSettings();
    const provider = settings.defaultProvider || 'OpenAI'; // Default to OpenAI if no provider is set
    const response = await fetchGenAIResponse(provider, prompt, settings);
    return response;
  } catch (error) {
    console.error(`sendGenAIRequest error: ${error}`);
    throw error;
  }
};