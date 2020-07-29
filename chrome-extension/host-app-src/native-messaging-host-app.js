#!/usr/bin/env node

const fs = require('fs');
const execFile = require('child_process').execFile;

const lengthBytes = 4;

process.stdin.once('data', _data => {
    const data = new Buffer(_data);
    const lengthBuffer = data.slice(0, lengthBytes);
    const bodyBuffer = data.slice(lengthBytes);
    const bodyLength = lengthBuffer.reduceRight((acc, cur) => acc * 256 + cur);
    if (bodyBuffer.length !== bodyLength) {
        // TODO エラー処理
        return process.exit(1);
    }
    const input = JSON.parse(bodyBuffer.toString());
    if (input.filePath) {
        openByExplorer(input.filePath);
        return;
    }
});

const send = (messageObject) => {
    const message = JSON.stringify(messageObject);
    const messageBuffer = Buffer.from(message);
    const length = messageBuffer.length;
    const lengthBuffer = Buffer.alloc(lengthBytes);
    lengthBuffer.writeUIntLE(length, 0, lengthBytes);

    process.stdout.write(lengthBuffer);
    process.stdout.write(messageBuffer);
};


/** Open in Explorer
 * - If the path is a directory (ending in Fresno): Open the directory
 * - If path is a file: Open with the selection
 * @param {string} path
 */
const openByExplorer = path => {
    path = path.replace(/\\+$/, '');
    fs.stat(path, (err, stats) => {
        if (err) {
            // file or directory unavailable
            send({
                path,
                resultMessage: "Le fichier/dossier n'existe pas.",
                err,
            });
            return;
        }
        if (stats.isDirectory()) {
            execFile('explorer', [path]);
            send({
                path,
                resultMessage: 'Le dossier est ouvert',
            });
        } else {
            execFile('explorer', ['/select,', path]);
            send({
                path,
                resultMessage: 'Le dossier contenant les fichiers est ouvert',
            });
        }
    });
};
