from flask import Flask, render_template
from flask_socketio import SocketIO, emit
from openai_api import get_openai_response
from stream_handler import stream_response

app = Flask(__name__)
socketio = SocketIO(app)

@app.route('/')
def index():
    return render_template('chat_interface.html')

@socketio.on('message_event')
def handle_message_event(chat_message):
    openai_response = get_openai_response(chat_message)
    emit('response_event', openai_response)

if __name__ == '__main__':
    socketio.run(app)