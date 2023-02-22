import nodemailer from 'nodemailer';
import { mailCredencials, config } from './g.config.js';

export const sendConfirmationMail = async (correo, nombre, token) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            type: 'OAuth2',

        },
    });
    const message = defaultMessage(correo, mailTemplate(nombre,token));

    await transporter.sendMail(message);
    transporter.close();
};


const defaultMessage = (email, personalizedHml) => ({
    to: email,
    from: mailCredencials.user,
    subject: 'Correo de confirmación para ApstroApp',
    text: '',
    html: personalizedHml,

});

const mailTemplate = (nombres, token) => (`
    <div>
        <img src="organizationLogo.png" alt="logo">
        <h2>Hola ${nombres.first} ${nombres.last} </h2>
        <p>Para confimar tu registro en "APLICATIONAME" utlice el siguiente enlace </p>
        <a
        href="htpps://${config.domain}/api/login/confirm/${token}"
        > Confirmar Correo </a>

    </div>`
);