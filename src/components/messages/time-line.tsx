import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import Message from "./message";

// 메시지 객체의 타입 정의
export interface IMessage {
  id: string;
  createdAt: string;
  message: string;
  photo?: string;
  userId: string;
  username: string;
}

export default function TimeLine() {
  const [messages, setMessages] = useState<IMessage[]>([]);

  // createdAt을 포맷하는 함수
  const formatCreatedAt = (createdAt: number): string => {
    const date = new Date(createdAt);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  // 메시지를 가져오고 상태 업데이트
  const fetchMessages = async () => {
    // Firestore 쿼리 생성
    const messageQuery = query(
      collection(db, "messages"),
      orderBy("createdAt", "desc")
    );

    // 쿼리 실행 및 스냅샷 가져오기
    const snapShot = await getDocs(messageQuery);

    // 스냅샷을 메시지 배열로 변환
    const messages = snapShot.docs.map((doc) => {
      // Firestore 문서에서 필요한 데이터 추출
      const { createdAt, message, photo, userId, username } = doc.data();

      // 포맷된 createdAt을 포함하여 새로운 메시지 객체 생성
      return {
        createdAt: formatCreatedAt(createdAt),
        message,
        photo,
        userId,
        username,
        id: doc.id,
      };
    });

    // 상태 업데이트
    setMessages(messages);
    // console.log("messages", messages);
  };

  // 컴포넌트가 마운트될 때 메시지 가져오기
  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="overflow-y-scroll" style={{ maxHeight: "500px" }}>
      {messages.map((message) => {
        return <Message key={message.id} {...message} />;
      })}
    </div>
  );
}
