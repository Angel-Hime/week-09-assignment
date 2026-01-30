import DropdownNav from "@/components/DropdownNav";
import { UserProfile } from "@clerk/nextjs";

export default function ProfileSettings() {
  return (
    <>
      <UserProfile />
    </>
  );
}
