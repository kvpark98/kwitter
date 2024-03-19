import { Card } from "react-bootstrap";
import TweetBody from "./tweet-body";
import TweetFooter from "./tweet-footer";
import { User } from "firebase/auth";

export interface TweetCardProps {
  user: User | null;
  timeAgo: string | undefined;
  message: string;
  photo?: string | undefined;
  userId: string;
  username: string;
  handleShowTweetModifyModal: () => void;
  handleShowDeleteModal: () => void;
}

export default function TweetCard({
  user,
  timeAgo,
  message,
  photo,
  userId,
  username,
  handleShowTweetModifyModal,
  handleShowDeleteModal,
}: TweetCardProps) {
  return (
    <Card className="d-flex rounded-0 mb-2">
      <TweetBody
        user={user}
        message={message}
        photo={photo}
        username={username}
        userId={userId}
        handleShowTweetModifyModal={handleShowTweetModifyModal}
        handleShowDeleteModal={handleShowDeleteModal}
      />
      <TweetFooter timeAgo={timeAgo} />
    </Card>
  );
}
