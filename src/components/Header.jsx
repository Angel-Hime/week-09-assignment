import Link from "next/link";
import DropdownNav from "./DropdownNav";
import { auth } from "@clerk/nextjs/server";

export default async function Header() {
  const { userId } = await auth();

  return (
    <div className="flex flex-row w-screen  place-items-center justify-between pl-30 pr-30">
      <Link className="" href={"/"}>
        The Empty Room...
      </Link>
      <div className="">{userId ? <DropdownNav /> : null}</div>
    </div>
  );
}
