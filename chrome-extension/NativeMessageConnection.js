
class NativeMessageConnection {
    constructor(applicationName) {
        this._applicationName = applicationName;
        this._callbacks = [];
        this._connect();
    }

    _connect() {
        this._port = chrome.runtime.connectNative(this._applicationName);
        this._setupListener();
    }

    _setupListener() {
        this._port.onMessage.addListener(message => {
            // TODO: postしたmessageに対応するcallbackであることを保証する
            const callback = this._callbacks.shift();
            callback(message);
        });
    }

    postMessage(message) {
        return new Promise(resolve => {
            this._callbacks.push(resolve);
            this._port.postMessage(message);
        });
    }
}

export default NativeMessageConnection;
