import { withAuth } from 'next-auth/middleware';

export default withAuth(
  {
    callbacks: {
      authorized: async ({ token, req }) => {
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
