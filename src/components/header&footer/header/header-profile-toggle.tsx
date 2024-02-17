import { Dropdown } from "react-bootstrap";
import { auth } from "../../../firebase";

export interface HeaderProfileProps {
  avatar: string | null | undefined;
}

export default function HeaderProfileToggle({ avatar }: HeaderProfileProps) {
  const user = auth.currentUser;

  return (
    <Dropdown.Toggle
      variant="link"
      id="dropdown-basic"
      title={user?.displayName!}
      className="text-decoration-none p-0"
    >
      <img
        src={avatar ?? "/default-profile.png"}
        alt="Profile Image"
        width="30"
        height="30"
        className="rounded-circle align-middle bg-light"
      />
    </Dropdown.Toggle>
  );
}
