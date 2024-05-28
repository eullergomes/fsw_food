/* eslint-disable no-unused-vars */
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  // Include id for the user in the session
  interface Session {
    user: {
      id?: string;
    } & DefaultSession["user"];
  }
}
