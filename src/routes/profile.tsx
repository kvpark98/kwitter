import Footer from "../components/header&footer/footer/footer";
import Header from "../components/header&footer/header/header";
import { auth, db, storage } from "../firebase";
import { useEffect, useRef, useState } from "react";
import {
  StorageError,
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import {
  FirestoreError,
  Unsubscribe,
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import ProfileContent from "../components/profile/profile-content";
import { ITweet } from "../components/tweets/query/detail/tweet";

export default function Profile() {
  const user = auth.currentUser;

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [showModifyModal, setShowModifyModal] = useState(false);
  const handleShowModifyModal = () => setShowModifyModal(true);

  const [avatar, setAvatar] = useState(user?.photoURL);

  const [tweets, setTweets] = useState<ITweet[]>([]);

  const [error, setError] = useState("");

  const handleAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    // 파일 정보를 가져온다.
    const { files } = event.currentTarget;

    // 사용자가 없으면 함수 종료
    if (!user) {
      return;
    }

    // 에러 초기화
    setError("");

    try {
      // 파일이 존재하고 하나일 때
      if (files && files.length === 1) {
        const file = files[0];

        // 파일 크기가 1MB 이하인 경우
        if (file.size <= 1024 * 1024) {
          // Storage에 파일 업로드
          const locationRef = ref(storage, `avatars/${user?.uid}`);
          const result = await uploadBytes(locationRef, file);
          const avatarUrl = await getDownloadURL(result.ref);

          // Avatar URL 설정
          setAvatar(avatarUrl);

          // 사용자 프로필 업데이트
          await updateProfile(user!, {
            photoURL: avatarUrl,
          });

          // 파일 인풋 리셋
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
        } else {
          // 파일 크기 초과 에러
          throw new Error("size-exhausted");
        }
      }
    } catch (error) {
      // 파일 인풋 리셋
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      // 에러 종류에 따라 처리
      if (error instanceof FirebaseError) {
        setError(error.code);
        console.log("FirebaseError", error.code);
      } else if (error instanceof FirestoreError) {
        setError(error.code);
        console.log("FirestoreError", error.code);
      } else if (error instanceof StorageError) {
        setError(error.code);
        console.log("StorageError", error.code);
      } else {
        setError("size-exhausted");
        console.log(error);
      }

      // 5초 후 에러 초기화
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  const handleDeleteAvatar = async () => {
    // Avatar가 없으면 함수 종료
    if (!avatar) {
      return;
    }

    try {
      // Avatar 초기화
      setAvatar(null);

      // 파일 인풋 리셋
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      // 사용자 프로필 업데이트
      await updateProfile(user!, {
        photoURL: "",
      });

      // Storage에서 사진 삭제
      const photoRef = ref(storage, `avatars/${user?.uid}`);

      await deleteObject(photoRef);
    } catch (error) {
      // 에러 처리
      if (error instanceof FirebaseError) {
        setError(error.code);
        console.log("FirebaseError", error.code);
      } else if (error instanceof FirestoreError) {
        setError(error.code);
        console.log("FirestoreError", error.code);
      } else if (error instanceof StorageError) {
        setError(error.code);
        console.log("StorageError", error.code);
      } else {
        setError("size-exhausted");
        console.log(error);
      }

      // 5초 후 에러 초기화
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

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
    // Firestore 구독을 위한 변수 선언
    let unsubscribe: Unsubscribe | null = null;

    // 사용자의 트윗을 가져오는 함수 정의
    const fetchUserTweets = async () => {
      // Firestore 쿼리 생성
      const tweetQuery = query(
        collection(db, "tweets"),
        where("userId", "==", user?.uid),
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

    // fetchUserTweets 함수 호출
    fetchUserTweets();

    // 컴포넌트가 언마운트될 때 Firestore 구독 해제
    return () => {
      unsubscribe && unsubscribe(); // 구독이 존재하면 해제
    };
  }, []);

  return (
    <div className="h-100">
      <Header avatar={avatar} />
      <div className="wrap">
        <ProfileContent
          user={user}
          error={error}
          avatar={avatar}
          fileInputRef={fileInputRef}
          showModifyModal={showModifyModal}
          setShowModifyModal={setShowModifyModal}
          handleShowModifyModal={handleShowModifyModal}
          handleAvatar={handleAvatar}
          handleDeleteAvatar={handleDeleteAvatar}
          tweets={tweets}
        />
        <Footer />
      </div>
    </div>
  );
}
