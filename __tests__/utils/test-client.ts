import { createServer, RequestListener } from 'http';
import { apiResolver } from 'next/dist/server/api-utils/node';
import request from 'supertest';

const testClient = (handler: any) => {
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

  return request.agent(createServer(listener));
};

export default testClient;
