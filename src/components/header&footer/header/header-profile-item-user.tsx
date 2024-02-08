import { Dropdown } from "react-bootstrap";
import { auth } from "../../../firebase";

export default function HeaderProfileItemUser() {
  return (
    <Dropdown.Item
      className="d-flex justify-content-center align-items-center"
      disabled
    >
      <img
        src="/default-profile.png"
        alt="Profile Image"
        width="25"
        height="25"
        className="rounded-circle align-middle bg-secondary me-3"
      />
      <p>{auth.currentUser?.displayName}</p>
    </Dropdown.Item>
  );
}
