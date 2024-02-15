import { Link } from "react-router-dom";

export default function AccountDeleteAccount() {
  return (
    <div className="mb-5">
      <h1 className="fs-3 text-danger">Delete Account</h1>
      <hr />
      <p className="mb-3">
        After account deletion, there is no turning back. Please proceed with
        certainty.
      </p>
      <Link to="/account/delete-account" className="btn btn-outline-danger">
        Delete Account
      </Link>
    </div>
  );
}
