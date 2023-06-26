"use client";

import { useSession } from "next-auth/react";
export const retrieveSession = () => {
  const { data: session } = useSession();
  return session;
};
