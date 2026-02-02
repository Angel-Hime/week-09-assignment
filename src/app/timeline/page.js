import HoverProfile from "@/components/HoverProfile";

import PostDialogue from "@/components/PostDialog";
import { db } from "@/utils/dbConnection";

import { currentUser } from "@clerk/nextjs/server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function TimelinePage() {
  // to render posts below
  const timeline = (
    await db.query(
      `SELECT social_posts.*, social_users.user_username, social_users.user_bio FROM social_posts JOIN social_users ON social_users.user_id = social_posts.user_id ORDER BY social_posts.post_date DESC`,
    )
  ).rows;
  // to render likes below
  const likeData = (await db.query(`SELECT * FROM social_likes`)).rows;
  console.log(likeData);

  const likeId = likeData.map((like) => {
    return like.like_id;
  });
  // this is an array --> work through it to wrangle each id for below comparison

  // console.log();

  //current id
  const { id } = await currentUser();
  // console.log(id);

  // new post
  async function handlePost(formData) {
    "use server";

    const { content } = Object.fromEntries(formData);
    console.log(content);
    db.query(
      `INSERT INTO social_posts (post_content, user_id) VALUES ($1, $2)`,
      [content, id],
    );

    revalidatePath(`/timeline`);
    redirect(`/timeline`);
  }
  const formatter = new Intl.DateTimeFormat(`en-UK`, {
    hour: `2-digit`,
    minute: `2-digit`,
  });

  // like post
  async function handleLike(formData) {
    "use server";
    const { postId, likes } = Object.fromEntries(formData);
    console.log(postId);
    const like = Number(likes) + 1;
    console.log(like);
    const likeId = postId + id;
    try {
      const likeQuery = (
        await db.query(
          `INSERT INTO social_likes (like_id, post_id, user_id) VALUES ($1, $2, $3)`,
          [likeId, postId, id],
        )
      ).rows;
      if (likeQuery) {
        db.query(`UPDATE social_posts SET post_likes = $1 WHERE post_id = $2`, [
          like,
          postId,
        ]);
      }
    } catch (strays) {
      console.error({ strays });
    }
    revalidatePath(`/timeline`);
    redirect(`/timeline`);
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
              {post.post_likes} 💖
              <button type="submit">Like</button>
            </form>

            {/* ? (
              
            ) : null} */}
          </div>
        ))}
      </main>
    </div>
  );
}
