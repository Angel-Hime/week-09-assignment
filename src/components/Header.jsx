import Link from "next/link";
import DropdownNav from "./DropdownNav";
import { auth } from "@clerk/nextjs/server";

export default async function Header() {
  const { userId } = await auth();

  return (
    <div className="flex flex-row w-screen  place-items-center justify-between pl-30 pr-30 ">
      <Link
        className="hover:text-shadow-lg hover:text-shadow-white text-xl font-extrabold"
        href={"/"}
      >
        The Empty Room...
      </Link>
      <div className="cursor-pointer">{userId ? <DropdownNav /> : null}</div>
    </div>
  );
}
