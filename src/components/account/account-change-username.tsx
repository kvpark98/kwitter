import { Link } from "react-router-dom";

export default function AccountChangeUsername() {
  return (
    <div className="mb-5">
      <h1 className="fs-3">Change Username</h1>
      <hr />
      <p className="mb-3">
        Transform your identity by easily changing your name.
      </p>
      <Link to="/account/change-username" className="btn btn-outline-success">
        Change Username
      </Link>
    </div>
  );
}
