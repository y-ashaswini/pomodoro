import { retrieveSession } from "@/lib/usersession";

export default function HeaderPage() {
  const s = retrieveSession();
  return (
    <div className="bg-zinc-900 h-[10vh] text-zinc-500 hover:text-zinc-200 duration-200 ease-in flex justify-between md:px-8 p-4">
      <span className="text-4xl">Pomodoro</span>
      {s?.user ? (
        <span className="flex justify-center gap-2">
          <span className="border-[1px] border-zinc-500 px-4 py-2 rounded-full">
            {s.user.name}
          </span>
          <span className="border-[1px] border-zinc-500 px-4 py-2 rounded-full">
            {s.user.email}
          </span>
          <img
            src={s.user.picture}
            height="40"
            width="40"
            className="rounded-full"
          />

          <a
            href="/api/auth/signout"
            className="border-[1px] bg-zinc-200 text-zinc-900 px-4 py-2 rounded-full"
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
