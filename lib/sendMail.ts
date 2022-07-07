import nodemailer from 'nodemailer';
import { MailOptions } from 'nodemailer/lib/json-transport';
import { testInfo, productionInfo } from '../data/emailInfo';

const sendMail = async (code: number) => {
  const info = process.env.NODE_ENV === 'test' ? testInfo : productionInfo;
  const transporter = nodemailer.createTransport({
    ...info,
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_PASS,
    },
  });

  const mailOptions: MailOptions = {
    from: process.env.VALIDATOR_USER,
    to: process.env.OWNER_EMAIL,
    subject: 'Email Confirmation',
    html: `
      <h2>Your code is:</h2>
      <p>${code}</p>
    `,
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log('#### EMAIL SENT :) ####');
  } catch (err) {
    console.error(err);
  }
};

export default sendMail;