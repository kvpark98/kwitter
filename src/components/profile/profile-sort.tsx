import { Navbar } from "react-bootstrap";
import { ITweet } from "../tweets/query/detail/tweet";
import { IReply } from "../tweets/query/detail/reply/query/detail/reply";
import TweetListFilter from "../tweets/query/list/tweet-list-filter";

export interface ProfileSortProps {
  isTweetActive: boolean;
  tweets: ITweet[];
  replys: IReply[];
  sortCriteria: string;
  handleSortCriteria: (event: React.MouseEvent<HTMLButtonElement>) => void;
  sortOrder: boolean;
  handleSortOrder: () => void;
  resetCriteria: () => void;
}

export default function ProfileSort({
  isTweetActive,
  tweets,
  replys,
  sortCriteria,
  handleSortCriteria,
  sortOrder,
  handleSortOrder,
  resetCriteria,
}: ProfileSortProps) {
  return (
    <Navbar
      bg="light"
      className="d-flex justify-content-end align-items-center"
    >
      {((isTweetActive && tweets.length !== 0) ||
        (!isTweetActive && replys.length !== 0)) && (
        <TweetListFilter
          isTweetActive={isTweetActive}
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
