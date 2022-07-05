import { createServer, RequestListener } from 'http';
import { NextApiHandler } from 'next';
import { apiResolver } from 'next/dist/server/api-utils/node';
import request from 'supertest';

const testClient = (handler: NextApiHandler) => {
  const listener: RequestListener = (req, res) => apiResolver(
    req,
    res,
    undefined,
    handler,
    {
      previewModeEncryptionKey: '',
      previewModeId: '',
      previewModeSigningKey: '',
    },
    false,
  );

  return request(createServer(listener));
};

export default testClient;