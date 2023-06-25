
const WS_MODE = {
    MESSAGE: "MESSAGE",
    HEART_BEAT: "HEART_BEAT"
}
class Ws extends WebSocket {
    constructor(url, wsReConnect) {
        super(url);
        this.wsUrl = url
        this.heartBeatTimer = null
        this.reconnectingTimer = null
        this.wsReConnect = wsReConnect
        this.init()
    }
    static create(url, wsReConnect) {
        return new Ws(url, wsReConnect)
    }
    init() {
        this.bindEvent()
    }
    bindEvent() {
        this.addEventListener('open', this.handleOpen, false)
        this.addEventListener('message', this.handleMessage, false)
        this.addEventListener('close', this.handleClose, false)
        this.addEventListener('error', this.handleError, false)
    }
    handleOpen() {
        console.log("______WebSocket is connected___");
        this.startHeartBeat()
    }
    handleMessage({ data }) {
        const { mode, msg } = this.receiveMsg(data)
        switch (mode) {
            case WS_MODE.HEART_BEAT:
                console.log("___HEART_BEAT___", msg);
                break
            case WS_MODE.MESSAGE:
                console.log("___MESSAGE___", msg);
                break
        }

    }
    handleClose() {
        console.log("___client is close___");
        if (this.heartBeatTimer) {
            clearInterval(this.heartBeatTimer)
            this.heartBeatTimer = null
        }
        if (this.reconnectingTimer) {
            clearTimeout(this.reconnectingTimer)
            this.reconnectingTimer = null
        }
        this.reconnect()
    }
    handleError(e) {
        console.log("___handleError___", e);
        this.reconnect()
    }
    reconnect() {
        console.log("___reconnecting___");
        this.reconnectingTimer = setTimeout(() => {
            this.wsReConnect()
        }, 1000)
    }
    startHeartBeat() {
        this.heartBeatTimer = setInterval(() => {
            if (this.readyState === 1) {
                this.sendMsg({
                    mode: WS_MODE.HEART_BEAT,
                    msg: "___HEART_BEAT___"
                })
            } else {
                clearInterval(this.heartBeatTimer)
                this.heartBeatTimer = null
            }
        }, 2000)

    }

    receiveMsg(data) {
        return JSON.parse(data)

    }
    sendMsg(data) {
        this.readyState === 1 && this.send(JSON.stringify(data))
    }
}
export default Ws