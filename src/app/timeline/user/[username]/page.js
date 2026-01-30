import { db } from "@/utils/dbConnection";
import { currentUser } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";

export default async function PublicProfile({ params }) {
  const { username } = await params;
  console.log(username);
  // db query to get data from the tables

  const userQuery = (
    await db.query(
      `SELECT social_users.user_username, social_users.user_bio, social_users.user_id, social_posts.* FROM social_users JOIN social_posts ON social_users.user_id = social_posts.user_id WHERE user_username = $1`,
      [username],
    )
  ).rows;

  console.log(userQuery);

  //   const postsQuery = (
  //     await db.query(`SELECT * FROM social_posts WHERE user_username = $1`, [
  //       username,
  //     ])
  //   ).rows;
  const usernameCurrent = await currentUser();

  console.log(usernameCurrent.username);

  if (username === usernameCurrent.username) {
    redirect(`/my-profile/${usernameCurrent.username}`);
  }

  if (userQuery.length === 0) {
    notFound();
  }

  const formatter = new Intl.DateTimeFormat(`en-UK`, {
    hour: `2-digit`,
    minute: `2-digit`,
  });

  return (
    <>
      <fieldset>
        <legend>{username}&apos;s Profile</legend>
        <div className="flex flex-row gap-5"></div>
        <p>
          {username}&apos;s Bio: {userQuery[0].user_bio}
        </p>
      </fieldset>
      <fieldset className="flex flex-col items-center">
        <legend> Look at what {username} said in The Empty Room... </legend>

        {/* render personal posts here */}
        {userQuery.map((post) => (
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
            <div className="place-self-end"></div>
          </div>
        ))}
      </fieldset>
    </>
  );
}
