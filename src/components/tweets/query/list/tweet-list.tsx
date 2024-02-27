import {
  Unsubscribe,
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../../firebase";
import Tweet, { ITweet } from "../detail/tweet";

export default function TweetList() {
  const [tweets, setTweets] = useState<ITweet[]>([]);

  // tweet 생성일을 시간 경과 표시 형식으로 변환하는 함수
  const formatTimeAgo = (createdAt: string) => {
    const now = new Date();
    const createdDate = new Date(createdAt);

    const diffInMilliseconds = now.getTime() - createdDate.getTime();
    const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInDays > 0) {
      if (diffInDays >= 2) {
        return `${diffInDays} days ago`;
      } else {
        return `${diffInDays} day ago`;
      }
    } else if (diffInHours > 0) {
      if (diffInHours >= 2) {
        return `${diffInHours} hours ago`;
      } else {
        return `${diffInHours} hour ago`;
      }
    } else if (diffInMinutes > 0) {
      if (diffInMinutes >= 2) {
        return `${diffInMinutes} minutes ago`;
      } else {
        return `${diffInMinutes} minute ago`;
      }
    } else if (diffInSeconds > 0) {
      if (diffInSeconds >= 2) {
        return `${diffInSeconds} seconds ago`;
      } else {
        return `${diffInSeconds} second ago`;
      }
    } else if (diffInMilliseconds > 0) {
      if (diffInMilliseconds >= 2) {
        return `${diffInMilliseconds} milliseconds ago`;
      } else {
        return `${diffInMilliseconds} millisecond ago`;
      }
    }
  };

  // 컴포넌트가 마운트될 때 tweet 가져오기
  useEffect(() => {
    // Firestore 구독을 위한 변수
    let unsubscribe: Unsubscribe | null = null;

    // 사용자의 tweet을 가져오는 함수
    const fetchTweets = async () => {
      // Firestore 쿼리 생성
      const tweetQuery = query(
        collection(db, "tweets"),
        orderBy("createdAt", "desc"),
        limit(25)
      );

      // 실시간 업데이트를 수신하기 위해 onSnapshot 이벤트 리스너 등록
      unsubscribe = await onSnapshot(tweetQuery, (snapshot) => {
        // 스냅샷을 tweet 배열로 변환
        const tweets = snapshot.docs.map((doc) => {
          // Firestore 문서에서 필요한 데이터 추출
          const { createdAt, message, photo, userId, username } = doc.data();

          // 새로운 tweet 객체 생성
          return {
            id: doc.id,
            timeAgo: formatTimeAgo(createdAt),
            createdAt,
            message,
            photo,
            userId,
            username,
          };
        });
        // 상태 업데이트
        setTweets(tweets);
      });
    };

    // fetchTweets 함수 호출
    fetchTweets();

    // 컴포넌트가 언마운트되면 Firestore 구독 해제
    return () => {
      unsubscribe && unsubscribe(); // 구독이 존재하면 해제
    };
  }, []);

  return (
    tweets.length !== 0 && (
      <div>
        {tweets.map((tweet) => {
          return <Tweet key={tweet.id} {...tweet} />;
        })}
      </div>
    )
  );
}
