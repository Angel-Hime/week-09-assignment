import HoverProfile from "@/components/HoverProfile";
import PostDialogue from "@/components/PostDialog";
import { db } from "@/utils/dbConnection";

import { currentUser } from "@clerk/nextjs/server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function TimelinePage() {
  // TODO: render list of all posts from all users --> by date?
  // render the user that posted them? --> card --> maybe an imported component??

  const timeline = (
    await db.query(
      `SELECT social_posts.*, social_users.user_username, social_users.user_bio FROM social_posts JOIN social_users ON social_users.user_id = social_posts.user_id`,
    )
  ).rows;

  // TODO: we want to render a form to insert posts data into posts table
  // - we also need to insert the user id into the posts table, make sure that you have some sql that reads the user id from the users table, OR use the auth function from clerk to get that data(the userID)
  // n.b. the user won't know their own id

  const { id } = await currentUser();
  // console.log(id);

  async function handlePost(formData) {
    "use server";

    const { content } = Object.fromEntries(formData);
    console.log(content);
    db.query(
      `INSERT INTO social_posts (post_content, user_id) VALUES ($1, $2)`,
      [content, id],
    );

    db.query();
    revalidatePath(`/timeline`);
    redirect(`/timeline`);
  }
  const formatter = new Intl.DateTimeFormat(`en-UK`, {
    hour: `2-digit`,
    minute: `2-digit`,
  });

  async function handleLike(formData) {
    "use server";
    const { postId, likes } = Object.fromEntries(formData);
    console.log(postId);
    const like = Number(likes) + 1;
    console.log(like);

    db.query(`INSERT INTO social_likes (post_id, user_id) VALUES ($1, $2)`, [
      postId,
      id,
    ]);

    db.query(`UPDATE social_posts SET post_likes = $1 WHERE post_id = $2`, [
      like,
      postId,
    ]);
    revalidatePath(`/timeline`);
  }

  return (
    <div>
      <header className="flex flex-col  place-self-center items-center gap-10">
        <h1>
          Even when you think you are on your own, people still have something
          to say, check these out...
        </h1>
        <PostDialogue
          handle={handlePost}
          trigger={"Shout into the void!"}
          description={"Go on then... say something vacuous..."}
        />
      </header>
      <main className="flex flex-col">
        {timeline.map((post) => (
          <div
            key={post.post_id}
            className="place-self-center border-2 border-white m-4 p-4 flex flex-row gap-2 w-2/3 justify-between"
          >
            <HoverProfile username={post.user_username} bio={post.user_bio} />

            <p>&quot;{post.post_content}&quot;</p>

            <p>
              {post.post_date.toISOString().split("T")[0]}{" "}
              {formatter.format(post.post_date)}
            </p>

            <form action={handleLike}>
              <input type="hidden" name="postId" value={post.post_id} />
              <input type="hidden" name="likes" value={post.post_likes} />
              {post.post_likes} 💖 <button type="submit">Like</button>
            </form>
          </div>
        ))}
      </main>
    </div>
  );
}
