import { useState } from "react";
import ScrollHome from "../components/scrolls/scrollHome";
import CreateTweet from "../components/tweets/create/create-tweet";
import TweetList from "../components/tweets/query/list/tweet-list";
import { Container } from "react-bootstrap";
import SideBar from "../components/header&footer/side-bar/side-bar";

export default function Home() {
  const [showCreateTweetModal, setShowCreateTweetModal] = useState(false);
  const handleShowCreateTweetModal = () => setShowCreateTweetModal(true);

  return (
    <Container fluid className="h-100">
      <SideBar handleShowCreateTweetModal={handleShowCreateTweetModal} />
      <div className="h-100 m-auto" style={{ maxWidth: "600px" }}>
        <CreateTweet
          showCreateTweetModal={showCreateTweetModal}
          setShowCreateTweetModal={setShowCreateTweetModal}
        />
        <TweetList />
        <ScrollHome />
      </div>
    </Container>
  );
}
