import { useState } from "react";
import ScrollHome from "../components/scrolls/scrollHome";
import CreateTweet from "../components/tweets/create/create-tweet";
import TweetList from "../components/tweets/query/list/tweet-list";
import { Container } from "react-bootstrap";
import SideBar from "../components/header&footer/sidebar/side-bar";

export default function Home() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const handleShowCreateModal = () => setShowCreateModal(true);
  const handleCloseCreateModal = () => setShowCreateModal(false);

  return (
    <Container fluid className="h-100">
      <SideBar handleShowCreateModal={handleShowCreateModal} />
      <div className="h-100 m-auto" style={{ maxWidth: "500px" }}>
        <CreateTweet
          showCreateModal={showCreateModal}
          handleCloseCreateModal={handleCloseCreateModal}
        />
        <TweetList />
        <ScrollHome />
      </div>
    </Container>
  );
}
