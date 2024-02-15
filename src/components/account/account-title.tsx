import { Link } from "react-router-dom";

export default function AccountTitle() {
  return (
    <div className="d-flex justify-content-between align-items-center">
      <h1 className="fs-2">Account</h1>
      <Link to="/" className="btn btn-outline-success">
        Home
      </Link>
    </div>
  );
}
