// test-email.js
require('dotenv').config();
const nodemailer = require('nodemailer');

async function test() {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: `"MundoXP Test" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: 'Teste SMTP MundoXP',
      text: 'Se você recebeu este e-mail, a senha de app funcionou corretamente.',
    });
    console.log('Enviado:', info.response);
  } catch (err) {
    console.error('Erro enviando e-mail:', err);
  }
}

test();
