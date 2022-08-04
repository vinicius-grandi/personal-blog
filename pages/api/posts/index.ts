import logger from 'jet-logger';
import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../db/models';

const { Post } = db;

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  try {
    const posts = await Post.findAll();
    if (posts === null || posts.length < 1) {
      return res.status(404).json({ message: 'There are no posts' });
    }
    return res.json({ posts });
  } catch (error) {
    logger.err(error);
    return res.json({ message: 'internal server error' });
  }
}
