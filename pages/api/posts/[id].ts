import logger from 'jet-logger';
import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../db/models';

const { Post } = db;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const { content, title } = req.body;
  try {
    switch (req.method) {
      case 'GET': {
        const post = await Post.findByPk(id);
        if (post === null) {
          return res.status(404).json({ message: 'Your post don\'t exist' });
        }
        return res.json(post);
      }
      case 'DELETE': {
        if (req.session && 'user' in req.session) {
          const postId = await Post.destroy({
            where: { id },
          });
          return res.json({ message: `The post ${postId} has been deleted successfully` });
        }
        return res.status(401).json({ message: 'unauthorized' });
      }
      case 'PUT': {
        if (req.session && 'user' in req.session) {
          const post = await Post.findByPk(id);
          await post.update({
            title,
            content,
          });
          return res.json(post);
        }
        return res.status(401).json({ message: 'unauthorized' });
      }
      default:
        return res.status(404).json({ message: 'this method is not supported' });
    }
  } catch (error) {
    logger.err(error);
    return res.json({ message: 'internal server error' });
  }
}
