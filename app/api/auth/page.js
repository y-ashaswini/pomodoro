"use client";
import { getProviders, signIn } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

// export default function SignIn({ providers }) {
//   return (
//     <>
//       {Object.values(providers).map((provider) => (
//         <div key={provider.name}>
//           <button onClick={() => signIn(provider.id)}>
//             Sign in with {provider.name}
//           </button>
//         </div>
//       ))}
//     </>
//   );
// }

// export async function getServerSideProps(context) {
//   const session = await getServerSession(context.req, context.res, authOptions);

//   if (session) {
//     return { redirect: { destination: "/profile" } };
//   }

//   const providers = await getProviders();

//   return {
//     props: { providers: providers ?? [] },
//   };
// }

export default async function SignIn(context) {
  if (context && context.req && context.res) {
    const session = await getServerSession(
      context.req,
      context.res,
      authOptions
    );

    if (session) {
      return { redirect: { destination: "/profile" } };
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
          <button onClick={() => signIn(provider?.id)}>
            Sign in / Sign up with {provider?.name}
          </button>
        </div>
      ))}
    </>
  );
};
