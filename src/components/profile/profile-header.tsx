import { Navbar } from "react-bootstrap";
import ProfileBack from "./profile-back";
import { User } from "firebase/auth";
import ProfileTitle from "./profile-title";

export interface ProfileHeaderProps {
  user: User | null;
  back: () => void;
}

export default function ProfileHeader({ user, back }: ProfileHeaderProps) {
  return (
    <Navbar bg="dark" className="d-flex align-items-center" sticky="top">
      <ProfileBack back={back} />
      <ProfileTitle user={user} />
    </Navbar>
  );
}
