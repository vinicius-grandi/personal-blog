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
  let username = '';
  let password = '';
  let code = '';
  const setVariables = (u: string, p: string, c: string) => {
    username = u;
    password = p;
    code = c;
  };
  try {
    if ('username' in req.body) {
      const { body: { username: u, password: p, code: c } } = req;
      setVariables(u, p, c);
    } else {
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
          username: [u],
          password: [p],
          code: [c],
        },
      } = await data;
      setVariables(u, p, c);
    }

    if (username.length < 1 || password.length < 1 || code.length < 1) {
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
