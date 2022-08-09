import { NextApiRequest, NextApiResponse } from 'next';

const withAuth = (handler: any) => (req: NextApiRequest, res: NextApiResponse) => {
  if (req.session && 'user' in req.session) {
    return handler(req, res);
  }
  return res.status(401).json({ message: 'unauthorized' });
};

export default withAuth;
