/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable no-promise-executor-return */
import connection from '../../lib/redis';
import truncateTables from '../utils/truncateTables';
import testClient from '../utils/test-client';
import posts from '../../pages/api/posts';
import db from '../../db/models';

const { Post, User } = db;

jest.mock('../utils/test-client');

describe('/api/posts', () => {
  beforeEach(async () => {
    await truncateTables();
    await connection.flushall();
  });
  afterAll(async () => {
    await new Promise<void>((resolve) => {
      connection.quit(() => {
        resolve();
      });
    });
    await new Promise((resolve) => setImmediate(resolve));
  });
  it('allows user create a new post when is authenticated', async () => {
    await User.create({
      username: 'vinicius',
      password: 'coolPassword',
    });
    const response = await testClient(posts).post('/posts').send({
      title: 'First Post',
      content: `
        <h1>My first Post is Really Sick</h1>
        <p>Yeah, it really is!</p>
      `,
    });
    const createdPost = await Post.findOne({
      where: {
        title: 'First Post',
      },
    });
    expect(response.status).toBe(200);
    expect(createdPost.id).toBe(1);
  });
  it('sends a error message when the user is not authenticated', async () => {
    const { default: actualTestClient } = jest.requireActual('../utils/test-client');
    const response = await actualTestClient(posts).post('/posts').send({
      title: 'First Post',
      content: `
        <h1>My first Post is Really Sick</h1>
        <p>Yeah, it really is!</p>
      `,
    });
    expect(response.status).toBe(401);
  });
  it('allows user to update a post', async () => {
    await User.create({
      username: 'vinicius',
      password: 'coolPassword',
    });
    await testClient(posts).post('/posts').send({
      title: 'First Post',
      content: `
        <h1>My first Post is Really Sick</h1>
        <p>Yeah, it really is!</p>
      `,
    });
    const response = await testClient(posts).put('/posts').send({
      id: 1,
      title: 'First Post',
      content: '<h1>new content</h1>',
    });
    const createdPost = await Post.findOne({
      where: {
        title: 'First Post',
      },
    });
    expect(response.status).toBe(200);
    expect(createdPost.content).toBe('<h1>new content</h1>');
  });
});
