import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex flex-col w-full h-[100vh] items-center justify-center bg-zinc-900 text-zinc-200">
      <Link
        href="/8"
        className="border-[1px] border-zinc-500 hover:border-zinc-200 duration-200 ease-in w-fit px-2 py-1 rounded-sm hover:text-zinc-200 cursor-pointer"
      >
        LOGIN
      </Link>
    </div>
  );
}
