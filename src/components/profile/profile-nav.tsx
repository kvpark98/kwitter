import { Nav } from "react-bootstrap";
import { ITweet } from "../tweets/query/detail/tweet";
import { IReply } from "../tweets/query/detail/reply/query/detail/reply";

export interface ProfileNavProps {
  handleTweetActive: () => void;
  handleReplyActive: () => void;
  tweets: ITweet[];
  replys: IReply[];
}

export default function ProfileNav({
  handleTweetActive,
  handleReplyActive,
  tweets,
  replys,
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
          Tweets ({tweets.length})
        </Nav.Link>
        <Nav.Link
          onClick={handleReplyActive}
          eventKey="replys"
          className="d-flex justify-content-center align-items-center"
        >
          Replys ({replys.length})
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}
