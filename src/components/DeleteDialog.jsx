import * as AlertDialog from "@radix-ui/react-alert-dialog";
import styles from "@/styles/DeleteDialogStyles.module.css";
import { db } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

export default async function DeleteDialog({ post, username }) {
  async function handleDelete(formData) {
    "use server";

    const post_id = formData.get("post_id");

    console.log(`deleting post...`);

    db.query(`DELETE FROM social_posts WHERE post_id = $1`, [post_id]);

    revalidatePath(`/my-profile/${username}`);
    redirect(`/my-profile/${username}`);
  }

  return (
    <AlertDialog.Root className={styles.Root}>
      <AlertDialog.Trigger asChild>
        <button className={`${styles.Button} violet`}>Delete Post</button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className={styles.Overlay} />
        <AlertDialog.Content className={styles.Content}>
          <AlertDialog.Title className={styles.Title}>
            Delete Post
          </AlertDialog.Title>
          <AlertDialog.Description className={styles.Description}>
            Oh, so you do regret saying this entirely superficial statement, eh?
          </AlertDialog.Description>
          <div style={{ display: "flex", gap: 25, justifyContent: "flex-end" }}>
            <AlertDialog.Cancel asChild>
              <button className={`${styles.Button} muave`}>Cancel</button>
            </AlertDialog.Cancel>
            <form action={handleDelete}>
              <input
                name="post_id"
                defaultValue={post?.post_id}
                type="hidden"
              />
              <button type="submit">I Promise I Want To Delete This!</button>
            </form>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
