import { withAuth } from 'next-auth/middleware';

export default withAuth(
  function middleware(req) {
    // console.log(req);
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        Boolean(token?.is_admin) === true
        console.log(token?.name);
        console.log(req);
        return true;
      }
    },
  }
);
