import { Nav } from "react-bootstrap";
import TweetListFilter from "../tweets/query/list/tweet-list-filter";
import { ITweet } from "../tweets/query/detail/tweet";
import { IReply } from "../tweets/query/detail/reply/query/detail/reply";

export interface ProfileNavProps {
  isTweetActive: boolean;
  handleTweetActive: () => void;
  handleReplyActive: () => void;
  tweets: ITweet[];
  replys: IReply[];
  sortCriteria: string;
  handleSortCriteria: (event: React.MouseEvent<HTMLButtonElement>) => void;
  sortOrder: boolean;
  handleSortOrder: () => void;
  resetCriteria: () => void;
}

export default function ProfileNav({
  isTweetActive,
  handleTweetActive,
  handleReplyActive,
  tweets,
  replys,
  sortCriteria,
  handleSortCriteria,
  sortOrder,
  handleSortOrder,
  resetCriteria,
}: ProfileNavProps) {
  return (
    <Nav
      variant="tabs"
      className="d-flex justify-content-between mt-5"
      defaultActiveKey="tweets"
    >
      <Nav.Item className="d-flex ms-2">
        <Nav.Link
          onClick={handleTweetActive}
          eventKey="tweets"
          className="d-flex justify-content-center align-items-center"
        >
          Tweets
        </Nav.Link>
        <Nav.Link
          onClick={handleReplyActive}
          eventKey="replys"
          className="d-flex justify-content-center align-items-center"
        >
          Replys
        </Nav.Link>
      </Nav.Item>
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
    </Nav>
  );
}
