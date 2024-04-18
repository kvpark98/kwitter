import { Card } from "react-bootstrap";
import TweetBody from "./tweet-body";
import TweetFooter from "./tweet-footer";
import { User } from "firebase/auth";

export interface TweetCardProps {
  user: User | null;
  avatar: string;
  timeAgo: string | undefined;
  message: string;
  photo?: string | undefined;
  userId: string;
  username: string;
  handleShowModifyTweetModal: () => void;
  handleShowDeleteModal: () => void;
}

export default function TweetCard({
  user,
  avatar,
  timeAgo,
  message,
  photo,
  userId,
  username,
  handleShowModifyTweetModal,
  handleShowDeleteModal,
}: TweetCardProps) {
  return (
    <Card className="d-flex rounded-0 mb-2">
      <TweetBody
        user={user}
        avatar={avatar}
        message={message}
        photo={photo}
        username={username}
        userId={userId}
        handleShowModifyTweetModal={handleShowModifyTweetModal}
        handleShowDeleteModal={handleShowDeleteModal}
      />
      <TweetFooter timeAgo={timeAgo} />
    </Card>
  );
}
