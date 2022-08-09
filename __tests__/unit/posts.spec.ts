/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable no-promise-executor-return */
import connection from '../../lib/redis';
import truncateTables from '../utils/truncateTables';
import testClient from '../utils/test-client';
import posts from '../../pages/api/posts';
import createPost from '../../pages/api/posts/create';
import post from '../../pages/api/posts/[id]';
import db from '../../db/models';

const { Post, User } = db;

jest.mock('../utils/test-client');

describe('/api/posts', () => {
  const postMock = jest.fn();
  postMock.mockImplementation((req, res) => {
    req.query = {
      id: 1,
    };
    return post(req, res);
  });
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
    const response = await testClient(createPost).post('/posts/create').send({
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
    const response = await actualTestClient(createPost).post('/posts/create').send({
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
    await testClient(createPost).post('/posts/create').send({
      title: 'First Post',
      content: `
        <h1>My first Post is Really Sick</h1>
        <p>Yeah, it really is!</p>
      `,
    });
    const response = await testClient(postMock).put('/posts').send({
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
  it('allows user to delete a post', async () => {
    await User.create({
      username: 'vinicius',
      password: 'coolPassword',
    });
    await testClient(createPost).post('/posts/create').send({
      title: 'First Post',
      content: `
        <h1>My first Post is Really Sick</h1>
        <p>Yeah, it really is!</p>
      `,
    });
    const response = await testClient(postMock).delete('/posts/1');
    const createdPost = await Post.findOne({
      where: {
        title: 'First Post',
      },
    });
    expect(response.status).toBe(200);
    expect(createdPost).toBe(null);
    expect(response.body.message).toMatch(/the post 1 has been deleted successfully/i);
  });
  it('should not delete a post when unauthenticated', async () => {
    const { default: actualTestClient } = jest.requireActual('../utils/test-client');
    await User.create({
      username: 'vinicius',
      password: 'coolPassword',
    });
    await testClient(createPost).post('/posts/create').send({
      title: 'First Post',
      content: `
        <h1>My first Post is Really Sick</h1>
        <p>Yeah, it really is!</p>
      `,
    });
    const response = await actualTestClient(postMock).delete('/posts/1');
    const createdPost = await Post.findOne({
      where: {
        title: 'First Post',
      },
    });
    expect(response.status).toBe(200);
    expect(createdPost).toBe(null);
    expect(response.body.message).toMatch(/the post 1 has been deleted successfully/i);
  });
  it('allows user to get a post', async () => {
    await User.create({
      username: 'vinicius',
      password: 'coolPassword',
    });
    await testClient(createPost).post('/posts/create').send({
      title: 'First Post',
      content: `
        <h1>My first Post is Really Sick</h1>
        <p>Yeah, it really is!</p>
      `,
    });
    const response = await testClient(postMock).get('/api/posts/1');
    const createdPost = await Post.findOne({
      where: {
        title: 'First Post',
      },
    });
    expect(response.status).toBe(200);
    expect(createdPost.content).toBe(response.body.content);
    expect(createdPost.title).toBe(response.body.title);
  });
  it('retrieves all posts', async () => {
    await User.create({
      username: 'vinicius',
      password: 'coolPassword',
    });
    await testClient(createPost).post('/posts/create').send({
      title: 'First Post',
      content: `
        <h1>My first Post is Really Sick</h1>
        <p>Yeah, it really is!</p>
      `,
    });
    const response = await testClient(posts).get('/posts/');
    expect(response.status).toBe(200);
    expect(response.body.posts.length).toBe(1);
  });
});
