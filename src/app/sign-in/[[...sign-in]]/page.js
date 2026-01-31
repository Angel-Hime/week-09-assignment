// TODO: render sign-in page
// use clerk

import { SignIn } from "@clerk/nextjs";
import Link from "next/link";

export default function signInPage() {
  return (
    <>
      <SignIn />
    </>
  );
}
