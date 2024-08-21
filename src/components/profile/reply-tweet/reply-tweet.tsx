import { Modal } from "react-bootstrap";
import Tweet, { ITweet } from "../../tweets/query/detail/tweet";
import NoTweet from "../../tweets/no-tweet";
import ReplyTweetHeader from "./reply-tweet-header";
import ReplyTweetFooter from "./reply-tweet-footer";

export interface ReplyTweetProps {
  tweets: ITweet[];
  showReplyTweetModal?: boolean;
  setShowReplyTweetModal?: React.Dispatch<React.SetStateAction<boolean>>;
  isOpenReplyTweetModal?: boolean;
  setIsOpenReplyTweetModal?: React.Dispatch<React.SetStateAction<boolean>>;
  handleCloseReplyTweetModal?: () => void;
}

export default function ReplyTweet({
  tweets,
  showReplyTweetModal,
  setShowReplyTweetModal,
  isOpenReplyTweetModal,
  setIsOpenReplyTweetModal,
  handleCloseReplyTweetModal,
}: ReplyTweetProps) {
  return (
    <Modal
      show={showReplyTweetModal}
      onHide={handleCloseReplyTweetModal}
      backdrop="static"
      keyboard={false}
      className="border-0"
      centered
    >
      <ReplyTweetHeader
        handleCloseReplyTweetModal={handleCloseReplyTweetModal}
      />
      {tweets.length !== 0 ? (
        <div>
          {tweets.map((tweet) => {
            return (
              <Tweet
                key={tweet.id}
                showReplyTweetModal={showReplyTweetModal}
                setShowReplyTweetModal={setShowReplyTweetModal}
                isOpenReplyTweetModal={isOpenReplyTweetModal}
                setIsOpenReplyTweetModal={setIsOpenReplyTweetModal}
                {...tweet}
              />
            );
          })}
        </div>
      ) : (
        <NoTweet />
      )}
      <ReplyTweetFooter
        handleCloseReplyTweetModal={handleCloseReplyTweetModal}
      />
    </Modal>
  );
}
