import { DefaultUser } from "next-auth";

interface UserExtended extends DefaultUser {
  id: string;
}

declare module "next-auth" {
  interface User extends UserExtended {
    id: string;
    phone: string;
  }
  interface Session {
    user: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    phone: string;
  }
}