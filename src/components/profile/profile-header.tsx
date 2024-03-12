import { Navbar } from "react-bootstrap";
import ProfileBack from "./profile-back";
import UsernameTitle from "./username/profile-title";
import { User } from "firebase/auth";
import { ITweet } from "../tweets/query/detail/tweet";

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
    <Navbar bg="light" className="d-flex align-items-center">
      <ProfileBack back={back} />
      <UsernameTitle user={user} tweets={tweets} />
    </Navbar>
  );
}
