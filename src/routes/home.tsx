import { auth } from "../firebase";
import Header from "../components/header&footer/header";
import { Wrapper } from "../components/styles/auth-components";
import Footer from "../components/header&footer/footer";
import ScrollHome from "../components/scrolls/scrollHome";
import PostMessage from "../components/messages/post-message";

export default function Home() {
  console.log("user : " + auth.currentUser);
  console.log("emailVerified : " + auth.currentUser?.emailVerified);

  return (
    <div className="h-100">
      <Header />
      <div className="wrap">
        <Wrapper>
          <div className="mb-2">
            <h1 className="fs-2">Post Messages</h1>
          </div>
          <PostMessage />
          <ScrollHome />
        </Wrapper>
        <Footer />
      </div>
    </div>
  );
}
