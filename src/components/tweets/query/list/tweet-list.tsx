import Tweet, { ITweet } from "../detail/tweet";
import NoTweet from "../../no-tweet";
import ScrollHome from "../../../scrolls/scrollHome";
import { useRef } from "react";
import TweetListSort from "./tweet-list-sort";
import Header from "../../header";

export interface TweetListProps {
  tweets: ITweet[];
  sortCriteria: string;
  handleSortCriteria: (event: React.MouseEvent<HTMLButtonElement>) => void;
  sortOrder: boolean;
  handleSortOrder: () => void;
  resetCriteria: () => void;
  setIsTweetDeleted?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsReplyDeleted?: React.Dispatch<React.SetStateAction<boolean>>;
  handleShowCreateTweetModal?: () => void;
}

export default function TweetList({
  tweets,
  sortCriteria,
  handleSortCriteria,
  sortOrder,
  handleSortOrder,
  resetCriteria,
  setIsTweetDeleted,
  setIsReplyDeleted,
  handleShowCreateTweetModal,
}: TweetListProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={scrollContainerRef}
      className="overflow-y-auto bg-light h-100"
      style={{ width: "700px" }}
    >
      <Header
        tweets={tweets}
        handleShowCreateTweetModal={handleShowCreateTweetModal}
      />
      {tweets.length !== 0 ? (
        <>
          <TweetListSort
            sortCriteria={sortCriteria}
            handleSortCriteria={handleSortCriteria}
            sortOrder={sortOrder}
            handleSortOrder={handleSortOrder}
            resetCriteria={resetCriteria}
          />
          <div>
            {tweets.map((tweet) => {
              return (
                <Tweet
                  key={tweet.id}
                  setIsTweetDeleted={setIsTweetDeleted}
                  setIsReplyDeleted={setIsReplyDeleted}
                  {...tweet}
                />
              );
            })}
          </div>
        </>
      ) : (
        <NoTweet />
      )}
      <ScrollHome scrollContainerRef={scrollContainerRef} />
    </div>
  );
}
