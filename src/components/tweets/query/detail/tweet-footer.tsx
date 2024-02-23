import { User } from "firebase/auth";
import { Card } from "react-bootstrap";
import TweetFooterDropdown from "./tweet-footer-dropdown";

export interface TweetFooterProps {
  user: User | null;
  timeAgo: string | undefined;
  userId: string;
  handleShowModifyModal: () => void;
  handleShowDeleteModal: () => void;
}

export default function TweetFooter({
  user,
  timeAgo,
  userId,
  handleShowModifyModal,
  handleShowDeleteModal,
}: TweetFooterProps) {
  return (
    <Card.Footer className="d-flex justify-content-between align-items-center">
      <p className="d-flex align-items-center text-muted">{timeAgo}</p>
      {user?.uid === userId && (
        <TweetFooterDropdown
          handleShowModifyModal={handleShowModifyModal}
          handleShowDeleteModal={handleShowDeleteModal}
        />
      )}
    </Card.Footer>
  );
}
