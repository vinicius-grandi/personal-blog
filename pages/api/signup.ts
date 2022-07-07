import { withIronSessionApiRoute } from 'iron-session/next';
import db from '../../db/models';

const { User } = db as any;

export default withIronSessionApiRoute(
  async (req, res) => {
    try {
      const { username, password } = req.body;
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
      console.error(error);
      return res.status(500).json({
        message: 'internal server error',
      });
    }
  },
  {
    cookieName: 'blog_cookiename',
    password: process.env.COOKIE_PASSWORD ?? '',
    cookieOptions: {
      secure: process.env.NODE_ENV !== 'test',
      httpOnly: process.env.NODE_ENV !== 'test',
    },
  },
);
