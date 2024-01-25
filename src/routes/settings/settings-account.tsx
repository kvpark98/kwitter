import { Container } from "react-bootstrap";
import Footer from "../../components/header&footer/footer";
import Header from "../../components/header&footer/header";
import { Link } from "react-router-dom";
import SettingsSidebar from "../../components/settings/settings-sidebar";
import SettingsTitle from "../../components/settings/settings-title";
import ScrollProfile from "../../components/scrolls/scrollProfile";

export default function SettingsAccount() {
  return (
    <div className="h-100">
      <Header />
      <div className="wrap">
        <Container className="mt-5 h-100">
          <SettingsTitle />
          <hr />
          <div className="d-flex h-100">
            <SettingsSidebar />
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
          <ScrollProfile />
        </Container>
        <Footer />
      </div>
    </div>
  );
}
