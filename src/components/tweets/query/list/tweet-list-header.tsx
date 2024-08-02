import { Navbar } from "react-bootstrap";
import { ITweet } from "../detail/tweet";
import TweetListBack from "./tweet-list-back";
import TweetListTitle from "./tweet-list-title";
import TweetListFilter from "./tweet-list-filter";

export interface TweetListHeaderProps {
  tweets: ITweet[];
  back: () => void;
  sortCriteria: string;
  handleSortCriteria: (event: React.MouseEvent<HTMLButtonElement>) => void;
  sortOrder: boolean;
  handleSortOrder: () => void;
  resetCriteria: () => void;
}

export default function TweetListHeader({
  tweets,
  back,
  sortCriteria,
  handleSortCriteria,
  sortOrder,
  handleSortOrder,
  resetCriteria,
}: TweetListHeaderProps) {
  return (
    <Navbar bg="dark" className="d-flex align-items-center" sticky="top">
      <TweetListBack back={back} />
      <TweetListTitle tweets={tweets} />
      {tweets.length !== 0 && (
        <TweetListFilter
          sortCriteria={sortCriteria}
          handleSortCriteria={handleSortCriteria}
          sortOrder={sortOrder}
          handleSortOrder={handleSortOrder}
          resetCriteria={resetCriteria}
        />
      )}
    </Navbar>
  );
}
