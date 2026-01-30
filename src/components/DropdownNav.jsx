import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import styles from "@/styles/DropdownNavStyles.module.css";
import Link from "next/link";
import {
  UserAvatar,
  UserButton,
  UserProfile,
  SignOutButton,
} from "@clerk/nextjs";
import {
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DotFilledIcon,
  HamburgerMenuIcon,
} from "@radix-ui/react-icons";
import { currentUser } from "@clerk/nextjs/server";

export default async function DropdownNav() {
  const user = await currentUser();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className={styles.IconButton} aria-label="Customise options">
          <HamburgerMenuIcon />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className={styles.Content} sideOffset={5}>
          <DropdownMenu.Label className={styles.Label}>Menu</DropdownMenu.Label>
          <DropdownMenu.Separator className={styles.Separator} />
          <DropdownMenu.Item className={styles.Item}>
            <Link href={`/my-profile/${user?.username}`}>My Profile</Link>{" "}
            <div className={styles.RightSlot}>
              <UserAvatar />
            </div>
          </DropdownMenu.Item>
          <DropdownMenu.Separator className={styles.Separator} />
          <DropdownMenu.Item className={styles.Item}>
            <Link href={`/timeline`}>The Empty Room...</Link>{" "}
          </DropdownMenu.Item>
          <DropdownMenu.Separator className={styles.Separator} />
          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger className={styles.SubTrigger}>
              <ChevronLeftIcon />
              <div className={styles.RightSlotOption}>My Account</div>
            </DropdownMenu.SubTrigger>
            <DropdownMenu.Portal>
              <DropdownMenu.SubContent
                className={styles.SubContent}
                sideOffset={2}
                alignOffset={-5}
              >
                <DropdownMenu.Item className={styles.Item}>
                  <Link href={`/account-settings/${user?.username}`}>
                    My Account Settings
                  </Link>
                </DropdownMenu.Item>
                <DropdownMenu.Separator className={styles.Separator} />
                <DropdownMenu.Item className={styles.Item}>
                  {" "}
                  <div className={styles.RightSlot}>
                    <SignOutButton />
                  </div>
                </DropdownMenu.Item>

                <DropdownMenu.Separator className={styles.Separator} />
              </DropdownMenu.SubContent>
            </DropdownMenu.Portal>
          </DropdownMenu.Sub>

          <DropdownMenu.Separator className={styles.Separator} />

          <DropdownMenu.Arrow className={styles.Arrow} />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
