const https = require('https');
const fs = require('fs');
const path = require('path');

const APP_URL = 'https://github.com/webdriverio/native-demo-app/releases/download/v1.0.8/android.wdio.native.app.v1.0.8.apk';
const DEST = path.join(__dirname, '..', 'apps', 'wdio-demo-app.apk');

function download(url, dest) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, (response) => {
            if (response.statusCode === 302 || response.statusCode === 301) {
                download(response.headers.location, dest).then(resolve).catch(reject);
                return;
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                console.log(`APK baixado com sucesso: ${dest}`);
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(dest, () => {});
            reject(err);
        });
    });
}

const appsDir = path.dirname(DEST);
if (!fs.existsSync(appsDir)) {
    fs.mkdirSync(appsDir, { recursive: true });
}

console.log('Baixando WebdriverIO Demo App...');
console.log(`URL: ${APP_URL}`);
download(APP_URL, DEST).catch((err) => {
    console.error('Erro ao baixar APK:', err.message);
    process.exit(1);
});
