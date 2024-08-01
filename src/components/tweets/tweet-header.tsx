import { Navbar } from "react-bootstrap";
import TweetBack from "./tweet-back";
import TweetTitle from "./tweet-title";
import { ITweet } from "./query/detail/tweet";
import TweetSortCriteria from "./tweet-sort-criteria";
import TweetSortOrder from "./tweet-sort-order";
import TweetResetCriteria from "./tweet-reset-criteria";

export interface TweetHeaderProps {
  tweets: ITweet[];
  back: () => void;
  sortCriteria: string;
  handleSortCriteria: (event: React.MouseEvent<HTMLButtonElement>) => void;
  sortOrder: boolean;
  handleSortOrder: () => void;
  resetCriteria: () => void;
}

export default function TweetHeader({
  tweets,
  back,
  sortCriteria,
  handleSortCriteria,
  sortOrder,
  handleSortOrder,
  resetCriteria,
}: TweetHeaderProps) {
  return (
    <Navbar bg="dark" className="d-flex align-items-center" sticky="top">
      <TweetBack back={back} />
      <TweetTitle tweets={tweets} />
      <TweetSortCriteria
        sortCriteria={sortCriteria}
        handleSortCriteria={handleSortCriteria}
      />
      <TweetSortOrder sortOrder={sortOrder} handleSortOrder={handleSortOrder} />
      <TweetResetCriteria resetCriteria={resetCriteria} />
    </Navbar>
  );
}
