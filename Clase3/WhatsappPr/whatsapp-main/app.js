const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
// Define el número al que deseas enviar el mensaje y el mensaje en sí
const numeroDestino = '595972408006'; // Número en formato internacional
const mensaje = 'hola';

// Inicializar el cliente de WhatsApp
const client = new Client({
    puppeteer: {
        headless: true,
    },
});

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
    
    // Enviar mensaje cuando el cliente esté listo
    const chatId = `${numeroDestino}@c.us`; // Formato correcto para WhatsApp Web
    client.sendMessage(chatId, mensaje).then(response => {
        console.log('Mensaje enviado:', response);
    }).catch(err => {
        console.error('Error al enviar mensaje:', err);
    });
});

// Opcional: escuchar todos los mensajes entrantes y comandos '!ping'
client.on('message_create', message => {
    console.log(message.body);

    if (message.body === '!ping') {
        message.reply('pong');
    }
});
client.initialize();
