import TweetFooterModifyButton from "./tweet-footer-modify-button";
import TweetFooterDeleteButton from "./tweet-footer-delete-button";

export interface TweetFooterButtonsProps {
  handleShowModifyModal: () => void;
  handleShowDeleteModal: () => void;
}

export default function TweetFooterButtons({
  handleShowModifyModal,
  handleShowDeleteModal,
}: TweetFooterButtonsProps) {
  return (
    <div className="d-flex">
      <TweetFooterModifyButton handleShowModifyModal={handleShowModifyModal} />
      <TweetFooterDeleteButton handleShowDeleteModal={handleShowDeleteModal} />
    </div>
  );
}
