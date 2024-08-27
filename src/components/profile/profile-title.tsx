import { User } from "firebase/auth";

export interface ProfileTitleProps {
  user: User | null;
}

export default function ProfileTitle({ user }: ProfileTitleProps) {
  return (
    <div className="d-flex justify-content-between align-items-center px-2 w-100">
      <h1 className="text-decoration-none text-light p-0 fs-5 fw-bold">
        {user?.displayName ?? "Anonymous"}
      </h1>
    </div>
  );
}
