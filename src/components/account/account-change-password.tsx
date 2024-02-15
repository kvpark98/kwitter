import { Link } from "react-router-dom";

export default function AccountChangePassword() {
  return (
    <div className="mb-5">
      <h1 className="fs-3">Change Password</h1>
      <hr />
      <p className="mb-3">
        Enhance account security by changing your password.
      </p>
      <Link to="/account/change-password" className="btn btn-outline-success">
        Change Password
      </Link>
    </div>
  );
}
