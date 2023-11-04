import { withAuth } from 'next-auth/middleware';

export default withAuth(
  {
    callbacks: {
      authorized: async ({ token, req }) => {
        if (process.env.NODE_ENV !== 'production') {
          return true;
        }
        if (req.nextUrl.href.includes('/admin')) {
          if (token === null) {
            return false;
          }
        }
        return true;
      }
    },
  }
);
