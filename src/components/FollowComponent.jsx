import { db } from "@/utils/dbConnection";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export default async function FollowComponent({ username, user_id }) {
  const { id } = await currentUser();

  const followData = await db.query(
    `SELECT * FROM social_follow WHERE user_username = $1`,
    [username],
  );

  console.log(followData);

  async function followUser(formData) {
    "use server";

    const followId = user_id + id;

    const { username } = Object.fromEntries(formData);

    // Need to ensure that we have all of the data
    db.query(
      `INSERT INTO social_follow ( follow_id, user_username, user_id, current_user_id) VALUES ($1, $2, $3, $4)`,
      [followId, username, user_id, id],
    );
    revalidatePath(`timeline/user/${username}`);
  }

  return (
    <>
      <div>
        <form action={followUser}>
          <input
            hidden
            name="username"
            defaultValue={followData?.user_username}
          />
          {followData.length > 0 ? followData.length : 0} followers{" "}
          <button type="submit">Follow</button>
        </form>
      </div>
    </>
  );
}
