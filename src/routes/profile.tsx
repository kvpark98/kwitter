import { auth, db, storage } from "../firebase";
import { useEffect, useRef, useState } from "react";
import {
  StorageError,
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
import SideBar from "../components/header&footer/side-bar/side-bar";
import { Container } from "react-bootstrap";

export default function Profile() {
  const user = auth.currentUser;

  const nameInputRef = useRef<HTMLInputElement>(null);

  const avatarInputRef = useRef<HTMLInputElement>(null);

  const backgroundInputRef = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState(user?.displayName);

  const [isName, setIsName] = useState(true);

  const [avatar, setAvatar] = useState(user?.photoURL);

  const [background, setBackground] = useState("");

  const defaultAvatarURL = "/person-circle.svg";
  const defaultBackgroundURL = "/default-background.png";

  const getBackground = async () => {
    try {
      const locationRef = ref(storage, `backgrounds/${user?.uid}`);
      const result = await getDownloadURL(locationRef);
      setBackground(result);
    } catch (error) {
      setBackground("/default-background.png");
    }
  };

  getBackground();

  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const [backgroundFile, setBackgroundFile] = useState<File | null>(null);

  const [avatarImagePreviewUrl, setAvatarImagePreviewUrl] =
    useState<string>("");

  const [backgroundImagePreviewUrl, setBackgroundImagePreviewUrl] =
    useState<string>("");

  const [tweets, setTweets] = useState<ITweet[]>([]);

  const [isProfileModified, setIsProfileModified] = useState(false);

  const [error, setError] = useState("");

  const [nameErrorMessage, setNameErrorMessage] = useState("");

  const [showModifyModal, setShowModifyModal] = useState(false);
  const handleShowModifyModal = () => setShowModifyModal(true);
  const handleCloseModifyModal = () => {
    setShowModifyModal(false);
    resetName();
    resetAvatar();
    resetBackground();
  };

  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    const regName = /^[가-힣a-zA-Z]{2,20}$/;

    setName(value.replace(/\s/gi, ""));

    if (value !== "") {
      if (!regName.test(value)) {
        setNameErrorMessage(
          "Please enter at least 2 characters either in English or Korean."
        );
        setIsName(false);

        nameInputRef.current?.classList.add("form-control-invalid");
      } else {
        setIsName(true);

        nameInputRef.current?.classList.remove("form-control-invalid");
      }
    } else {
      setNameErrorMessage("");
      setIsName(false);

      nameInputRef.current?.classList.remove("form-control-invalid");
    }
  };

  const handleAvatarImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsProfileModified(false);

    const { files } = event.currentTarget; // 이벤트에서 파일 목록을 가져오기

    if (files && files.length === 1) {
      // 파일이 존재하고 하나만 선택된 경우
      const selectedFile = files[0]; // 첫 번째 선택된 파일

      if (selectedFile.size <= 1024 * 1024) {
        // 파일 크기가 1MB 이하인 경우
        const reader = new FileReader(); // FileReader 객체를 생성

        reader.onload = () => {
          // 파일을 읽은 후
          const result = reader.result as string; // 결과를 문자열로 변환
          setAvatarImagePreviewUrl(result); // 이미지 미리보기 URL을 설정
        };
        reader.readAsDataURL(selectedFile); // 파일을 Data URL로 읽기

        setAvatarFile(selectedFile); // 선택된 파일을 상태로 설정

        setError(""); // 에러 메시지 초기화
      } else {
        // 파일 크기가 1MB를 초과하는 경우
        setAvatarFile(null); // 선택된 파일 상태를 null로 설정

        setAvatarImagePreviewUrl(""); // 이미지 미리보기 URL을 초기화

        if (avatarInputRef.current) {
          // 파일 입력(input) 참조가 있는 경우
          avatarInputRef.current.value = ""; // 파일 값을 초기화
        }

        setError("size-exhausted"); // 에러 상태를 'size-exhausted'로 설정

        setTimeout(() => {
          // 5초 후
          setError(""); // 에러 메시지 초기화
        }, 5000);
      }
    }
  };

  const handleBackgroundImage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsProfileModified(false);

    const { files } = event.currentTarget; // 이벤트에서 파일 목록을 가져오기

    if (files && files.length === 1) {
      // 파일이 존재하고 하나만 선택된 경우
      const selectedFile = files[0]; // 첫 번째 선택된 파일

      if (selectedFile.size <= 1024 * 1024) {
        // 파일 크기가 1MB 이하인 경우
        const reader = new FileReader(); // FileReader 객체를 생성

        reader.onload = () => {
          // 파일을 읽은 후
          const result = reader.result as string; // 결과를 문자열로 변환
          setBackgroundImagePreviewUrl(result); // 이미지 미리보기 URL을 설정
        };
        reader.readAsDataURL(selectedFile); // 파일을 Data URL로 읽기

        setBackgroundFile(selectedFile); // 선택된 파일을 상태로 설정

        setError(""); // 에러 메시지 초기화
      } else {
        // 파일 크기가 1MB를 초과하는 경우
        setBackgroundFile(null); // 선택된 파일 상태를 null로 설정

        setBackgroundImagePreviewUrl(""); // 이미지 미리보기 URL을 초기화

        if (backgroundInputRef.current) {
          // 파일 입력(input) 참조가 있는 경우
          backgroundInputRef.current.value = ""; // 파일 값을 초기화
        }

        setError("size-exhausted"); // 에러 상태를 'size-exhausted'로 설정

        setTimeout(() => {
          // 5초 후
          setError(""); // 에러 메시지 초기화
        }, 5000);
      }
    }
  };

  const noSpace = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === "Space") {
      event.preventDefault();
    }
  };

  const resetName = () => {
    setName(user?.displayName);

    setIsName(true);

    setNameErrorMessage("");

    nameInputRef.current?.classList.remove("form-control-invalid");
  };

  const resetAvatar = () => {
    setAvatarFile(null);
    setAvatarImagePreviewUrl("");
    if (avatarInputRef.current) {
      avatarInputRef.current.value = "";
    }
    setError("");
  };

  const resetBackground = () => {
    setBackgroundFile(null);
    setBackgroundImagePreviewUrl("");
    if (backgroundInputRef.current) {
      backgroundInputRef.current.value = "";
    }
    setError("");
  };

  const modifyProfile = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isLoading || !isName) {
      return;
    }

    setError("");

    try {
      setIsLoading(true);

      if (avatarFile) {
        // 새로운 파일의 크기가 1MB 이하인지 확인
        if (avatarFile.size <= 1024 * 1024) {
          // Firebase Storage에 업로드할 위치 참조 생성
          const locationRef = ref(storage, `avatars/${user?.uid}`);

          // 파일 업로드 및 결과 받아오기
          const result = await uploadBytes(locationRef, avatarFile);

          // 업로드된 파일의 다운로드 URL 가져오기
          const avatarUrl = await getDownloadURL(result.ref);

          // Avatar URL 설정
          setAvatar(avatarUrl);

          // 사용자 프로필 업데이트
          await updateProfile(user!, {
            photoURL: avatarUrl,
          });

          // 파일 인풋 리셋
          if (avatarInputRef.current) {
            avatarInputRef.current.value = "";
          }
        }
      }

      if (backgroundFile) {
        // 새로운 파일의 크기가 1MB 이하인지 확인
        if (backgroundFile.size <= 1024 * 1024) {
          // Firebase Storage에 업로드할 위치 참조 생성
          const locationRef = ref(storage, `backgrounds/${user?.uid}`);

          // 파일 업로드 및 결과 받아오기
          const result = await uploadBytes(locationRef, backgroundFile);

          // 업로드된 파일의 다운로드 URL 가져오기
          const backgroundUrl = await getDownloadURL(result.ref);

          // Background URL 설정
          setBackground(backgroundUrl);

          // 파일 인풋 리셋
          if (backgroundInputRef.current) {
            backgroundInputRef.current.value = "";
          }
        }
      }

      await updateProfile(auth.currentUser!, {
        displayName: name,
      });

      setIsProfileModified(true);

      resetName();
      resetAvatar();
      resetBackground();

      setTimeout(() => {
        setIsProfileModified(false);
      }, 5000);
    } catch (error) {
      setIsProfileModified(false);

      resetName();
      resetAvatar();
      resetBackground();

      // 파일 인풋 리셋
      if (avatarInputRef.current) {
        avatarInputRef.current.value = "";
      }

      // 파일 인풋 리셋
      if (backgroundInputRef.current) {
        backgroundInputRef.current.value = "";
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

      setTimeout(() => {
        setError("");
      }, 5000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAvatar = async () => {
    // Avatar가 없으면 함수 종료
    if (!avatar) {
      return;
    }

    try {
      // 파일 인풋 리셋
      if (avatarInputRef.current) {
        avatarInputRef.current.value = "";
      }

      const defaultAvatarResponse = await fetch(defaultAvatarURL);

      const defaultAvatarBlob = await defaultAvatarResponse.blob();

      const avatarLocationRef = ref(storage, `avatars/${user?.uid}`);

      const avatarResult = await uploadBytes(
        avatarLocationRef,
        defaultAvatarBlob
      );

      const avatarUrl = await getDownloadURL(avatarResult.ref);

      setAvatar(avatarUrl);

      // 사용자 프로필 업데이트
      await updateProfile(user!, {
        photoURL: avatarUrl,
      });
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

  const handleDeleteBackground = async () => {
    // Background가 없으면 함수 종료
    if (!background) {
      return;
    }

    try {
      // 파일 인풋 리셋
      if (backgroundInputRef.current) {
        backgroundInputRef.current.value = "";
      }

      const defaultBackgroundResponse = await fetch(defaultBackgroundURL);

      const defaultBackgroundBlob = await defaultBackgroundResponse.blob();

      const backgroundLocationRef = ref(storage, `backgrounds/${user?.uid}`);

      const backgroundResult = await uploadBytes(
        backgroundLocationRef,
        defaultBackgroundBlob
      );

      const backgroundUrl = await getDownloadURL(backgroundResult.ref);

      setBackground(backgroundUrl);
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
        limit(30)
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
    <Container fluid className="h-100">
      <SideBar />
      <div className="h-100 m-auto" style={{ maxWidth: "600px" }}>
        <ProfileContent
          user={user}
          nameInputRef={nameInputRef}
          avatarInputRef={avatarInputRef}
          backgroundInputRef={backgroundInputRef}
          isLoading={isLoading}
          error={error}
          name={name}
          handleName={handleName}
          isName={isName}
          nameErrorMessage={nameErrorMessage}
          avatar={avatar}
          avatarImagePreviewUrl={avatarImagePreviewUrl}
          handleAvatarImage={handleAvatarImage}
          background={background}
          backgroundImagePreviewUrl={backgroundImagePreviewUrl}
          handleBackgroundImage={handleBackgroundImage}
          noSpace={noSpace}
          resetName={resetName}
          resetAvatar={resetAvatar}
          resetBackground={resetBackground}
          modifyProfile={modifyProfile}
          isProfileModified={isProfileModified}
          showModifyModal={showModifyModal}
          handleShowModifyModal={handleShowModifyModal}
          handleCloseModifyModal={handleCloseModifyModal}
          handleDeleteAvatar={handleDeleteAvatar}
          handleDeleteBackground={handleDeleteBackground}
          tweets={tweets}
        />
      </div>
    </Container>
  );
}
