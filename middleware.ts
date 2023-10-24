import { withAuth } from 'next-auth/middleware';

export default withAuth(
  {
    callbacks: {
      authorized: ({ token, req }) => {
        if (req.nextUrl.href.includes('/admin')) {
          console.log(token);
        }
        return true;
      }
    },
  }
);
