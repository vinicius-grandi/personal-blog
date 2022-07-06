import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import { MailOptions } from 'nodemailer/lib/json-transport';
import { productionInfo, testInfo } from '../../data/emailInfo';
import connection from '../../lib/redis';

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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const {
      body: { username },
    } = req;

    if (await connection.get(username)) {
      return res.json({ message: 'your code has already been sent!' });
    }

    const verificationCode = Math.round(Math.random() * 10e5);

    await sendMail(verificationCode);
    await connection.set(username, verificationCode, 'EX', 60 * 10);

    return res.json({ message: 'verification code sent to email' });
  }
  return res.status(404).json({ message: "This route doesn't exist" });
}
