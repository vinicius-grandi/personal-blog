import { NextApiRequest, NextApiResponse } from 'next';

class PostController {
  static createPost(req: NextApiRequest) {
    return 'get';
  }

  static updatePost(req: NextApiRequest) {
    return 'post';
  }

  static deletePost(res: NextApiResponse) {
    return res.send('delete');
  }
}

const routeMap = {
  POST: PostController.createPost,
};

function isAValidMethod(method: string): method is keyof typeof routeMap {
  if (method in routeMap) {
    return true;
  }
  return false;
}

function posts(req: NextApiRequest, res: NextApiResponse) {
  // console.log(req.session);
  if (req.method !== undefined && isAValidMethod(req.method)) {
    const r = routeMap[req.method](req);
    res.send(r);
  } else {
    res.send('fuck');
  }
}

export default posts;
