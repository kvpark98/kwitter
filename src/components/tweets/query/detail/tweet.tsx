import { useRef, useState } from "react";
import { FirebaseError } from "firebase/app";
import {
  FirestoreError,
  deleteDoc,
  deleteField,
  doc,
  updateDoc,
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
import TweetDeleteModal from "../../../modals/warning/tweet-delete-modal";
import TweetCard from "./tweet-card";
import ModifyCropPhotoModal from "../../modify/modify-crop-modal/modify-crop-photo-modal";
import { CroppedAreaPixels } from "../../../../routes/profile";

export interface ITweet {
  id: string;
  timeAgo: string | undefined;
  createdAt: string;
  message: string;
  photo?: string;
  userId: string;
  username: string;
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

  const [isLoading, setIsLoading] = useState(false);

  const newFileInputRef = useRef<HTMLInputElement>(null);

  const [newMessage, setNewMessage] = useState(message);

  const [newFile, setNewFile] = useState<File | null>(null);

  const [isNewMessage, setIsNewMessage] = useState(true);

  const [tweetModified, setTweetModified] = useState(false);

  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>("");

  const [error, setError] = useState("");

  const [showTweetModifyModal, setShowTweetModifyModal] = useState(false);
  const handleShowTweetModifyModal = () => setShowTweetModifyModal(true);
  const handleCloseTweetModifyModal = () => {
    setShowTweetModifyModal(false);
    resetMessageButton();
    resetPhotoButton();
  };

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleShowDeleteModal = () => setShowDeleteModal(true);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);

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

  const [showModifyPhotoCropModal, setShowModifyPhotorCropModal] =
    useState(false);
  const handleShowModifyPhotoCropModal = () => {
    setShowTweetModifyModal(false);
    setShowModifyPhotorCropModal(true);
  };
  const handleCloseModifyPhotoCropModal = () => {
    setShowModifyPhotorCropModal(false);
    setShowTweetModifyModal(true);
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
    image.src = imagePreviewUrl; // imagePreviewUrl를 새 이미지 객체에 복사하여 붙여넣기

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

      setImagePreviewUrl(croppedImageDataURL); // 잘린 이미지 (복사본) 미리 보기 가능

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

      setShowModifyPhotorCropModal(false);
      setShowTweetModifyModal(true);
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

  const handleNewFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTweetModified(false);

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
          setImagePreviewUrl(result); // 이미지 미리보기 URL을 설정
        };
        reader.readAsDataURL(selectedFile); // 파일을 Data URL로 읽기

        setNewFile(selectedFile); // 선택된 파일을 상태로 설정

        setError(""); // 에러 메시지 초기화
      } else {
        // 파일 크기가 1MB를 초과하는 경우
        setNewFile(null); // 선택된 파일 상태를 null로 설정

        setImagePreviewUrl(""); // 이미지 미리보기 URL을 초기화

        if (newFileInputRef.current) {
          // 파일 입력(input) 참조가 있는 경우
          newFileInputRef.current.value = ""; // 파일 값을 초기화
        }

        setError("size-exhausted"); // 에러 상태를 'size-exhausted'로 설정

        setTimeout(() => {
          // 5초 후
          setError(""); // 에러 메시지 초기화
        }, 5000);
      }
    }
  };

  const resetMessageSubmit = () => {
    setNewMessage(message);
    setIsNewMessage(true);
  };

  const resetMessageButton = () => {
    resetMessageSubmit();
    setTweetModified(false);
  };

  const resetPhotoSubmit = () => {
    setNewFile(null);
    setImagePreviewUrl("");
    if (newFileInputRef.current) {
      newFileInputRef.current.value = "";
    }
  };

  const resetPhotoButton = () => {
    resetPhotoSubmit();
    setError("");
    setTweetModified(false);
  };

  const deletePhoto = async () => {
    // 기존 이미지 삭제
    await updateDoc(doc(db, "tweets", id), {
      photo: deleteField(),
      createdAt: Date.now(),
    });

    const photoRef = ref(storage, `tweets/${user?.uid}/${id}`);
    await deleteObject(photoRef);
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

      // Firestore의 트윗 문서 업데이트
      await updateDoc(doc(db, "tweets", id), {
        createdAt: Date.now(),
        message: newMessage,
        username: user.displayName,
      });

      // 파일 상태를 초기화
      resetPhotoSubmit();

      // 트윗이 수정되었음을 표시
      setTweetModified(true);

      // 트윗 수정 상태를 5초 후에 초기화
      setTimeout(() => {
        setTweetModified(false);
      }, 5000);
    } catch (error) {
      // 에러 발생 시 트윗 수정 상태를 초기화
      setTweetModified(false);

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

      // 메시지 및 파일 상태를 초기화
      resetMessageSubmit();
      resetPhotoSubmit();

      // 에러 5초 후에 초기화
      setTimeout(() => {
        setError("");
      }, 5000);
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
      handleShowDeleteErrorsModal();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-100">
      <TweetCard
        user={user}
        timeAgo={timeAgo}
        message={message}
        photo={photo}
        userId={userId}
        username={username}
        handleShowTweetModifyModal={handleShowTweetModifyModal}
        handleShowDeleteModal={handleShowDeleteModal}
      />
      {showTweetModifyModal && (
        <ModifyTweet
          isLoading={isLoading}
          error={error}
          photo={photo}
          newFileInputRef={newFileInputRef}
          newMessage={newMessage}
          handleNewMessage={handleNewMessage}
          isNewMessage={isNewMessage}
          handleNewFile={handleNewFile}
          imagePreviewUrl={imagePreviewUrl}
          resetMessageButton={resetMessageButton}
          resetPhotoButton={resetPhotoButton}
          deletePhoto={deletePhoto}
          modifyTweet={modifyTweet}
          tweetModified={tweetModified}
          showTweetModifyModal={showTweetModifyModal}
          handleCloseTweetModifyModal={handleCloseTweetModifyModal}
          handleShowModifyPhotoCropModal={handleShowModifyPhotoCropModal}
        />
      )}
      <ModifyCropPhotoModal
        showModifyPhotoCropModal={showModifyPhotoCropModal}
        handleCloseModifyPhotoCropModal={handleCloseModifyPhotoCropModal}
        imagePreviewUrl={imagePreviewUrl}
        crop={crop}
        setCrop={setCrop}
        zoom={zoom}
        setZoom={setZoom}
        onCropComplete={onCropComplete}
        handleSaveCroppedPhoto={handleSaveCroppedPhoto}
      />
      <TweetDeleteModal
        isLoading={isLoading}
        error={error}
        showDeleteModal={showDeleteModal}
        handleCloseDeleteModal={handleCloseDeleteModal}
        deleteTweet={deleteTweet}
        showDeleteErrorsModal={showDeleteErrorsModal}
        handleCloseDeleteErrorsModal={handleCloseDeleteErrorsModal}
      />
    </div>
  );
}
