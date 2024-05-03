import { Navbar } from "react-bootstrap";
import ProfileBack from "./profile-back";
import { User } from "firebase/auth";
import { ITweet } from "../tweets/query/detail/tweet";
import ProfileTitle from "./profile-title";

export interface ProfileHeaderProps {
  user: User | null;
  tweets: ITweet[];
  back: () => void;
}

export default function ProfileHeader({
  user,
  tweets,
  back,
}: ProfileHeaderProps) {
  return (
    <Navbar bg="dark" className="d-flex align-items-center">
      <ProfileBack back={back} />
      <ProfileTitle user={user} tweets={tweets} />
    </Navbar>
  );
}
