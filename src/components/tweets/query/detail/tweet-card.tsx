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
  handleShowModifyModal: () => void;
  handleShowDeleteModal: () => void;
}

export default function TweetCard({
  user,
  timeAgo,
  message,
  photo,
  userId,
  username,
  handleShowModifyModal,
  handleShowDeleteModal,
}: TweetCardProps) {
  return (
    <Card {...(user?.uid === userId && { border: "dark" })} className="mb-4">
      <TweetBody message={message} photo={photo} username={username} />
      <TweetFooter
        user={user}
        timeAgo={timeAgo}
        userId={userId}
        handleShowModifyModal={handleShowModifyModal}
        handleShowDeleteModal={handleShowDeleteModal}
      />
    </Card>
  );
}
