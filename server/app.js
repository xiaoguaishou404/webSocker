const WebSockets = require('ws');
const server = new WebSockets.Server({ port: 8000 });
server.on('connection', handleConnection)
function handleConnection(ws) {
    console.log("___建立了一个WebSocket链接___");
    ws.on('close', handleClose)
    ws.on('error', handleError)
    ws.on('message', handleMessage)
}
function handleClose() {
    console.log("___客户端close___");
}
function handleError(e) {
    console.log("___handleError___", e);
}
function handleMessage(data) {
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