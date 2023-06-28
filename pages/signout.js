import { getProviders, signOut } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { getCsrfToken } from "next-auth/react";

export default function signin({ providers }) {
  return (
    <div>
      {Object.values(providers).map((provider) => {
        return (
          <div key={provider.name}>
            <button classN onClick={() => signOut(provider.id)}>
              Sure you want to sign out?
            </button>
          </div>
        );
      })}
    </div>
  );
}

export async function getServerSideProps(context) {
  if (context && context.req && context.res) {
    const session = await getServerSession(context.req, context.res);

    if (!session) {
      return {
        redirect: { destination: "/" },
      };
    }
  }

  return {
    props: {
      providers: await getProviders(),
      csrfToken: await getCsrfToken(),
    },
  };
}
