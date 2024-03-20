import { Button } from "react-bootstrap";

export interface SideBarNavPostProps {
  handleShowCreateTweetModal: () => void;
}

export default function SideBarNavPost({
  handleShowCreateTweetModal,
}: SideBarNavPostProps) {
  return (
    <Button
      type="button"
      variant="primary"
      className="mt-3 rounded-pill fs-5 fw-bold"
      onClick={handleShowCreateTweetModal}
    >
      Post
    </Button>
  );
}
