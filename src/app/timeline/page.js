import DropdownNav from "@/components/DropdownNav";
import PostDialogue from "@/components/PostDialog";
import { db } from "@/utils/dbConnection";
import Link from "next/link";

import { currentUser } from "@clerk/nextjs/server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function TimelinePage() {
  // TODO: render list of all posts from all users --> by date?
  // render the user that posted them? --> card --> maybe an imported component??
  const timeline = (
    await db.query(
      `SELECT social_posts.*, social_users.user_username FROM social_posts JOIN social_users ON social_users.user_id = social_posts.user_id`,
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

    revalidatePath(`/timeline`);
    redirect(`/timeline`);
  }
  const formatter = new Intl.DateTimeFormat(`en-UK`, {
    hour: `2-digit`,
    minute: `2-digit`,
  });
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
            className="border-2 border-white m-4 p-4 flex flex-row gap-2 w-2/3 place-self-center"
          >
            <p>
              {post.post_date.toISOString().split("T")[0]}{" "}
              {formatter.format(post.post_date)}
            </p>
            <p className="mt-4">{post.user_username}: </p>

            <p className="mt-4">&quot;{post.post_content}&quot;</p>
          </div>
        ))}
      </main>
    </div>
  );
}
