import { Container, Navbar } from "react-bootstrap";
import { IReply } from "./reply/query/detail/reply";
import { User } from "firebase/auth";
import TweetReplyListButton from "./tweet-reply-list-button";
import TweetLikesButton from "./tweet-likes-button";

export interface TweetFooterProps {
  user: User | null;
  tweetUserId: string;
  likes: number;
  handleLikes: () => Promise<void>;
  replys: IReply[];
  handleShowReplyListModal: () => void;
}

export default function TweetFooter({
  user,
  tweetUserId,
  likes,
  handleLikes,
  replys,
  handleShowReplyListModal,
}: TweetFooterProps) {
  return (
    <Navbar
      {...(user?.uid === tweetUserId
        ? { className: "flex-fill bg-primary-subtle" }
        : { className: "flex-fill bg-body-light" })}
    >
      <Container className="d-flex">
        <div className="d-flex justify-content-between w-100">
          <TweetReplyListButton
            replys={replys}
            handleShowReplyListModal={handleShowReplyListModal}
          />
          <TweetLikesButton likes={likes} handleLikes={handleLikes} />
        </div>
      </Container>
    </Navbar>
  );
}
