import { Container } from "react-bootstrap";
import ScrollProfile from "../../components/scrolls/scrollProfile";
import AccountTitle from "../../components/account/account-title";
import AccountContent from "../../components/account/account-content";
import SideBar from "../../components/header&footer/side-bar/side-bar";

export default function Account() {
  return (
    <Container fluid className="h-100">
      <SideBar />
      <div className="h-100 m-auto" style={{ maxWidth: "800px" }}>
        <AccountTitle />
        <hr />
        <AccountContent />
        <ScrollProfile />
      </div>
    </Container>
  );
}
