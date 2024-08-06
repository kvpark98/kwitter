import { Nav } from "react-bootstrap";
import TweetListFilter from "../tweets/query/list/tweet-list-filter";
import { ITweet } from "../tweets/query/detail/tweet";

export interface ProfileNavProps {
  postActive: () => void;
  tweets: ITweet[];
  sortCriteria: string;
  handleSortCriteria: (event: React.MouseEvent<HTMLButtonElement>) => void;
  sortOrder: boolean;
  handleSortOrder: () => void;
  resetCriteria: () => void;
}

export default function ProfileNav({
  postActive,
  tweets,
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
      defaultActiveKey="posts"
    >
      <Nav.Item className="d-flex ms-2">
        <Nav.Link onClick={postActive} eventKey="posts">
          Posts
        </Nav.Link>
        <Nav.Link eventKey="replys">Replys</Nav.Link>
      </Nav.Item>
      {tweets.length !== 0 && (
        <TweetListFilter
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
