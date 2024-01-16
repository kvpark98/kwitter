import { Container } from "react-bootstrap";
import Footer from "../components/header&footer/footer";
import Header from "../components/header&footer/header";
import { Link } from "react-router-dom";

export default function SettingsAccount() {
  return (
    <div className="h-100">
      <Header />
      <div className="wrap">
        <Container className="mt-5 h-100">
          <div className="d-flex align-items-center mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              className="bi bi-gear me-3"
              viewBox="0 0 16 16"
            >
              <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0" />
              <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z" />
            </svg>
            <h1 className="fs-2">Settings</h1>
          </div>
          <hr />
          <div className="d-flex h-100">
            <div
              className="d-flex flex-column flex-shrink-0 p-3 text-bg-light"
              style={{ width: "280px" }}
            >
              <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                  <a
                    href="/settings"
                    className="d-flex align-items-center nav-link text-dark"
                    aria-current="page"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      fill="currentColor"
                      className="bi bi-house-door me-3"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4z" />
                    </svg>
                    <span>Home</span>
                  </a>
                </li>
                <li>
                  <a
                    href="/settings/account"
                    className="d-flex align-items-center nav-link active"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      fill="currentColor"
                      className="bi bi-lock me-3"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2M5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1" />
                    </svg>
                    <span>Account</span>
                  </a>
                </li>
              </ul>
            </div>
            <div className="mt-3 ms-5 w-100 h-100">
              <div className="mb-5">
                <h1 className="fs-3">Change Username</h1>
                <hr />
                <p className="mb-3">
                  Transform your identity by easily changing your name.
                </p>
                <Link
                  to="/settings/account/change-username"
                  className="btn btn-outline-success"
                >
                  Change Username
                </Link>
              </div>
              <div className="mb-5">
                <h1 className="fs-3">Change Password</h1>
                <hr />
                <p className="mb-3">
                  Enhance account security by changing your password.
                </p>
                <Link
                  to="/settings/account/change-password"
                  className="btn btn-outline-success"
                >
                  Change Password
                </Link>
              </div>
              <div className="mb-5">
                <h1 className="fs-3 text-danger">Delete Account</h1>
                <hr />
                <p className="mb-3">
                  After account deletion, there is no turning back. Please
                  proceed with certainty.
                </p>
                <Link
                  to="/settings/account/delete-account"
                  className="btn btn-outline-danger"
                >
                  Delete Account
                </Link>
              </div>
            </div>
          </div>
        </Container>
        <Footer />
      </div>
    </div>
  );
}
