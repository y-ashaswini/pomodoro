"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function LoginPage() {
  const { data: session, status } = useSession();
  return (
    <div className="flex overflow-x-hidden flex-col w-full gap-4 h-[100vh] items-center justify-center bg-latte text-jet">
      {status === "authenticated" ? (
        <>
          <span className="md:text-5xl font-bold text-latte text-3xl bg-coral md:px-8 md:py-4 px-4 py-2 rounded-full">
            AUTHENTICATED
          </span>
          <span className="text-jet opacity-70 hover:opacity-100 md:text-lg sm:text-sm text-xs font-bold ease-in duration-200">
            {session?.user?.email}
          </span>
          <Link
            href={`/${session?.user?.email}`}
            className="border-2 font-bold border-jet duration-200 ease-in w-fit px-2 py-1 rounded-sm hover:bg-jet hover:text-latte cursor-pointer"
          >
            ENTER
          </Link>
        </>
      ) : (
        <a
          href={`https://taskpomodoros.vercel.app/signin?callbackUrl=${encodeURIComponent(
            "https://taskpomodoros.vercel.app"
          )}`}
          className="border-2 font-bold border-jet duration-200 ease-in w-fit px-2 py-1 rounded-sm hover:bg-jet hover:text-latte cursor-pointer"
        >
          SIGNIN
        </a>
      )}
    </div>
  );
}
