import brevo from '@getbrevo/brevo';
import dotenv from 'dotenv';

dotenv.config();

let apiInstance;
if (process.env.NODE_ENV === 'test') {
  apiInstance = {
    authentications: {
      apiKey: {
        apiKey: process.env.BREVO_PASS_API,
      },
    },
    sendTransacEmail: jest.fn().mockResolvedValue({}),
  };
} else {
  apiInstance = new brevo.TransactionalEmailsApi();
  let apiKey = apiInstance.authentications['apiKey'];
  apiKey.apiKey = process.env.BREVO_PASS_API;
}


const templateIds = {
  confirmation: 2,
  forgotPassword: 3,
  accountBlocked: 4,
  preferenceUpdate: 5,
  alertStock: 6,
  noStock: 7,
};

export async function sendConfirmationEmail(user, token) {
  const sendSmtpEmail = new brevo.SendSmtpEmail();

  const url = `http://localhost:8000/auth/confirm/${token}`;
  sendSmtpEmail.to = [{ email: user.email, name: user.nom }];
  sendSmtpEmail.templateId = templateIds.confirmation;
  sendSmtpEmail.params = {
    NOM: user.nom,
    TOKEN_URL: url,
  };

  try {
    await apiInstance.sendTransacEmail(sendSmtpEmail);
  } catch (error) {
    if (error instanceof brevo.HttpError) {
      console.log('HttpError statusCode', error.statusCode);
      console.log('HttpError body', error.body);
    }
    throw error;
  }
}

export async function sendResetPasswordEmail(user, token) {
  const sendSmtpEmail = new brevo.SendSmtpEmail();

  const url = `http://localhost:8000/auth/reset-password/${token}`;
  sendSmtpEmail.to = [{ email: user.email, name: user.nom }];
  sendSmtpEmail.templateId = templateIds.forgotPassword;
  sendSmtpEmail.params = {
    NOM: user.nom,
    TOKEN_URL: url,
  };

  try {
    await apiInstance.sendTransacEmail(sendSmtpEmail);
  } catch (error) {
    if (error instanceof brevo.HttpError) {
      console.log('HttpError statusCode', error.statusCode);
      console.log('HttpError body', error.body);
    }
    throw error;
  }
}

export async function sendAccountBlockedEmail(user) {
  const sendSmtpEmail = new brevo.SendSmtpEmail();

  sendSmtpEmail.to = [{ email: user.email, name: user.nom }];
  sendSmtpEmail.templateId = templateIds.accountBlocked;
  sendSmtpEmail.params = {
    NOM: user.nom,
  };

  try {
    await apiInstance.sendTransacEmail(sendSmtpEmail);
  } catch (error) {
    if (error instanceof brevo.HttpError) {
      console.log('HttpError statusCode', error.statusCode);
      console.log('HttpError body', error.body);
    }
    throw error;
  }
}

export async function sendPreferenceUpdateEmail(user, preference) {
  const sendSmtpEmail = new brevo.SendSmtpEmail();

  sendSmtpEmail.to = [{ email: user.email, name: user.nom }];
  sendSmtpEmail.templateId = templateIds.preferenceUpdate;
  sendSmtpEmail.params = {
    NOM: user.nom,
    PREFERENCE: preference,
  };

  try {
    await apiInstance.sendTransacEmail(sendSmtpEmail);
  } catch (error) {
    if (error instanceof brevo.HttpError) {
      console.log('HttpError statusCode', error.statusCode);
      console.log('HttpError body', error.body);
    }
    throw error;
  }
}



export async function sendAlertEmailLowStock(user, alertMessage) {
  const sendSmtpEmail = new brevo.SendSmtpEmail();

  sendSmtpEmail.to = [{ email: user.email, name: user.nom }];
  sendSmtpEmail.templateId = templateIds.alertStock;
  sendSmtpEmail.params = {
    FULLNAME: user.nom,
    stock: alertMessage,
  };

  try {
    await apiInstance.sendTransacEmail(sendSmtpEmail);
  } catch (error) {
    if (error instanceof brevo.HttpError) {
      console.log('HttpError statusCode', error.statusCode);
      console.log('HttpError body', error.body);
    }
    throw error;
  }
}

export async function sendAlertEmailNoStock(user, alertMessage) {
  const sendSmtpEmail = new brevo.SendSmtpEmail();

  sendSmtpEmail.to = [{ email: user.email, name: user.nom }];
  sendSmtpEmail.templateId = templateIds.alertStock;
  sendSmtpEmail.params = {
    FULLNAME: user.nom,
    stock: alertMessage,
  };

  try {
    await apiInstance.sendTransacEmail(sendSmtpEmail);
  } catch (error) {
    if (error instanceof brevo.HttpError) {
      console.log('HttpError statusCode', error.statusCode);
      console.log('HttpError body', error.body);
    }
    throw error;
  }
}