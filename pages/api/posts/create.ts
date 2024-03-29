import logger from 'jet-logger';
import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../db/models';
import withAuth from '../../../lib/authMiddleware';

const { Post } = db;

async function posts(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== undefined && req.method === 'POST') {
    const { title, content } = req.body;
    try {
      const post = await Post.create({
        authorId: req.session.user.id,
        title,
        content,
      });
      return res.json(post);
    } catch (error) {
      logger.err(error);
      return res.status(403).json({ message: 'internal server error' });
    }
  }
  return res.status(404).json({ message: "this route don't exist" });
}

export default withAuth(posts);
