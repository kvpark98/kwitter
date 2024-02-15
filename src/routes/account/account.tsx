import { Container } from "react-bootstrap";
import Footer from "../../components/header&footer/footer/footer";
import Header from "../../components/header&footer/header/header";
import ScrollProfile from "../../components/scrolls/scrollProfile";
import AccountTitle from "../../components/account/account-title";
import AccountContent from "../../components/account/account-content";

export default function Account() {
  return (
    <div className="h-100">
      <Header />
      <div className="wrap">
        <Container className="mt-5 h-100">
          <AccountTitle />
          <hr />
          <AccountContent />
          <ScrollProfile />
        </Container>
        <Footer />
      </div>
    </div>
  );
}
