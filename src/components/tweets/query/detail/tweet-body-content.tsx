import { Card } from "react-bootstrap";
import { User } from "firebase/auth";
import TweetDropdown from "./tweet-dropdown";
import { IReply } from "./reply/query/detail/reply";

export interface TweetBodyContentProps {
  user: User | null;
  timeAgo: string | undefined;
  message: string;
  photo?: string | undefined;
  tweetUserId: string;
  tweetUsername: string;
  replys: IReply[];
  handleShowModifyTweetModal: () => void;
  handleShowDeleteModal: () => void;
  handleShowReplyListModal: () => void;
}

export default function TweetBodyContent({
  user,
  timeAgo,
  message,
  photo,
  tweetUserId,
  tweetUsername,
  replys,
  handleShowModifyTweetModal,
  handleShowDeleteModal,
  handleShowReplyListModal,
}: TweetBodyContentProps) {
  return (
    <div className="w-100">
      <Card.Title className="d-flex justify-content-between mb-4">
        <div>
          <p className="fw-bold">
            {user?.uid === tweetUserId ? user?.displayName! : tweetUsername}
          </p>
          <span className="fs-6 text-muted">{timeAgo}</span>
        </div>
        <TweetDropdown
          user={user}
          tweetUserId={tweetUserId}
          replys={replys}
          handleShowModifyTweetModal={handleShowModifyTweetModal}
          handleShowDeleteModal={handleShowDeleteModal}
          handleShowReplyListModal={handleShowReplyListModal}
        />
      </Card.Title>
      <Card.Text>{message}</Card.Text>
      {photo && (
        <Card.Img variant="top" src={photo} className="mt-4 rounded-4" />
      )}
    </div>
  );
}
