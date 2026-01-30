// TODO: render users' data
//  - READ user's data from db table
// - option to read the user's posts specific to this user --> personal posts

import PostDialogue from "@/components/PostDialog";
import { db } from "@/utils/dbConnection";
import { UserAvatar } from "@clerk/nextjs";

import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

import { notFound, redirect } from "next/navigation";

// followers list popover component?

// The clery ID does not exist until the user signs up
// --> auth helper includes user ID value to be destructured
// --> ccurentUser() this will have the data for the specific user --> can be used
//  --> the id will only be generated when you sign-up. --> POST to db on sign up --> mandatory sign up
// - show sign up and sign in buttons first thing

// optional chaining ( x? ) --> look it up because it will help with wrangling user data

export default async function ProfilePage({ params }) {
  const { username } = await params;

  // db query to get data from the tables
  const userQuery = await db.query(
    `SELECT * FROM social_users WHERE user_username = $1`,
    [username],
  );
  console.log(userQuery);

  const userInfo = userQuery.rows[0];
  // console.log(userInfo);

  const user = await currentUser();
  console.log(user.id);

  const postsQuery = (
    await db.query(`SELECT * FROM social_posts WHERE user_id = $1`, [user.id])
  ).rows;

  async function handleEditPost(formData) {
    "use server";
    const { content, post_id } = Object.fromEntries(formData);
    const updateDate = new Date();
    console.log(updateDate);
    db.query(
      `UPDATE social_posts SET post_date = $1, post_content = $2 WHERE post_id = $3`,
      [updateDate, content, post_id],
    );
    revalidatePath(`/profile/${username}`);
    redirect(`/profile/${username}`);
  }

  console.log(postsQuery);

  if (userQuery.rows.length === 0) {
    notFound();
  }

  // users can only see their own profile page
  if (username != user.username) {
    redirect(`/profile/${user.username}`);
  }

  const formatter = new Intl.DateTimeFormat(`en-UK`, {
    hour: `2-digit`,
    minute: `2-digit`,
  });

  return (
    <>
      {/* Will probably have to pass props */}
      <fieldset>
        <div className="flex flex-row gap-5">
          <UserAvatar />
          <h2>{userInfo.user_username}&apos;s Profile</h2>
        </div>
        <p>My Bio: {userInfo.user_bio}</p>
      </fieldset>
      <fieldset className="flex flex-col items-center">
        <legend> Look at what you shouted to nobody... </legend>

        {/* render personal posts here */}
        {postsQuery.map((post) => (
          <div
            className="border-2 border-white m-4 p-4 flex flex-row gap-2 w-2/3 justify-between"
            key={post.post_id}
          >
            <div>
              {" "}
              {post.post_date.toISOString().split("T")[0]}{" "}
              {formatter.format(post.post_date)}
            </div>
            <p>&quot;{post.post_content}&quot;</p>{" "}
            <div className="place-self-end">
              <PostDialogue
                handle={handleEditPost}
                trigger={"Edit This..."}
                description={"...it wasn't purile enough?"}
                prefill={post}
              />
            </div>
          </div>
        ))}
      </fieldset>
      {/* <UserProfile />  */}
      {/* We should link to this but need a catch all if so */}
    </>
  );
}
