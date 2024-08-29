import { Navbar } from "react-bootstrap";
import { ITweet } from "../detail/tweet";
import TweetListBack from "./tweet-list-back";
import TweetListTitle from "./tweet-list-title";

export interface TweetListHeaderProps {
  tweets: ITweet[];
  back: () => void;
}

export default function TweetListHeader({
  tweets,
  back,
}: TweetListHeaderProps) {
  return (
    <Navbar bg="dark" className="d-flex align-items-center" sticky="top">
      <TweetListBack back={back} />
      <TweetListTitle tweets={tweets} />
    </Navbar>
  );
}
