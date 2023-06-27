"use client";
import { getProviders, signIn } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function SignIn(context) {
  if (context && context.req && context.res) {
    const session = await getServerSession(
      context.req,
      context.res,
      authOptions
    );

    if (session) {
      return { redirect: { destination: "/" } };
    }

    const providers = await getProviders();

    return <DoSomething props={{ providers: providers ?? [] }} />;
  }
  return <></>;
}

const DoSomething = ({ providers }) => {
  return (
    <>
      {Object.values(providers).map((provider) => (
        <div key={provider?.name}>
          <button
            onClick={() =>
              signIn(provider?.id, {
                redirect_uri: `https://taskpomodoros.vercel.app/api/auth/callback/google`,
              })
            }
          >
            Sign in / Sign up with {provider?.name}
          </button>
        </div>
      ))}
    </>
  );
};

// provider.callbackUrl =
//   provider.callbackUrl +
//   `?callbackUrl=` +
//   encodeURIComponent(req.options.callbackUrl);
