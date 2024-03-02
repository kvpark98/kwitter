import { Link } from "react-router-dom";
import { auth } from "../../../../firebase";

export default function TweetBodyProfile() {
  return (
    <div className="me-2">
      <Link to="/profile" title={auth.currentUser?.displayName!}>
        <img
          src={auth.currentUser?.photoURL ?? "/default-profile.png"}
          alt="Profile Image"
          width="40"
          height="40"
          className="rounded-circle bg-light"
        />
      </Link>
    </div>
  );
}
