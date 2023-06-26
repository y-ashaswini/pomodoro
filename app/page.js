"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function LoginPage() {
  const { data: session, status } = useSession();
  return (
    <div className="flex flex-col w-full gap-4 h-[90vh] items-center justify-center bg-zinc-900 text-zinc-200">
      {status === "authenticated" ? (
        <>
          <span className="text-zinc-500 text-4xl">AUTHENTICATED</span>
          <span className="text-zinc-500 text-2xl hover:text-zinc-200 ease-in duration-200">
            {session?.user?.email}
          </span>
          <Link
            href={`/${session?.user?.email}`}
            className="border-[1px] border-zinc-500 hover:border-zinc-200 duration-200 ease-in w-fit px-2 py-1 rounded-sm hover:text-zinc-200 cursor-pointer"
          >
            ENTER
          </Link>
        </>
      ) : (
        <a
          href="/api/auth/signin"
          className="border-[1px] border-zinc-500 hover:border-zinc-200 duration-200 ease-in w-fit px-2 py-1 rounded-sm hover:text-zinc-200 cursor-pointer"
        >
          SIGNIN
        </a>
      )}
    </div>
  );
}
