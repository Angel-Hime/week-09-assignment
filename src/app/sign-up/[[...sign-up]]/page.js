// TODO: using clerk, render sign up page
import { SignUp } from "@clerk/nextjs";
import Link from "next/link";
// profile information requirement can be here --> we have control over the whole page, so there can be a form to collect their data --> e.g. name, bio, location, interests

// can we wrangle the user ID here?

// insert user's data into the user's table so that it can be used in the profile page.

export default function SignUpPage() {
  return (
    <>
      <Link href={"/"}>Return Home</Link>
      {/* Clerk Component to sign up 
      THEN...
      Auto redirect after sign up to 'create profile' (a nested route in this folder) where the user will complete a form to provide details */}
      <SignUp />
    </>
  );
}
