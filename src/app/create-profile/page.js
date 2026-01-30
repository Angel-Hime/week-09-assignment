// TODO: form for new user to complete after sign up

import { db } from "@/utils/dbConnection";
import { SignUpButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function CreateProfile({ params }) {
  // need to post the userID to database
  const user = await currentUser();
  // console.log(user);

  const email = user?.emailAddresses[0].emailAddress;

  // console.log(email);

  async function handleCreateProfileForm(formData) {
    "use server";

    const { bio } = Object.fromEntries(formData);
    console.log(formData);

    db.query(
      `INSERT INTO social_users (user_id, user_first, user_second, user_username, user_email, user_bio) VALUES ($1, $2, $3, $4, $5, $6)`,
      [user?.id, user?.firstName, user?.lastName, user?.username, email, bio],
    );

    revalidatePath(`/profile/${user?.username}`);
    redirect(`/profile/${user?.username}`);
  }

  return (
    <section>
      <fieldset>
        <legend>Create User Profile</legend>
        {user ? (
          <div>
            <p>
              Hello: {user?.firstName} {user?.lastName}
            </p>
            <p>Username: {user?.username}</p>
            <p>
              Your Registered Email: {user?.emailAddresses[0].emailAddress}.
            </p>
            <form
              action={handleCreateProfileForm}
              className="flex flex-col gap-4"
            >
              <label htmlFor="bio">Bio</label>
              <textarea
                name="bio"
                type="textarea"
                placeholder="  Add a little bit about yourself!"
                required
              />
              <button type="submit">Submit</button>
            </form>
          </div>
        ) : (
          <div>
            <h1>Not signed in</h1>
            <SignUpButton />
          </div>
        )}
        {/* Collect data */}
      </fieldset>
    </section>
  );
}
