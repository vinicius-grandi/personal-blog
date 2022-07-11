export default {
  cookieName: 'blog_cookiename',
  password: process.env.COOKIE_PASSWORD ?? '',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: process.env.NODE_ENV === 'production',
  },
};
