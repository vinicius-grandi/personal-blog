import { withIronSessionApiRoute } from 'iron-session/next';
import logger from 'jet-logger';
import db from '../../db/models';
import connection from '../../lib/redis';

const { User } = db as any;

export default withIronSessionApiRoute(
  async (req, res) => {
    try {
      const { username, password, code } = req.body;
      console.log(req.body);
      if (!username || !password || !code) {
        return res.status(400).json({
          message: 'bad request',
        });
      }
      const userCode = await connection.get(username);

      if (userCode !== code) {
        return res.status(401).json({ message: 'not authorized' });
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

      req.session.user = user;
      await req.session.save();
      return res.json(user);
    } catch (error) {
      logger.err(error);
      return res.status(500).json({
        message: 'internal server error',
      });
    }
  },
  {
    cookieName: 'blog_cookiename',
    password: process.env.COOKIE_PASSWORD ?? '',
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: process.env.NODE_ENV === 'production',
    },
  },
);
