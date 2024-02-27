import { Link } from "react-router-dom";
import { auth } from "../../../firebase";

export default function CreateTweetProfile() {
  return (
    <Link to="/profile" title={auth.currentUser?.displayName!} className="me-2">
      <img
        src={auth.currentUser?.photoURL ?? "/default-profile.png"}
        alt="Profile Image"
        width="40"
        height="40"
        className="rounded-circle bg-light"
      />
    </Link>
  );
}
