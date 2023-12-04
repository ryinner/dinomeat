import { withAuth } from 'next-auth/middleware';

export default withAuth(
  {
    callbacks: {
      authorized: async ({ token, req }) => {
        if (process.env.NODE_ENV !== 'production') {
          return true;
        }
        if (req.nextUrl.href.includes('/admin') || req.nextUrl.href.includes('/profile')) {
          if (token === null) {
            return false;
          }
        }
        if (req.nextUrl.href.includes('/auth')) {
          if (token !== null) {
            return false;
          }
        }
        return true;
      }
    },
  }
);
