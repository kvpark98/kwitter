import { Container, Navbar } from "react-bootstrap";
import { IReply } from "./reply/query/detail/reply";
import { User } from "firebase/auth";
import TweetReplyListButton from "./tweet-reply-list-button";

export interface TweetFooterProps {
  user: User | null;
  tweetUserId: string;
  replys: IReply[];
  handleShowReplyListModal: () => void;
}

export default function TweetFooter({
  user,
  tweetUserId,
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
          <div className="d-flex">
            <TweetReplyListButton
              replys={replys}
              handleShowReplyListModal={handleShowReplyListModal}
            />
          </div>
        </div>
      </Container>
    </Navbar>
  );
}
