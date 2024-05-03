import { Navbar } from "react-bootstrap";
import TweetBack from "./tweet-back";
import TweetTitle from "./tweet-title";

export interface TweetHeaderProps {
  back: () => void;
}

export default function TweetHeader({ back }: TweetHeaderProps) {
  return (
    <Navbar bg="dark" className="d-flex align-items-center">
      <TweetBack back={back} />
      <TweetTitle />
    </Navbar>
  );
}
