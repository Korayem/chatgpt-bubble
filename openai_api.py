import openai
import requests

openai.api_key = 'your-api-key'

def get_openai_response(chat_message):
    try:
        response = openai.Completion.create(
          engine="text-davinci-002",
          prompt=chat_message,
          max_tokens=150
        )
        openai_response = response.choices[0].text.strip()
        return openai_response
    except Exception as e:
        print(f"Error in getting response from OpenAI: {e}")
        return None