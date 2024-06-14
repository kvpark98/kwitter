import { useEffect, useRef, useState } from "react";
import { FirebaseError } from "firebase/app";
import {
  FirestoreError,
  Unsubscribe,
  addDoc,
  collection,
  deleteDoc,
  deleteField,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import {
  StorageError,
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { auth, db, storage } from "../../../../firebase";
import ModifyTweet from "../../modify/modify-tweet";
import TweetCard from "./tweet-card";
import ModifyCropPhotoModal from "../../modify/modify-crop-modal/modify-crop-photo-modal";
import { CroppedAreaPixels } from "../../../../routes/profile";
import ModifyTweetDiscardModal from "../../modify/modify-tweet-discard-modal/modify-tweet-discard-modal";
import ModifyTweetErrorModal from "../../../modals/error/modify-tweet-error-modal";
import ModifyTweetSuccessModal from "../../../modals/success/modify-tweet-success-modal";
import DeleteTweetWarningModal from "../../../modals/warning/delete-tweet-warning-modal";
import CreateReply from "./reply/create-reply";

export interface ITweet {
  id: string;
  timeAgo?: string | undefined;
  createdAt: string;
  message: string;
  photo?: string;
  userId: string;
  username: string;
}

export interface IReply {
  id: string;
  timeAgo?: string | undefined;
  createdAt: string;
  reply: string;
  replyUserId: string;
  replyUsername: string;
}

export default function Tweet({
  id,
  timeAgo,
  message,
  photo,
  userId,
  username,
}: ITweet) {
  const user = auth.currentUser;

  const defaultAvatarURL = "/person-circle.svg";

  const [avatar, setAvatar] = useState(defaultAvatarURL);

  const getAvatar = async () => {
    const avatarQuery = query(
      collection(db, "avatars"),
      where("userId", "==", userId)
    );

    const snapshot = await getDocs(avatarQuery);
    snapshot.forEach(async (doc) => {
      const data = doc.data();
      setAvatar(data.avatar);
    });
  };

  getAvatar();

  const [isLoading, setIsLoading] = useState(false);

  const newFileInputRef = useRef<HTMLInputElement>(null);

  const [photoDeleteButtonClicked, setPhotoDeleteButtonClicked] =
    useState(false);

  const [newMessage, setNewMessage] = useState(message);

  const [newFile, setNewFile] = useState<File | null>(null);

  const [isNewMessage, setIsNewMessage] = useState(true);

  const [newImagePreviewUrl, setNewImagePreviewUrl] = useState<string>("");

  const [croppedNewImagePreviewUrl, setCroppedNewImagePreviewUrl] =
    useState<string>("");

  const [replys, setReplys] = useState<IReply[]>([]);

  const [reply, setReply] = useState("");

  const [isReply, setIsReply] = useState(false);

  const [error, setError] = useState("");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleShowDeleteModal = () => setShowDeleteModal(true);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);

  const [showModifyTweetModal, setShowModifyTweetModal] = useState(false);
  const handleShowModifyTweetModal = () => {
    setShowModifyTweetModal(true);
  };
  const handleCloseModifyTweetModal = () => {
    if (
      newImagePreviewUrl ||
      photoDeleteButtonClicked ||
      newMessage !== message
    ) {
      handleShowModifyTweetDiscardModal();
    } else {
      setShowModifyTweetModal(false);
      resetMessageButton();
      resetPhotoButton();
      handleModifyRatio1x1();
      setZoom(1);
      setPhotoDeleteButtonClicked(false);
      setShowModifyTweetDiscardModal(false);
    }
  };

  const [showReplyModal, setShowReplyModal] = useState(false);
  const handleShowReplyModal = () => setShowReplyModal(true);
  const handleCloseReplyModal = () => setShowReplyModal(false);

  const handleCloseModifyTweetDiscardBothModal = () => {
    setShowModifyTweetModal(false);
    resetMessageButton();
    resetPhotoButton();
    handleModifyRatio1x1();
    setZoom(1);
    setPhotoDeleteButtonClicked(false);
    setShowModifyTweetDiscardModal(false);
  };

  const [showModifyTweetDiscardModal, setShowModifyTweetDiscardModal] =
    useState(false);
  const handleShowModifyTweetDiscardModal = () => {
    setShowModifyTweetDiscardModal(true);
  };
  const handleCloseModifyTweetDiscardModal = () => {
    setShowModifyTweetDiscardModal(false);
  };

  const [showModifyTweetSuccessModal, setShowModifyTweetSuccessModal] =
    useState(false);
  const handleShowModifyTweetSuccessModal = () => {
    handleCloseModifyTweetDiscardBothModal();
    setShowModifyTweetSuccessModal(true);
  };
  const handleCloseModifyTweetSuccessModal = () => {
    setShowModifyTweetSuccessModal(false);
  };

  const [showModifyTweetErrorsModal, setShowModifyTweetErrorsModal] =
    useState(false);
  const handleShowModifyTweetErrorsModal = () => {
    setShowModifyTweetModal(false);
    setShowModifyTweetErrorsModal(true);
  };
  const handleCloseModifyTweetErrorsModal = () => {
    setShowModifyTweetErrorsModal(false);
    setError("");
    handleShowModifyTweetModal();
  };

  const [showDeleteErrorsModal, setShowDeleteErrorsModal] = useState(false);
  const handleShowDeleteErrorsModal = () => {
    handleCloseDeleteModal();
    setShowDeleteErrorsModal(true);
  };
  const handleCloseDeleteErrorsModal = () => setShowDeleteErrorsModal(false);

  const [crop, setCrop] = useState({ x: 0, y: 0 }); // 이미지 자르는 위치

  const [zoom, setZoom] = useState(1); // 이미지 확대/축소

  const [croppedAreaPixels, setCroppedAreaPixels] =
    useState<CroppedAreaPixels | null>(null); // 잘린 이미지 정보

  const [showModifyPhotoCropModal, setShowModifyPhotoCropModal] =
    useState(false);
  const handleShowModifyPhotoCropModal = () => {
    setShowModifyTweetModal(false);
    setShowModifyPhotoCropModal(true);
  };
  const handleCloseModifyPhotoCropModal = () => {
    setShowModifyPhotoCropModal(false);
    setShowModifyTweetModal(true);
    handleModifyRatio1x1();
    setZoom(1);
  };

  const [modifyRatio1x1, setModifyRatio1x1] = useState(true);
  const [modifyRatio4x3, setModifyRatio4x3] = useState(false);
  const [modifyRatio16x9, setModifyRatio16x9] = useState(false);

  const handleModifyRatio1x1 = () => {
    setModifyRatio1x1(true);
    setModifyRatio4x3(false);
    setModifyRatio16x9(false);
  };

  const handleModifyRatio4x3 = () => {
    setModifyRatio1x1(false);
    setModifyRatio4x3(true);
    setModifyRatio16x9(false);
  };

  const handleModifyRatio16x9 = () => {
    setModifyRatio1x1(false);
    setModifyRatio4x3(false);
    setModifyRatio16x9(true);
  };

  // 이미지 자르기가 완료되었을 때 호출되는 콜백 함수
  const onCropComplete = (
    croppedArea: CroppedAreaPixels, // 자른 영역의 정보
    croppedAreaPixels: CroppedAreaPixels // 자른 영역의 픽셀 정보
  ) => {
    // 자른 영역의 픽셀 정보를 상태로 설정
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleSaveCroppedPhoto = () => {
    // 잘린 이미지 정보와 파일이 존재하는지 확인
    if (!croppedAreaPixels || !newFile) return;

    // Canvas 엘리먼트 생성 및 그래픽 컨텍스트 가져오기
    const canvas = document.createElement("canvas"); // canvas = 도화지
    const ctx = canvas.getContext("2d"); // Context = 화가
    if (!ctx) return;

    // 이미지 객체 생성 및 소스 설정
    const image = new Image(); // 새 이미지 객체를 생성
    image.src = newImagePreviewUrl; // imagePreviewUrl를 새 이미지 객체에 복사하여 붙여넣기

    // 이미지 로드 (복붙) 완료 시 실행될 콜백 함수 정의
    image.onload = () => {
      // Canvas 크기 설정 (잘린 이미지와 같은 크기로 설정해야 원본 이미지와 동일한 크기로 표시됨)
      canvas.width = croppedAreaPixels.width;
      canvas.height = croppedAreaPixels.height;

      // 이미지를 Canvas에 그리기
      ctx.drawImage(
        image, // 그릴 이미지
        croppedAreaPixels.x, // 이미지에서 잘라내어 사용할 부분의 시작 x 좌표
        croppedAreaPixels.y, // 이미지에서 잘라내어 사용할 부분의 시작 y 좌표
        croppedAreaPixels.width, // 이미지에서 잘라내어 사용할 부분의 너비
        croppedAreaPixels.height, // 이미지에서 잘라내어 사용할 부분의 높이
        0, // Canvas에 그릴 영역의 시작 x 좌표 (고정)
        0, // Canvas에 그릴 영역의 시작 y 좌표 (고정)
        croppedAreaPixels.width, // Canvas에 그릴 영역의 너비 (잘린 이미지와 같은 크기)
        croppedAreaPixels.height // Canvas에 그릴 영역의 높이 (잘린 이미지와 같은 크기)
      );

      // Canvas에 그린 이미지를 데이터 URL로 변환
      const croppedImageDataURL = canvas.toDataURL("image/jpeg"); // 이미지 포맷(jpeg 형식)을 설정하는 것! (동일한 이미지에 대해 자르는 부분이 달라도 이미지의 내용이 변하지 않는다면 데이터 URL은 동일하게 유지)

      setCroppedNewImagePreviewUrl(croppedImageDataURL); // 잘린 이미지 (복사본) 미리 보기 가능

      // 데이터 URL을 Blob 객체로 변환
      const byteCharacters = atob(croppedImageDataURL.split(",")[1]);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "image/jpeg" });

      // Blob 객체를 File 객체로 변환 (Blob은 File 객체에 포함되는 개념)
      const croppedFile = new File([blob], "cropped-avatar.jpeg", {
        type: "image/jpeg",
      });

      // 잘린 이미지 파일 업데이트
      setNewFile(croppedFile);

      handleModifyRatio1x1();
      setZoom(1);

      setShowModifyPhotoCropModal(false);
      setShowModifyTweetModal(true);
    };
  };

  const handleNewMessage = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.currentTarget.value;

    setNewMessage(value);

    if (value.trim() !== "") {
      setIsNewMessage(true);
    } else {
      setIsNewMessage(false);
    }
  };

  const handleReply = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.currentTarget.value;

    setReply(value);

    if (value.trim() !== "") {
      setIsReply(true);
    } else {
      setIsReply(false);
    }
  };

  const handleNewFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCroppedNewImagePreviewUrl("");

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
          setNewImagePreviewUrl(result); // 이미지 미리보기 URL을 설정
        };
        reader.readAsDataURL(selectedFile); // 파일을 Data URL로 읽기

        setNewFile(selectedFile); // 선택된 파일을 상태로 설정

        setError(""); // 에러 메시지 초기화
      } else {
        // 파일 크기가 1MB를 초과하는 경우
        setNewFile(null); // 선택된 파일 상태를 null로 설정

        setNewImagePreviewUrl(""); // 이미지 미리보기 URL을 초기화

        if (newFileInputRef.current) {
          // 파일 입력(input) 참조가 있는 경우
          newFileInputRef.current.value = ""; // 파일 값을 초기화
        }

        setError("size-exhausted"); // 에러 상태를 'size-exhausted'로 설정

        handleShowModifyTweetErrorsModal();
      }
    }
  };

  const resetMessageSubmit = () => {
    setNewMessage(message);
    setIsNewMessage(true);
  };

  const resetMessageButton = () => {
    resetMessageSubmit();
  };

  const resetReply = () => {
    setReply("");
    setIsReply(false);
  };

  const resetPhotoSubmit = () => {
    setNewFile(null);
    setNewImagePreviewUrl("");
    if (newFileInputRef.current) {
      newFileInputRef.current.value = "";
    }
  };

  const resetPhotoButton = () => {
    resetPhotoSubmit();
    setError("");
  };

  const handleDeletePhoto = async () => {
    setPhotoDeleteButtonClicked(true);
  };

  const modifyTweet = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isLoading || !isNewMessage || newMessage.length > 180 || !user) {
      return;
    }

    setError("");

    try {
      setIsLoading(true);

      // 새로운 파일이 있는 경우
      if (newFile) {
        // 이전 이미지가 있는 경우
        if (photo) {
          // Storage에서 이전 이미지 삭제
          const photoRef = ref(storage, `tweets/${user.uid}/${id}`);
          await deleteObject(photoRef);
        }
        // 새로운 파일의 크기가 1MB 이하인지 확인
        if (newFile.size <= 1024 * 1024) {
          // Firebase Storage에 업로드할 위치 참조 생성
          const locationRef = ref(storage, `tweets/${user.uid}/${id}`);

          // 파일 업로드 및 결과 받아오기
          const result = await uploadBytes(locationRef, newFile);

          // 업로드된 파일의 다운로드 URL 가져오기
          const url = await getDownloadURL(result.ref);

          // Firestore db의 문서를 업데이트하여 다운로드 URL을 추가
          await updateDoc(doc(db, "tweets", id), {
            photo: url,
            username: user.displayName,
          });
        } else {
          // 파일 크기가 1MB를 초과하면 에러 발생
          setNewFile(null);
          throw new Error("size-exhausted");
        }
      }

      if (photoDeleteButtonClicked && !newImagePreviewUrl) {
        if (newFileInputRef.current) {
          newFileInputRef.current.value = "";
        }

        const locationRef = ref(storage, `tweets/${user?.uid}/${id}`);
        await deleteObject(locationRef);

        await updateDoc(doc(db, "tweets", id), {
          createdAt: Date.now(),
          photo: deleteField(),
        });
      }

      // Firestore의 트윗 문서 업데이트
      await updateDoc(doc(db, "tweets", id), {
        createdAt: Date.now(),
        message: newMessage,
        username: user.displayName,
      });

      // 파일 상태를 초기화
      resetPhotoSubmit();

      setPhotoDeleteButtonClicked(false);

      handleShowModifyTweetSuccessModal();
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError(error.code);
      } else if (error instanceof FirestoreError) {
        setError(error.code);
      } else if (error instanceof StorageError) {
        setError(error.code);
      } else {
        setError("size-exhausted");
      }

      // 메시지 및 파일 상태를 초기화
      resetMessageSubmit();
      resetPhotoSubmit();

      setPhotoDeleteButtonClicked(false);

      handleShowModifyTweetErrorsModal();
    } finally {
      setIsLoading(false);
    }
  };

  // 트윗 삭제 함수
  const deleteTweet = async () => {
    if (isLoading || user?.uid !== userId) {
      return;
    }

    try {
      setIsLoading(true);

      // 이미지가 있는 경우 Storage에서 이미지 삭제
      if (photo) {
        const photoRef = ref(storage, `tweets/${user.uid}/${id}`);
        await deleteObject(photoRef);
      }

      // Firestore db에서 트윗 문서 삭제
      await deleteDoc(doc(db, "tweets", id));
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError(error.code);
      } else if (error instanceof FirestoreError) {
        setError(error.code);
      } else if (error instanceof StorageError) {
        setError(error.code);
      } else {
        setError("size-exhausted");
      }
      handleShowDeleteErrorsModal();
    } finally {
      setIsLoading(false);
    }
  };

  // reply 생성일을 시간 경과 표시 형식으로 변환하는 함수
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

  // 컴포넌트가 마운트될 때 reply 가져오기
  useEffect(() => {
    // Firestore 구독을 위한 변수
    let unsubscribe: Unsubscribe | null = null;

    const fetchReplys = async () => {
      // Firestore 쿼리 생성
      const replyQuery = query(
        collection(db, "replys"),
        where("tweetId", "==", id),
        orderBy("createdAt", "desc")
      );

      // 실시간 업데이트를 수신하기 위해 onSnapshot 이벤트 리스너 등록
      unsubscribe = await onSnapshot(replyQuery, (snapshot) => {
        // 스냅샷을 reply 배열로 변환
        const replys = snapshot.docs.map((doc) => {
          // Firestore 문서에서 필요한 데이터 추출
          const { createdAt, reply, replyUserId, replyUsername, tweetId } =
            doc.data();

          // 새로운 reply 객체 생성
          return {
            id: doc.id,
            timeAgo: formatTimeAgo(createdAt),
            createdAt,
            reply,
            replyUserId,
            replyUsername,
            tweetId,
          };
        });
        // 상태 업데이트
        setReplys(replys);
      });
    };

    // fetchReplys 함수 호출
    fetchReplys();

    // 컴포넌트가 언마운트되면 Firestore 구독 해제
    return () => {
      unsubscribe && unsubscribe(); // 구독이 존재하면 해제
    };
  }, []);

  const createReply = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isLoading || !isReply || reply.length > 180 || !user) {
      return;
    }

    setError("");

    try {
      setIsLoading(true);

      await addDoc(collection(db, "replys"), {
        tweetId: id,
        createdAt: Date.now(),
        reply: reply,
        replyUserId: user.uid,
        replyUsername: user.displayName,
      });

      resetReply();
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError(error.code);
      } else if (error instanceof FirestoreError) {
        setError(error.code);
      } else if (error instanceof StorageError) {
        setError(error.code);
      }

      resetReply();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-100">
      <TweetCard
        user={user}
        avatar={avatar}
        timeAgo={timeAgo}
        message={message}
        photo={photo}
        userId={userId}
        username={username}
        handleShowModifyTweetModal={handleShowModifyTweetModal}
        handleShowDeleteModal={handleShowDeleteModal}
        handleShowReplyModal={handleShowReplyModal}
      />
      {showModifyTweetModal && (
        <ModifyTweet
          isLoading={isLoading}
          photo={photo}
          newFileInputRef={newFileInputRef}
          newMessage={newMessage}
          handleNewMessage={handleNewMessage}
          isNewMessage={isNewMessage}
          handleNewFile={handleNewFile}
          newImagePreviewUrl={newImagePreviewUrl}
          croppedNewImagePreviewUrl={croppedNewImagePreviewUrl}
          resetMessageButton={resetMessageButton}
          resetPhotoButton={resetPhotoButton}
          photoDeleteButtonClicked={photoDeleteButtonClicked}
          handleDeletePhoto={handleDeletePhoto}
          modifyTweet={modifyTweet}
          showModifyTweetModal={showModifyTweetModal}
          handleCloseModifyTweetModal={handleCloseModifyTweetModal}
          handleShowModifyPhotoCropModal={handleShowModifyPhotoCropModal}
        />
      )}
      <ModifyCropPhotoModal
        showModifyPhotoCropModal={showModifyPhotoCropModal}
        handleCloseModifyPhotoCropModal={handleCloseModifyPhotoCropModal}
        newImagePreviewUrl={newImagePreviewUrl}
        crop={crop}
        setCrop={setCrop}
        zoom={zoom}
        setZoom={setZoom}
        onCropComplete={onCropComplete}
        handleSaveCroppedPhoto={handleSaveCroppedPhoto}
        modifyRatio1x1={modifyRatio1x1}
        modifyRatio4x3={modifyRatio4x3}
        modifyRatio16x9={modifyRatio16x9}
        handleModifyRatio1x1={handleModifyRatio1x1}
        handleModifyRatio4x3={handleModifyRatio4x3}
        handleModifyRatio16x9={handleModifyRatio16x9}
      />
      <DeleteTweetWarningModal
        isLoading={isLoading}
        error={error}
        showDeleteModal={showDeleteModal}
        handleCloseDeleteModal={handleCloseDeleteModal}
        deleteTweet={deleteTweet}
        showDeleteErrorsModal={showDeleteErrorsModal}
        handleCloseDeleteErrorsModal={handleCloseDeleteErrorsModal}
      />
      <ModifyTweetDiscardModal
        showModifyTweetDiscardModal={showModifyTweetDiscardModal}
        handleCloseModifyTweetDiscardModal={handleCloseModifyTweetDiscardModal}
        handleCloseModifyTweetDiscardBothModal={
          handleCloseModifyTweetDiscardBothModal
        }
      />
      <ModifyTweetSuccessModal
        showModifyTweetSuccessModal={showModifyTweetSuccessModal}
        handleCloseModifyTweetSuccessModal={handleCloseModifyTweetSuccessModal}
      />
      <ModifyTweetErrorModal
        error={error}
        showModifyTweetErrorsModal={showModifyTweetErrorsModal}
        handleCloseModifyTweetErrorsModal={handleCloseModifyTweetErrorsModal}
      />
      <CreateReply
        showReplyModal={showReplyModal}
        handleCloseReplyModal={handleCloseReplyModal}
        isLoading={isLoading}
        reply={reply}
        isReply={isReply}
        handleReply={handleReply}
        resetReply={resetReply}
        createReply={createReply}
      />
    </div>
  );
}
