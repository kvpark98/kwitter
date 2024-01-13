import { auth } from "../firebase";
import Header from "../components/header&footer/header";
import { Wrapper } from "../components/styles/auth-components";
import Footer from "../components/header&footer/footer";
import ScrollHome from "../components/scrolls/scrollHome";

export default function Home() {
  console.log("user : " + auth.currentUser);
  console.log("emailVerified : " + auth.currentUser?.emailVerified);

  return (
    <div className="h-100">
      <Header />
      <div className="wrap">
        <Wrapper>
          <h1>Home</h1>
          <ScrollHome />
        </Wrapper>
        <Footer />
      </div>
    </div>
  );
}
