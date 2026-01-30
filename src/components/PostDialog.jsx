import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import styles from "@/styles/PostDialogueStyle.module.css";

export default async function PostDialogue({
  handle,
  trigger,
  description,
  prefill,
}) {
  let formattedDate = null;
  let formattedTime = null;
  if (prefill) {
    formattedDate = prefill.post_date.toISOString().split("T")[0];
    const formatter = new Intl.DateTimeFormat(`en-UK`, {
      hour: `2-digit`,
      minute: `2-digit`,
    });
    formattedTime = formatter.format(prefill.post_date);
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className={`${styles.Button} violet`}>{trigger}</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.Overlay} />
        <Dialog.Content className={styles.Content}>
          <Dialog.Title className={styles.Title}>{trigger} </Dialog.Title>

          {prefill ? (
            <Dialog.Description className={styles.Description}>
              You posted at: {formattedTime} {formattedDate}
            </Dialog.Description>
          ) : null}

          <Dialog.Description>{description} </Dialog.Description>
          <form action={handle}>
            <fieldset className={styles.Fieldset}>
              <div>
                <input
                  name="post_id"
                  hidden
                  defaultValue={prefill?.post_id}
                ></input>
              </div>

              <input
                className={styles.Input}
                name="content"
                placeholder="Shout into the empty room..."
                defaultValue={prefill?.post_content}
              />
            </fieldset>

            <div
              style={{
                display: "flex",
                marginTop: 25,
                justifyContent: "flex-end",
              }}
            >
              <button type="submit" className={`${styles.Button} green`}>
                {" "}
                Post
              </button>
            </div>
          </form>
          <Dialog.Close asChild>
            <button className={styles.IconButton} aria-label="Close">
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
