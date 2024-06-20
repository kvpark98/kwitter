import { Card } from "react-bootstrap";
import { User } from "firebase/auth";
import TweetDropdown from "./tweet-dropdown";
import { IReply } from "./reply/query/detail/reply";

export interface TweetBodyContentProps {
  user: User | null;
  message: string;
  photo?: string | undefined;
  userId: string;
  username: string;
  replys: IReply[];
  handleShowModifyTweetModal: () => void;
  handleShowDeleteModal: () => void;
  handleShowReplyListModal: () => void;
}

export default function TweetBodyContent({
  user,
  message,
  photo,
  userId,
  username,
  replys,
  handleShowModifyTweetModal,
  handleShowDeleteModal,
  handleShowReplyListModal,
}: TweetBodyContentProps) {
  return (
    <div className="w-100">
      <Card.Title className="d-flex justify-content-between mb-3">
        <span className="fw-bold">
          {user?.uid === userId ? user?.displayName! : username}
        </span>
        <TweetDropdown
          user={user}
          userId={userId}
          replys={replys}
          handleShowModifyTweetModal={handleShowModifyTweetModal}
          handleShowDeleteModal={handleShowDeleteModal}
          handleShowReplyListModal={handleShowReplyListModal}
        />
      </Card.Title>
      <Card.Text>{message}</Card.Text>
      {photo && (
        <Card.Img variant="top" src={photo} className="mt-3 rounded-4" />
      )}
    </div>
  );
}
