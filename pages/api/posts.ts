import logger from 'jet-logger';
import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../db/models';

const { Post } = db;

class PostController {
  static async createPost(req: NextApiRequest) {
    const { title, content } = req.body;
    const post = Post.create({
      authorId: req.session.user.id,
      title,
      content,
    });
    return post;
  }

  static async updatePost(req: NextApiRequest) {
    const { title, content, id } = req.body;
    const post = await Post.findByPk(id);
    await post.update({
      title,
      content,
    });
    return post;
  }

  static deletePost(res: NextApiResponse) {
    return res.send('delete');
  }
}

const routeMap = {
  POST: PostController.createPost,
  PUT: PostController.updatePost,
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
      try {
        const r = await routeMap[req.method](req);
        res.send(r);
      } catch (error) {
        logger.err(error);
      }
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  } else {
    res.status(400).json({ message: 'Bad Request' });
  }
}

export default posts;
