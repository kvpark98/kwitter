import {
  Unsubscribe,
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import Message from "./message";

// 메시지 객체의 타입 정의
export interface IMessage {
  id: string;
  timeAgo: string | undefined;
  createdAt: string;
  message: string;
  photo?: string;
  userId: string;
  username: string;
}

export default function TimeLine() {
  const [messages, setMessages] = useState<IMessage[]>([]);

  // 메시지 생성일을 시간 경과 표시 형식으로 변환하는 함수
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

  // 컴포넌트가 마운트될 때 메시지 가져오기
  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;

    const fetchMessages = async () => {
      // Firestore 쿼리 생성
      const messageQuery = query(
        collection(db, "messages"),
        orderBy("createdAt", "desc"),
        limit(25)
      );

      // 실시간 업데이트를 수신하기 위해 onSnapshot 사용
      unsubscribe = await onSnapshot(messageQuery, (snapshot) => {
        // 스냅샷을 메시지 배열로 변환
        const messages = snapshot.docs.map((doc) => {
          // Firestore 문서에서 필요한 데이터 추출
          const { createdAt, message, photo, userId, username } = doc.data();

          // 새로운 메시지 객체 생성
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
        setMessages(messages);
      });
    };

    fetchMessages();

    // 컴포넌트가 언마운트되면 Firestore 구독 해제
    return () => {
      unsubscribe && unsubscribe();
    };
  }, []);

  return (
    messages.length !== 0 && (
      <div className="w-100 overflow-y-scroll" style={{ maxHeight: "600px" }}>
        {messages.map((message) => {
          return <Message key={message.id} {...message} />;
        })}
      </div>
    )
  );
}
