"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";

export default function HeaderPage() {
  const [show, setShow] = useState(false);
  const { data: s, _ } = useSession();
  return (
    <div className="bg-transparent sm:bg-latte fixed z-50 w-full sm:h-[10vh] text-jet flex justify-between items-start sm:items-center md:px-8 p-4">
      <span className="flex justify-center gap-2 hover:bg-coral hover:bg-opacity-25 ease-in duration-200 px-4 py-2 rounded-full">
        <Image src="/pomodoro.svg" width={25} height={25} alt="Logo" />

        {s?.user?.email ? (
          <a href={`/${s.user.email}`} className="sm:text-4xl text-2xl ">
            Pomodoro
          </a>
        ) : (
          <a href="/" className="sm:text-4xl text-2xl ">
            Pomodoro
          </a>
        )}
      </span>
      {s?.user ? (
        <span className="flex sm:flex-row flex-col sm:justify-center justify-start sm:text-base text-xs items-center gap-2">
          <img
            src={s.user.picture}
            height="40"
            width="40"
            className="rounded-full"
            onClick={() => setShow((curr) => !curr)}
          />
          <span
            className={
              "border-2 border-jet text-jet font-bold px-4 py-2 rounded-full" +
              (show ? "" : " hidden sm:inline")
            }
          >
            {s.user.name}
          </span>
          {s?.user?.email ? (
            <a
              href={`/${s.user.email}/profile`}
              className={
                "bg-jet text-latte px-4 py-2 font-bold rounded-full" +
                (show ? "" : " hidden sm:inline")
              }
            >
              PROFILE
            </a>
          ) : (
            <></>
          )}

          <a
            href="/api/auth/signout"
            className={
              "bg-jet text-latte font-bold px-4 py-2 rounded-full" +
              (show ? "" : " hidden sm:inline")
            }
          > 
            SIGNOUT
          </a>
        </span>
      ) : (
        <></>
      )}
    </div>
  );
}
