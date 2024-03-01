import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function SideBarNavProfile() {
  return (
    <Nav.Item>
      <Link
        to="/profile"
        {...(window.location.href.includes("profile")
          ? {
              className:
                "active nav-link rounded-pill d-flex align-items-center text-white",
            }
          : {
              className:
                "nav-link rounded-pill d-flex align-items-center text-dark",
            })}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          fill="currentColor"
          className="bi bi-person-circle me-3"
          viewBox="0 0 16 16"
        >
          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
          <path
            fillRule="evenodd"
            d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
          />
        </svg>
        <span>Profile</span>
      </Link>
    </Nav.Item>
  );
}
