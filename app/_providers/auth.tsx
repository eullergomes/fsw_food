"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

//All components will have access to the logged in user

const AuthProvider = ({ children }: { children: ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
