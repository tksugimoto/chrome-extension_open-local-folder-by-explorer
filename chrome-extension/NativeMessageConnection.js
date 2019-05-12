
class NativeMessageConnection {
    constructor(applicationName) {
        this._applicationName = applicationName;
        this._callbacks = [];
        this.isActive = false;
        this._connect();
    }

    _connect() {
        this._port = chrome.runtime.connectNative(this._applicationName);
        this._setupListener();
        this.isActive = true;
    }

    _setupListener() {
        this._port.onMessage.addListener(message => {
            // TODO: postしたmessageに対応するcallbackであることを保証する
            const callback = this._callbacks.shift();
            callback(message);
        });
        this._port.onDisconnect.addListener(() => {
            this.isActive = false;
        });
    }

    postMessage(message) {
        return new Promise(resolve => {
            if (!this.isActive) {
                this._connect();
            }
            this._callbacks.push(resolve);
            this._port.postMessage(message);
        });
    }
}

export default NativeMessageConnection;
