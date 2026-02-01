// TODO: render a home page with user navigation or intro to the app
"use client";
import { SignInButton, SignUpButton, useAuth } from "@clerk/nextjs";

import { redirect } from "next/navigation";
import styles from "@/styles/loggingTabStyles.module.css";

// ! THIS IS THE ONLY PUBLIC PAGE! --> all users
export default function HomePage() {
  const { isSignedIn } = useAuth();
  console.log(isSignedIn);
  //! This page should only show when the user is not logged in
  if (isSignedIn) {
    redirect(`/timeline`);
  }

  return (
    <div className="grid grid-cols-2 text-center h-screen ">
      <section className="col-start-1 col-end-2 self-center">
        <h1>Welcome to The Empty Room...</h1>
        <p> Sign up now, come and socialise in The Empty Room! </p>
      </section>
      <section className="col-start-2 col-end-3 self-center flex flex-col gap-5">
        <SignInButton>
          <button className={styles.Button}>Sign In</button>
        </SignInButton>

        <SignUpButton>
          <button className={styles.Button}>Sign Up</button>
        </SignUpButton>
      </section>
    </div>
  );
}
