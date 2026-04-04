// TODO: render sign-in page
// use clerk

import { SignIn } from "@clerk/nextjs";
import Link from "next/link";

export default function signInPage() {
  return (
    <>
      <div className="w-screen h-screen border-2 flex justify-center place-items-center ">
        <SignIn />
      </div>
    </>
  );
}
