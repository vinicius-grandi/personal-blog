import { withIronSessionApiRoute } from 'iron-session/next';
import multiparty from 'multiparty';
import logger from 'jet-logger';
import db from '../../db/models';
import connection from '../../lib/redis';
import sessionOptions from '../../lib/sessionOptions';

const { User } = db as any;

export const config = {
  api: {
    bodyParser: false,
  },
};

export default withIronSessionApiRoute(async (req, res) => {
  try {
    const form = new multiparty.Form();
    const data: Promise<{
      fields: { username: string[]; code: string[]; password: string[] };
      files: any;
    }> = new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) {
          logger.err(err);
          reject(new Error(String(err)));
        }
        resolve({ fields, files });
      });
    });
    const {
      fields: {
        username: [username],
        password: [password],
        code: [code],
      },
    } = await data;
    console.log(username);
    if (!username || !password || !code) {
      return res.status(400).json({
        message: 'bad request',
      });
    }
    const userCode = await connection.get(username);
    if (userCode !== code) {
      return res.status(401).json({ message: 'Your code is incorrect' });
    }

    const [user, created] = await User.findOrCreate({
      where: { username },
      defaults: {
        username,
        password,
      },
    });

    if (!created) {
      return res.status(409).json({
        message: 'user already exists',
      });
    }
    req.session.user = user.dataValues;
    await req.session.save();
    return res.json(user);
  } catch (error) {
    logger.err(error);
    return res.status(500).json({
      message: 'internal server error',
    });
  }
}, sessionOptions);
