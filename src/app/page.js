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
    <div className={styles.page}>
      <section className={styles.hero}>
        <h1>Welcome to The Empty Room...</h1>
        <p>Sign up now, come and socialise in The Empty Room!</p>
      </section>
      <section className={styles.logging}>
        <SignInButton>
          <button className={styles.signIn}>Sign In</button>
        </SignInButton>

        <SignUpButton>
          <button className={styles.signUp}>Sign Up</button>
        </SignUpButton>
      </section>
    </div>
  );
}
