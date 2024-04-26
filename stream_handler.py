from flask_socketio import SocketIO, emit
from openai_api import get_openai_response

socketio = SocketIO()

@socketio.on('message_event')
def handle_message_event(chat_message):
    openai_response = get_openai_response(chat_message)
    stream_response(openai_response)

def stream_response(openai_response):
    emit('response_event', openai_response)