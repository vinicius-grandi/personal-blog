import logger from 'jet-logger';
import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../db/models';

const { Post } = db;

const routeMap = {
  POST: 0,
  PUT: 0,
  DELETE: 0,
};

function isAValidMethod(method: string): method is keyof typeof routeMap {
  if (method in routeMap) {
    return true;
  }
  return false;
}

async function posts(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== undefined && isAValidMethod(req.method)) {
    if (req.session && req.session.user) {
      const { title, content, id } = req.body;
      try {
        switch (req.method) {
          case 'POST': {
            const post = await Post.create({
              authorId: req.session.user.id,
              title,
              content,
            });
            return res.json(post);
          }
          case 'PUT': {
            const post = await Post.findByPk(id);
            await post.update({
              title,
              content,
            });
            return res.json(post);
          }
          default:
            return res.status(404).json({ message: "This route don't exist" });
        }
      } catch (error) {
        logger.err(error);
        return res.status(403).json({ message: 'internal server error' });
      }
    }
    return res.status(401).json({ message: 'unauthorized' });
  }
  return res.status(404).json({ message: "this route don't exist" });
}

export default posts;
