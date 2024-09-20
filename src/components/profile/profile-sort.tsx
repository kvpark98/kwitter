import { Navbar } from "react-bootstrap";
import { ITweet } from "../tweets/query/detail/tweet";
import { IReply } from "../tweets/query/detail/reply/query/detail/reply";
import TweetListFilter from "../tweets/query/list/tweet-list-filter";

export interface ProfileSortProps {
  isTweetActive: boolean;
  tweets: ITweet[];
  replys: IReply[];
  sortOrder: boolean;
  handleSortOrder: () => void;
}

export default function ProfileSort({
  isTweetActive,
  tweets,
  replys,
  sortOrder,
  handleSortOrder,
}: ProfileSortProps) {
  return (
    <Navbar
      bg="light"
      className="d-flex justify-content-end align-items-center"
    >
      {((isTweetActive && tweets.length !== 0) ||
        (!isTweetActive && replys.length !== 0)) && (
        <TweetListFilter
          sortOrder={sortOrder}
          handleSortOrder={handleSortOrder}
        />
      )}
    </Navbar>
  );
}
