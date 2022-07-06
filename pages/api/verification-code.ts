import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import { MailOptions } from 'nodemailer/lib/json-transport';

const sendMail = (code: number) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.VALIDATOR_USER,
      serviceClient: process.env.SERVICE_ID,
      privateKey: process.env.SERVICE_KEY,
    },
  });
  const mailOptions: MailOptions = {
    from: 'validator3000',
    to: process.env.OWNER_EMAIL,
    subject: 'Email Confirmation',
    html: `
      <h2>Your code is:</h2>
      <p>${code}</p>
    `,
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.error(error);
    } else {
      console.log('####### message sent ########');
    }
  });
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    sendMail(Math.round(Math.random() * 10e5));
  } else {
    res.status(404).json({ message: "This route doesn't exist" });
  }
}
