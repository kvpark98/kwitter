import { Card } from "react-bootstrap";
import { User } from "firebase/auth";
import TweetBodyProfile from "./tweet-body-profile";
import TweetBodyContent from "./tweet-body-content";

export interface TweetBodyProps {
  user: User | null;
  tweetAvatar: string;
  timeAgo: string | undefined;
  message: string;
  photo?: string | undefined;
  tweetUserId: string;
  tweetUsername: string;
  handleShowModifyTweetModal: () => void;
  handleShowDeleteTweetModal: () => void;
}

export default function TweetBody({
  user,
  tweetAvatar,
  timeAgo,
  message,
  photo,
  tweetUserId,
  tweetUsername,
  handleShowModifyTweetModal,
  handleShowDeleteTweetModal,
}: TweetBodyProps) {
  return (
    <Card.Body
      {...(user?.uid === tweetUserId
        ? { className: "d-flex bg-primary-subtle" }
        : { className: "d-flex" })}
    >
      <TweetBodyProfile
        user={user}
        tweetAvatar={tweetAvatar}
        tweetUserId={tweetUserId}
        tweetUsername={tweetUsername}
      />
      <TweetBodyContent
        user={user}
        timeAgo={timeAgo}
        message={message}
        photo={photo}
        tweetUserId={tweetUserId}
        tweetUsername={tweetUsername}
        handleShowModifyTweetModal={handleShowModifyTweetModal}
        handleShowDeleteTweetModal={handleShowDeleteTweetModal}
      />
    </Card.Body>
  );
}
