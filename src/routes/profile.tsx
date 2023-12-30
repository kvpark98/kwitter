import { Wrapper } from "../components/styles/auth-components";
import Footer from "../components/header&footer/footer";
import Header from "../components/header&footer/header";
import ScrollProfile from "../components/scrolls/scrollProfile";

export default function Profile() {
  return (
    <div className="h-100">
      <Header />
      <div className="wrap">
        <Wrapper>
          <h1>Profile</h1>
          <ScrollProfile />
        </Wrapper>
        <Footer />
      </div>
    </div>
  );
}
