import * as HoverCard from "@radix-ui/react-hover-card";
import styles from "@/styles/HoverProfileStyle.module.css";
import Link from "next/link";
import { UserAvatar } from "@clerk/nextjs";

export default function HoverProfile({ username, bio }) {
  return (
    <HoverCard.Root>
      <HoverCard.Trigger asChild>
        <Link
          className={styles.ImageTrigger}
          href={`timeline/user/${username}`}
        >
          <div className="flex flex-row gap-1">
            {/* need to get the poster icon */}
            {username}
          </div>
        </Link>
      </HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content className={styles.Content} sideOffset={5}>
          <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
            {/* need to get the poster icon */}
            <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
              <div>
                <div className={`${styles.Text} bold`}>{username}</div>
                <Link
                  href={`timeline/user/${username}`}
                  className={`${styles.Text} faded`}
                >
                  @{username}
                </Link>
              </div>
              <div className={styles.Text}>{bio}</div>
              <div style={{ display: "flex", gap: 15 }}>
                <div style={{ display: "flex", gap: 5 }}>
                  <div className={`${styles.Text} bold`}>pending...</div>{" "}
                  <div className={`${styles.Text} faded`}>Following</div>
                </div>
                <div style={{ display: "flex", gap: 5 }}>
                  <div className={`${styles.Text} bold`}>pending...</div>{" "}
                  <div className={`${styles.Text} faded`}>Followers</div>
                </div>
              </div>
            </div>
          </div>

          <HoverCard.Arrow className={styles.Arrow} />
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
}
