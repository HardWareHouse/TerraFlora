import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: 'smtp-relay.sendinblue.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.BREVO_USER,
    pass: process.env.BREVO_PASS,
  },
});

export const sendConfirmationEmail = (user, token) => {
  const url = `http://localhost:8000/auth/confirm/${token}`;
  const mailOptions = {
    from: process.env.BREVO_USER,
    to: user.email,
    subject: 'Confirm your email',
    html: `<h2>Hello ${user.nom}</h2>
           <p>Thank you for registering. Please confirm your email by clicking on the following link:</p>
           <a href="${url}">Confirm your email</a>`
  };

  return transporter.sendMail(mailOptions);
};

export const sendResetPasswordEmail = (user, token) => {
  const url = `http://localhost:8000/auth/reset-password/${token}`;
  const mailOptions = {
    from: process.env.BREVO_USER,
    to: user.email,
    subject: 'Reset your password',
    html: `<h2>Hello ${user.nom}</h2>
           <p>You requested a password reset. Please click on the following link to reset your password:</p>
           <a href="${url}">Reset your password</a>`
  };

  return transporter.sendMail(mailOptions);
};

export const sendAccountBlockedEmail = (user) => {
  const mailOptions = {
    from: process.env.BREVO_USER,
    to: user.email,
    subject: 'Account Temporarily Blocked',
    html: `<h2>Hello ${user.nom}</h2>
           <p>Due to multiple failed login attempts, your account has been temporarily blocked for 10 minutes. Please try again later.</p>`
  };

  return transporter.sendMail(mailOptions);
};

export const sendPreferenceUpdateEmail = (user, preference) => {
  const mailOptions = {
    from: process.env.BREVO_USER,
    to: user.email,
    subject: 'Mise à jour des préférences de notification',
    html: `<h2>Bonjour ${user.nom}</h2>
           <p>Vous avez activé les notifications pour les ${preference}. Vous recevrez désormais des e-mails concernant cette catégorie.</p>`
  };

  return transporter.sendMail(mailOptions);
};