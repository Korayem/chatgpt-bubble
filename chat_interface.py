from flask import Flask, render_template, request
from flask_socketio import SocketIO, emit

app = Flask(__name__)
socketio = SocketIO(app)

@app.route('/')
def index():
    return render_template('chat.html')

@socketio.on('message_event')
def handle_message_event(chat_message):
    emit('response_event', {'data': chat_message}, broadcast=True)

if __name__ == '__main__':
    socketio.run(app)