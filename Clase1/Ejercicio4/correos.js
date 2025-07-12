const nodemailer = require('nodemailer');

// Configura el transportador con tu cuenta de Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ramiroec2@gmail.com',
    pass: 'aaru cwxn ofjy lbfc' // Tu contraseña de aplicación
  }
});

// Configura las opciones del correo
const mailOptions = {
  from: 'ramiroec2@gmail.com',
  to: 'ivangaer2002@gmail.com',
  subject: 'Asunto del correo',
  text: 'Contenido del correo'
};

// Envía el correo
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log(error);
  }
  console.log('Correo enviado: ' + info.response);
});
