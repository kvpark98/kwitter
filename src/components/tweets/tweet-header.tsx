import { Navbar } from "react-bootstrap";
import TweetBack from "./tweet-back";
import TweetTitle from "./tweet-title";
import { ITweet } from "./query/detail/tweet";

export interface TweetHeaderProps {
  tweets: ITweet[];
  back: () => void;
}

export default function TweetHeader({ tweets, back }: TweetHeaderProps) {
  return (
    <Navbar bg="dark" className="d-flex align-items-center" sticky="top">
      <TweetBack back={back} />
      <TweetTitle tweets={tweets} />
    </Navbar>
  );
}
