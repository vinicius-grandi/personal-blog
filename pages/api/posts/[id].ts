import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../db/models';

const { Post } = db;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  switch (req.method) {
    case 'GET': {
      const post = await Post.findByPk(id);
      if (post === null) {
        return res.status(404).json({ message: 'Your post don\'t exist' });
      }
      return res.json(post);
    }
    case 'DELETE': {
      const postId = await Post.destroy({
        where: { id },
      });
      return res.json({ message: `The post ${postId} has been deleted successfully` });
    }
    default:
      return res.status(404).json({ message: 'this method is not supported' });
  }
}
