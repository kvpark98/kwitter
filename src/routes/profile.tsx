import { Wrapper } from "../components/auth-components";
import Footer from "../components/footer";
import Header from "../components/header";

export default function Profile() {
  return (
    <div className="h-100">
      <Header />
      <div className="wrap">
        <Wrapper>
          <h1>Profile</h1>
        </Wrapper>
        <Footer />
      </div>
    </div>
  );
}
