// Este código se ejecuta solo una vez para generar las claves VAPID
const webPush = require('web-push');

const vapidKeys = webPush.generateVAPIDKeys();
console.log(vapidKeys);
