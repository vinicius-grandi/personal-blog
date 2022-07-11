import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';
import sessionOptions from '../../lib/sessionOptions';

export type User = {
  isLoggedIn: boolean;
  user: null | NextApiRequest['session']['user'];
};

async function userRoute(req: NextApiRequest, res: NextApiResponse) {
  if (req.session.user) {
    return res.json({
      user: { ...req.session.user },
      isLoggedIn: true,
    });
  }
  return res.json({
    isLoggedIn: false,
    user: null,
  });
}

export default withIronSessionApiRoute(userRoute, sessionOptions);
