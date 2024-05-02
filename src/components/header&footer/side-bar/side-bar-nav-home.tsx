import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function SideBarNavHome() {
  return (
    <Nav.Item>
      <Link
        to="/"
        title="Home"
        {...(window.location.href === "http://127.0.0.1:5173/"
          ? {
              className:
                "active nav-link rounded-circle d-flex justify-content-center align-items-center text-white p-3",
            }
          : {
              className:
                "nav-link rounded-circle d-flex justify-content-center align-items-center text-dark p-3",
            })}
        aria-current="page"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          className="bi bi-house-door-fill"
          viewBox="0 0 16 16"
        >
          <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5" />
        </svg>
      </Link>
    </Nav.Item>
  );
}
