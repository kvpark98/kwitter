import { Dropdown } from "react-bootstrap";
import { User } from "firebase/auth";
import ReplyDropdownToggle from "./reply-dropdown-toggle";
import ReplyDropdownMenu from "./reply-dropdown-menu";

export interface ReplyDropdownProps {
  user: User | null;
  replyUserId: string;
}

export default function ReplyDropdown({
  user,
  replyUserId,
}: ReplyDropdownProps) {
  return (
    <Dropdown>
      <ReplyDropdownToggle />
      <ReplyDropdownMenu user={user} replyUserId={replyUserId} />
    </Dropdown>
  );
}
