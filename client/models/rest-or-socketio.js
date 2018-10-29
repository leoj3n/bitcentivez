const restOrSocketio = System.isPlatform('window') ? 'socketio' : 'rest';

export default restOrSocketio;
