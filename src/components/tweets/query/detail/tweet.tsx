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
import CreateReplySuccessModal from "../../../modals/success/create-reply-success-modal";
import CreateReplyErrorModal from "../../../modals/error/create-reply-error-modal";
import CreateReply from "./reply/create/create-reply";
import CreateReplyDiscardModal from "./reply/create/create-reply-discard-modal/create-reply-discard-modal";
import ReplyList from "./reply/query/list/reply-list";
import { IReply } from "./reply/query/detail/reply";
import DeleteTweetErrorModal from "../../../modals/error/delete-tweet-error-modal";

export interface ITweet {
  id: string;
  timeAgo?: string | undefined;
  createdAt: string;
  message: string;
  photo?: string;
  tweetUserId: string;
  tweetUsername: string;
  totalLikes: number;
}

export interface TweetProps {
  id: string;
  timeAgo?: string | undefined;
  message: string;
  photo?: string;
  tweetUserId: string;
  tweetUsername: string;
  totalLikes: number;
  setIsTweetDeleted: React.Dispatch<React.SetStateAction<boolean>>;
  setIsReplyDeleted: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Tweet({
  id,
  timeAgo,
  message,
  photo,
  tweetUserId,
  tweetUsername,
  totalLikes,
  setIsTweetDeleted,
  setIsReplyDeleted,
}: TweetProps) {
  const user = auth.currentUser!;

  const defaultAvatarURL = "/person-circle.svg";

  const [tweetAvatar, setTweetAvatar] = useState(defaultAvatarURL);

  const getTweetAvatar = async () => {
    const tweetAvatarQuery = query(
      collection(db, "avatars"),
      where("userId", "==", tweetUserId)
    );

    const snapshot = await getDocs(tweetAvatarQuery);
    snapshot.forEach(async (doc) => {
      const data = doc.data();
      setTweetAvatar(data.avatar);
    });
  };

  getTweetAvatar();

  const getLikes = async () => {
    // 특정 유저가 특정 트윗에 대해 좋아요를 눌렀는지 확인하는 쿼리
    const likeQuery = query(
      collection(db, "likes"),
      where("likeUserId", "==", user.uid),
      where("tweetId", "==", id)
    );

    const likeSnapshot = await getDocs(likeQuery); // 쿼리 실행하여 결과 가져오기
    if (!likeSnapshot.empty) {
      likeSnapshot.forEach(async (doc) => {
        const data = doc.data();
        setIsLike(data.isLike);
      });
    } else {
      setIsLike(false);
    }
  };

  getLikes();

  const [isLoading, setIsLoading] = useState(false);

  const newFileInputRef = useRef<HTMLInputElement>(null);
  const messageTextAreaRef = useRef<HTMLTextAreaElement>(null);

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

  const [likes, setLikes] = useState(totalLikes);

  const [isLike, setIsLike] = useState(false);

  const [error, setError] = useState("");

  // debounce 함수: 주어진 시간 동안 이벤트를 무시하고, 마지막 호출만 실행하는 함수
  // debounce 함수는 연속적인 호출을 관리하고, 마지막 호출만 유효하게 처리할 수 있다. 따라서, 사용자가 빠르게 여러 번 클릭할 때 마지막 클릭만이 실제로 처리되어 예기치 않은 동작을 방지할 수 있다.
  function debounce(func: (...args: any[]) => void, wait: number) {
    let timeout: ReturnType<typeof setTimeout> | undefined; // 타이머를 저장할 변수

    // 반환된 함수는 실제로 호출되는 함수
    return function (...args: any[]) {
      // 나중에 실행될 함수 정의
      const later = () => {
        clearTimeout(timeout); // 기존 타이머 제거 (later 함수 내에서 clearTimeout(timeout)을 호출하는 것은 이전에 설정된 타이머가 있다면 그것을 취소하고, 새로운 타이머를 설정하는 것을 확실하게 하기 위한 안전장치이다. 이를 통해 debounce 함수가 예상대로 동작하고, 마지막 클릭만 처리될 수 있도록 보장한다.)
        func(...args); // 주어진 함수 실행 (실제 작업 수행)
      };

      clearTimeout(timeout); // 함수가 호출될 때마다 이전 타이머 제거
      timeout = setTimeout(later, wait); // 새로운 타이머 설정 (wait 밀리초 후 later 함수 실행)
      // clearTimeout(timeout)와 setTimeout(later, wait)는 debounce 함수에서 늘 함께 사용된다. 이 두 코드는 각 함수 호출 시 이전에 설정된 타이머를 취소하고, 새로운 타이머를 설정하여 마지막 클릭만을 처리할 수 있도록 보장한다. 이는 debounce 함수가 예상대로 동작하고, 원하는 기능을 제공할 수 있도록 핵심적인 역할을 한다.
    };
  }

  const handleLikes = async () => {
    try {
      // 특정 유저가 특정 트윗에 대해 좋아요를 눌렀는지 확인하는 쿼리
      const likeQuery = query(
        collection(db, "likes"),
        where("likeUserId", "==", user.uid),
        where("tweetId", "==", id)
      );
      const likeSnapshot = await getDocs(likeQuery); // 쿼리 실행하여 결과 가져오기

      if (isLike) {
        // 좋아요를 취소하는 경우
        await updateDoc(doc(db, "tweets", id), {
          totalLikes: likes - 1,
        });

        likeSnapshot.forEach(async (doc) => {
          await deleteDoc(doc.ref);
        });

        setIsLike(false);

        setLikes((current) => current - 1);
      } else {
        // 좋아요를 추가하는 경우
        await updateDoc(doc(db, "tweets", id), {
          totalLikes: likes + 1,
        });

        await addDoc(collection(db, "likes"), {
          createdAt: Date.now(),
          isLike: true,
          tweetId: id,
          tweetUserId: tweetUserId,
          likeUserId: user.uid,
        }); // 새로운 좋아요 문서 추가

        setIsLike(true);

        setLikes((current) => current + 1);
      }
    } catch (error) {
      console.error("Error handling likes: ", error);
    }
  };

  const debouncedHandleLikes = debounce(handleLikes, 300);

  const [showModifyTweetModal, setShowModifyTweetModal] = useState(false);
  const handleShowModifyTweetModal = () => {
    setShowModifyTweetModal(true);
  };
  const handleCloseModifyTweetModal = () => {
    if (
      newImagePreviewUrl ||
      photoDeleteButtonClicked ||
      messageTextAreaRef.current?.value !== message
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
  const handleShowModifyTweetDiscardModal = () =>
    setShowModifyTweetDiscardModal(true);
  const handleCloseModifyTweetDiscardModal = () =>
    setShowModifyTweetDiscardModal(false);

  const [showModifyTweetSuccessModal, setShowModifyTweetSuccessModal] =
    useState(false);
  const handleShowModifyTweetSuccessModal = () => {
    setShowModifyTweetModal(false);
    resetPhotoButton();
    handleModifyRatio1x1();
    setZoom(1);
    setPhotoDeleteButtonClicked(false);
    setShowModifyTweetDiscardModal(false);
    setShowModifyTweetSuccessModal(true);
  };
  const handleCloseModifyTweetSuccessModal = () => {
    setShowModifyTweetSuccessModal(false);
  };

  const [showModifyTweetErrorModal, setShowModifyTweetErrorModal] =
    useState(false);
  const handleShowModifyTweetErrorModal = () => {
    setShowModifyTweetModal(false);
    setShowModifyTweetErrorModal(true);
  };
  const handleCloseModifyTweetErrorModal = () => {
    setShowModifyTweetErrorModal(false);
    setError("");
    handleShowModifyTweetModal();
  };

  const [showDeleteTweetModal, setShowDeleteTweetModal] = useState(false);
  const handleShowDeleteTweetModal = () => setShowDeleteTweetModal(true);
  const handleCloseDeleteTweetModal = () => setShowDeleteTweetModal(false);

  const [showDeleteTweetErrorModal, setShowDeleteTweetErrorModal] =
    useState(false);
  const handleShowDeleteTweetErrorModal = () => {
    handleCloseDeleteTweetModal();
    setShowDeleteTweetErrorModal(true);
  };
  const handleCloseDeleteTweetErrorModal = () =>
    setShowDeleteTweetErrorModal(false);

  const [showReplyListModal, setShowReplyListModal] = useState(false);
  const handleShowReplyListModal = () => setShowReplyListModal(true);
  const handleCloseReplyListModal = () => setShowReplyListModal(false);

  const [showCreateReplyModal, setShowCreateReplyModal] = useState(false);
  const handleShowCreateReplyModal = () => {
    handleCloseReplyListModal();
    setShowCreateReplyModal(true);
  };
  const handleCloseCreateReplyModal = () => {
    if (reply.trim() !== "") {
      handleShowCreateReplyDiscardModal();
    } else {
      setShowCreateReplyModal(false);
      resetReply();
      handleCloseCreateReplyDiscardModal();
      handleShowReplyListModal();
    }
  };

  const [showCreateReplySuccessModal, setShowCreateReplySuccessModal] =
    useState(false);
  const handleShowCreateReplySuccessModal = () => {
    setShowCreateReplyModal(false);
    resetReply();
    setShowCreateReplySuccessModal(true);
  };
  const handleCloseCreateReplySuccessModal = () =>
    setShowCreateReplySuccessModal(false);

  const [showCreateReplyErrorModal, setShowCreateReplyErrorModal] =
    useState(false);
  const handleShowCreateReplyErrorModal = () => {
    setShowCreateReplyModal(false);
    setShowCreateReplyErrorModal(true);
  };
  const handleCloseCreateReplyErrorModal = () => {
    setShowCreateReplyErrorModal(false);
    setShowCreateReplyModal(true);
  };

  const handleCloseCreateReplyDiscardBothModal = () => {
    setShowCreateReplyModal(false);
    resetReply();
    handleCloseCreateReplyDiscardModal();
    handleShowReplyListModal();
  };

  const [showCreateReplyDiscardModal, setShowCreateReplyDiscardModal] =
    useState(false);
  const handleShowCreateReplyDiscardModal = () =>
    setShowCreateReplyDiscardModal(true);
  const handleCloseCreateReplyDiscardModal = () =>
    setShowCreateReplyDiscardModal(false);

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

        handleShowModifyTweetErrorModal();
      }
    }
  };

  const resetMessageSubmit = () => {
    setNewMessage(message);
    setIsNewMessage(true);
    if (messageTextAreaRef.current) {
      messageTextAreaRef.current.value = message;
    }
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

    if (isLoading || !isNewMessage || newMessage!.length > 180 || !user) {
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
            tweetUsername: user.displayName,
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

      await updateDoc(doc(db, "tweets", id), {
        createdAt: Date.now(),
        message: newMessage,
        tweetUsername: user.displayName,
      });

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

      resetMessageSubmit();
      resetPhotoSubmit();

      setPhotoDeleteButtonClicked(false);

      handleShowModifyTweetErrorModal();
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTweet = async () => {
    if (isLoading || user?.uid !== tweetUserId) {
      return;
    }

    setError("");

    try {
      setIsLoading(true);

      if (photo) {
        const photoRef = ref(storage, `tweets/${user.uid}/${id}`);
        await deleteObject(photoRef);
      }

      const replyQuery = query(
        collection(db, "replys"),
        where("tweetId", "==", id)
      );

      const replySnapshot = await getDocs(replyQuery);
      replySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });

      const likeQuery = query(
        collection(db, "likes"),
        where("tweetId", "==", id)
      );

      const likeSnapshot = await getDocs(likeQuery);
      likeSnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });

      await deleteDoc(doc(db, "tweets", id));

      setIsTweetDeleted(true);
    } catch (error) {
      setIsTweetDeleted(false);

      if (error instanceof FirebaseError) {
        setError(error.code);
      } else if (error instanceof FirestoreError) {
        setError(error.code);
      } else if (error instanceof StorageError) {
        setError(error.code);
      } else {
        setError("size-exhausted");
      }

      handleShowDeleteTweetErrorModal();
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
      return `${diffInDays} d`;
    } else if (diffInHours > 0) {
      return `${diffInHours} h`;
    } else if (diffInMinutes > 0) {
      return `${diffInMinutes} min`;
    } else if (diffInSeconds > 0) {
      return `${diffInSeconds} sec`;
    } else if (diffInMilliseconds > 0) {
      return `${diffInMilliseconds} millisec`;
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
        createdAt: Date.now(),
        tweetId: id,
        tweetUserId: tweetUserId,
        reply: reply,
        replyUserId: user.uid,
        replyUsername: user.displayName,
      });

      handleShowCreateReplySuccessModal();
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError(error.code);
      } else if (error instanceof FirestoreError) {
        setError(error.code);
      } else if (error instanceof StorageError) {
        setError(error.code);
      }

      handleShowCreateReplyErrorModal();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-100">
      <TweetCard
        user={user}
        tweetAvatar={tweetAvatar}
        timeAgo={timeAgo}
        message={message}
        photo={photo}
        tweetUserId={tweetUserId}
        tweetUsername={tweetUsername}
        likes={likes}
        isLike={isLike}
        debouncedHandleLikes={debouncedHandleLikes}
        replys={replys}
        handleShowModifyTweetModal={handleShowModifyTweetModal}
        handleShowDeleteTweetModal={handleShowDeleteTweetModal}
        handleShowReplyListModal={handleShowReplyListModal}
      />
      {showModifyTweetModal && (
        <ModifyTweet
          isLoading={isLoading}
          photo={photo}
          newFileInputRef={newFileInputRef}
          messageTextAreaRef={messageTextAreaRef}
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
        showModifyTweetErrorModal={showModifyTweetErrorModal}
        handleCloseModifyTweetErrorModal={handleCloseModifyTweetErrorModal}
      />
      <DeleteTweetWarningModal
        isLoading={isLoading}
        showDeleteTweetModal={showDeleteTweetModal}
        handleCloseDeleteTweetModal={handleCloseDeleteTweetModal}
        deleteTweet={deleteTweet}
      />
      <DeleteTweetErrorModal
        error={error}
        showDeleteTweetErrorModal={showDeleteTweetErrorModal}
        handleCloseDeleteTweetErrorModal={handleCloseDeleteTweetErrorModal}
      />
      <ReplyList
        user={user}
        replys={replys}
        showReplyListModal={showReplyListModal}
        handleCloseReplyListModal={handleCloseReplyListModal}
        handleShowCreateReplyModal={handleShowCreateReplyModal}
        setIsReplyDeleted={setIsReplyDeleted}
      />
      <CreateReply
        showCreateReplyModal={showCreateReplyModal}
        handleCloseCreateReplyModal={handleCloseCreateReplyModal}
        isLoading={isLoading}
        reply={reply}
        isReply={isReply}
        handleReply={handleReply}
        resetReply={resetReply}
        createReply={createReply}
      />
      <CreateReplySuccessModal
        showCreateReplySuccessModal={showCreateReplySuccessModal}
        handleCloseCreateReplySuccessModal={handleCloseCreateReplySuccessModal}
      />
      <CreateReplyErrorModal
        error={error}
        showCreateReplyErrorModal={showCreateReplyErrorModal}
        handleCloseCreateReplyErrorModal={handleCloseCreateReplyErrorModal}
      />
      <CreateReplyDiscardModal
        showCreateReplyDiscardModal={showCreateReplyDiscardModal}
        handleCloseCreateReplyDiscardModal={handleCloseCreateReplyDiscardModal}
        handleCloseCreateReplyDiscardBothModal={
          handleCloseCreateReplyDiscardBothModal
        }
      />
    </div>
  );
}
