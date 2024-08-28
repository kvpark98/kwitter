import Tweet, { ITweet } from "../detail/tweet";
import NoTweet from "../../no-tweet";
import TweetListHeader from "./tweet-list-header";
import ScrollHome from "../../../scrolls/scrollHome";
import { useRef } from "react";

export interface TweetListProps {
  tweets: ITweet[];
  back: () => void;
  sortCriteria: string;
  handleSortCriteria: (event: React.MouseEvent<HTMLButtonElement>) => void;
  sortOrder: boolean;
  handleSortOrder: () => void;
  resetCriteria: () => void;
  setIsTweetDeleted?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsReplyDeleted?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TweetList({
  tweets,
  back,
  sortCriteria,
  handleSortCriteria,
  sortOrder,
  handleSortOrder,
  resetCriteria,
  setIsTweetDeleted,
  setIsReplyDeleted,
}: TweetListProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={scrollContainerRef}
      className="overflow-y-auto bg-light h-100"
      style={{ width: "630px" }}
    >
      <TweetListHeader
        tweets={tweets}
        back={back}
        sortCriteria={sortCriteria}
        handleSortCriteria={handleSortCriteria}
        sortOrder={sortOrder}
        handleSortOrder={handleSortOrder}
        resetCriteria={resetCriteria}
      />
      {tweets.length !== 0 ? (
        <div>
          {tweets.map((tweet) => {
            return (
              <Tweet
                key={tweet.id}
                {...tweet}
                setIsTweetDeleted={setIsTweetDeleted}
                setIsReplyDeleted={setIsReplyDeleted}
              />
            );
          })}
        </div>
      ) : (
        <NoTweet />
      )}
      <ScrollHome scrollContainerRef={scrollContainerRef} />
    </div>
  );
}
