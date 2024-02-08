import { Dropdown } from "react-bootstrap";

export default function HeaderProfileToggle() {
  return (
    <Dropdown.Toggle
      variant="link"
      id="dropdown-basic"
      className="text-decoration-none p-0"
      aria-controls="s"
    >
      <img
        src="/default-profile.png"
        alt="Profile Image"
        width="30"
        height="30"
        className="rounded-circle align-middle bg-light"
      />
    </Dropdown.Toggle>
  );
}
