import { createServer, RequestListener } from 'http';
import { apiResolver } from 'next/dist/server/api-utils/node';
import request from 'supertest';

const testClient = (handler: any) => {
  const listener: RequestListener = (req: any, res) => {
    req.session = {
      user: {
        username: 'vinicius',
        id: 1,
        password: 'coolPassword',
      },
    } as any;
    return apiResolver(
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
  };

  return request.agent(createServer(listener));
};

export default testClient;
