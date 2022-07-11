import { withIronSessionApiRoute } from 'iron-session/next';
import logger from 'jet-logger';
import db from '../../db/models';

const { User } = db;

export default withIronSessionApiRoute(
  async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({
        where: { username },
      });

      if (!user) {
        return res.status(403).json({
          message: 'incorrect username/password',
        });
      }

      const isPasswordCorrect = await user.checkPassword(password);

      if (!isPasswordCorrect) {
        return res.status(403).json({
          message: 'incorrect username/password',
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
