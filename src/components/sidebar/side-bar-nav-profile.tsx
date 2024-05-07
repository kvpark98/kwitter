import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function SideBarNavProfile() {
  return (
    <Nav.Item>
      <Link
        to="/profile"
        title="Profile"
        {...(window.location.href.includes("profile")
          ? {
              className:
                "active nav-link rounded-circle d-flex justify-content-center align-items-center text-white p-3",
            }
          : {
              className:
                "nav-link rounded-circle d-flex justify-content-center align-items-center text-dark p-3",
            })}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          className="bi bi-person-circle"
          viewBox="0 0 16 16"
        >
          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
          <path
            fillRule="evenodd"
            d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
          />
        </svg>
      </Link>
    </Nav.Item>
  );
}
