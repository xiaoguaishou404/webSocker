const WebSockets = require('ws');
const server = new WebSockets.Server({ port: 8000 });
server.on('connection', handleConnection)
function handleConnection(ws) {
    console.log("___server is connected___");
    ws.on('close', handleClose)
    ws.on('error', handleError)
    ws.on('message', handleMessage)
}
function handleClose() {
    console.log("___server is disconnected___");
    this.send(JSON.stringify({
        message: '___server is disconnected___',
        mode: 'MESSAGE'
    }))
}
function handleError(e) {
    console.log("___server is error___", e);
}
function handleMessage(data) {
    console.log("___server is message___");
    const { mode, msg } = JSON.parse(data);
    switch (mode) {
        case 'MESSAGE':
            console.log('___User message___');
            this.send(JSON.stringify(JSON.parse(data)))
            break
        case 'HEART_BEAT':
            console.log('___User heartbeat___');
            this.send(JSON.stringify(JSON.parse(data)))
            break
        default:
            break
    }
}