import { auth } from "../../../firebase";

export default function CreateTweetProfile() {
  return (
    <div className="me-2">
      <img
        src={auth.currentUser?.photoURL ?? "/default-profile.png"}
        title={auth.currentUser?.displayName!}
        alt="Profile Image"
        width="40"
        height="40"
        className="rounded-circle bg-light"
      />
    </div>
  );
}
