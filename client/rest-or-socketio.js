const restOrSocketio = System.isPlatform('window') ? 'socketio' : 'rest';

console.log('PLATFORM: ', restOrSocketio);

export default restOrSocketio;
