import Header from "../components/header&footer/header";
import { Wrapper } from "../components/styles/auth-components";
import Footer from "../components/header&footer/footer";
import ScrollHome from "../components/scrolls/scrollHome";
import CreateTweet from "../components/tweets/create/create-tweet";
import TweetList from "../components/tweets/query/list/tweet-list";

export default function Home() {
  return (
    <div className="h-100">
      <Header />
      <div className="wrap">
        <Wrapper>
          <CreateTweet />
          <TweetList />
          <ScrollHome />
        </Wrapper>
        <Footer />
      </div>
    </div>
  );
}
