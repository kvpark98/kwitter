import { useRef, useState } from "react";
import ScrollHome from "../components/scrolls/scrollHome";
import CreateTweet from "../components/tweets/create/create-tweet";
import TweetList from "../components/tweets/query/list/tweet-list";
import { Container } from "react-bootstrap";
import SideBar from "../components/header&footer/side-bar/side-bar";
import { CroppedAreaPixels } from "./profile";
import { auth, db, storage } from "../firebase";
import {
  FirestoreError,
  addDoc,
  collection,
  updateDoc,
} from "firebase/firestore";
import {
  StorageError,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { FirebaseError } from "firebase/app";
import CreateCropPhotoModal from "../components/tweets/create/create-crop-modal/create-crop-photo-modal";

export default function Home() {
  const user = auth.currentUser;

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState(false);

  const [message, setMessage] = useState("");

  const [file, setFile] = useState<File | null>(null);

  const [isMessage, setIsMessage] = useState(false);

  const [tweetCreated, setTweetCreated] = useState(false);

  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>("");

  const [croppedImagePreviewUrl, setCroppedImagePreviewUrl] =
    useState<string>("");

  const [error, setError] = useState("");

  const [showCreateTweetModal, setShowCreateTweetModal] = useState(false);
  const handleShowCreateTweetModal = () => setShowCreateTweetModal(true);
  const handleCloseCreateTweetModal = () => {
    setShowCreateTweetModal(false);
    resetMessageButton();
    resetPhotoButton();
    handleCreateRatio1x1();
  };

  const [crop, setCrop] = useState({ x: 0, y: 0 }); // 이미지 자르는 위치

  const [zoom, setZoom] = useState(1); // 이미지 확대/축소

  const [croppedAreaPixels, setCroppedAreaPixels] =
    useState<CroppedAreaPixels | null>(null); // 잘린 이미지 정보

  const [showCreatePhotoCropModal, setShowCreatePhotoCropModal] =
    useState(false);
  const handleShowCreatePhotoCropModal = () => {
    setShowCreateTweetModal(false);
    setShowCreatePhotoCropModal(true);
  };
  const handleCloseCreatePhotoCropModal = () => {
    setShowCreatePhotoCropModal(false);
    setShowCreateTweetModal(true);
    handleCreateRatio1x1();
  };

  const [createRatio1x1, setCreateRatio1x1] = useState(true);
  const [createRatio4x3, setCreateRatio4x3] = useState(false);
  const [createRatio16x9, setCreateRatio16x9] = useState(false);

  const handleCreateRatio1x1 = () => {
    setCreateRatio1x1(true);
    setCreateRatio4x3(false);
    setCreateRatio16x9(false);
  };

  const handleCreateRatio4x3 = () => {
    setCreateRatio1x1(false);
    setCreateRatio4x3(true);
    setCreateRatio16x9(false);
  };

  const handleCreateRatio16x9 = () => {
    setCreateRatio1x1(false);
    setCreateRatio4x3(false);
    setCreateRatio16x9(true);
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
    if (!croppedAreaPixels || !file) return;

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

      setCroppedImagePreviewUrl(croppedImageDataURL); // 잘린 이미지 (복사본) 미리 보기 가능

      // 데이터 URL을 Blob 객체로 변환
      const byteCharacters = atob(croppedImageDataURL.split(",")[1]);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "image/jpeg" });

      // Blob 객체를 File 객체로 변환 (Blob은 File 객체에 포함되는 개념)
      const croppedFile = new File([blob], "cropped-photo.jpeg", {
        type: "image/jpeg",
      });

      // 잘린 이미지 파일 업데이트
      setFile(croppedFile);

      handleCreateRatio1x1();

      setShowCreatePhotoCropModal(false);
      setShowCreateTweetModal(true);
    };
  };

  const handleMessage = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.currentTarget.value;

    setMessage(value);

    if (value.trim() !== "") {
      setIsMessage(true);
    } else {
      setIsMessage(false);
    }
  };

  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTweetCreated(false);
    setCroppedImagePreviewUrl("");

    const { files } = event.currentTarget; // 이벤트에서 파일 목록을 가져오기

    // 파일이 존재하고 하나만 선택된 경우
    if (files && files.length === 1) {
      const selectedFile = files[0]; // 첫 번째 선택된 파일

      // 파일 크기가 1MB 이하인 경우
      if (selectedFile.size <= 1024 * 1024) {
        const reader = new FileReader(); // FileReader 객체를 생성

        // 파일을 읽은 후
        reader.onload = () => {
          const result = reader.result as string; // 결과를 문자열로 변환
          setImagePreviewUrl(result); // 이미지 미리보기 URL을 설정
        };
        reader.readAsDataURL(selectedFile); // 파일을 Data URL로 읽기

        setFile(selectedFile); // 선택된 파일을 상태로 설정

        setError(""); // 에러 메시지 초기화
      } else {
        // 파일 크기가 1MB를 초과하는 경우
        setFile(null); // 선택된 파일 상태를 null로 설정

        setImagePreviewUrl(""); // 이미지 미리보기 URL을 초기화

        if (fileInputRef.current) {
          // 파일 입력(input) 참조가 있는 경우
          fileInputRef.current.value = ""; // 파일 값을 초기화
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
    setMessage("");
    setIsMessage(false);
  };

  const resetMessageButton = () => {
    resetMessageSubmit();
    setTweetCreated(false);
  };

  const resetPhotoSubmit = () => {
    setFile(null);
    setImagePreviewUrl("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const resetPhotoButton = () => {
    resetPhotoSubmit();
    setError("");
    setTweetCreated(false);
  };

  const createTweet = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isLoading || !isMessage || message.length > 180 || !user) {
      return;
    }

    setError("");

    try {
      setIsLoading(true);

      // Firestore에 새로운 문서 추가
      const doc = await addDoc(collection(db, "tweets"), {
        message,
        createdAt: Date.now(),
        username: user.displayName || "Anonymous",
        userId: user.uid,
      });

      // 파일이 있는 경우
      if (file) {
        // 파일의 크기가 1MB 이하인지 확인
        if (file.size <= 1024 * 1024) {
          // Firebase Storage에 업로드할 위치 참조 생성
          const locationRef = ref(storage, `tweets/${user.uid}/${doc.id}`);

          // 파일 업로드 및 결과 받아오기
          const result = await uploadBytes(locationRef, file);

          // 업로드된 파일의 다운로드 URL 가져오기
          const url = await getDownloadURL(result.ref);

          // Firestore db의 문서를 업데이트하여 다운로드 URL을 추가
          await updateDoc(doc, {
            photo: url,
          });
        } else {
          // 파일 크기가 1MB를 초과하면 에러 발생
          setFile(null);
          throw new Error("size-exhausted");
        }
      }

      // 메시지 및 파일 상태를 초기화
      resetMessageSubmit();
      resetPhotoSubmit();

      setImagePreviewUrl("");

      // 트윗이 등록되었음을 표시
      setTweetCreated(true);

      // 트윗 등록 상태를 5초 후에 초기화
      setTimeout(() => {
        setTweetCreated(false);
      }, 5000);
    } catch (error) {
      // 에러 발생 시 트윗 등록 상태를 초기화
      setTweetCreated(false);

      setImagePreviewUrl("");

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

  return (
    <Container fluid className="h-100">
      <SideBar handleShowCreateTweetModal={handleShowCreateTweetModal} />
      <div className="h-100 m-auto" style={{ maxWidth: "600px" }}>
        <CreateTweet
          showCreateTweetModal={showCreateTweetModal}
          isLoading={isLoading}
          error={error}
          fileInputRef={fileInputRef}
          message={message}
          handleMessage={handleMessage}
          isMessage={isMessage}
          handleFile={handleFile}
          imagePreviewUrl={imagePreviewUrl}
          croppedImagePreviewUrl={croppedImagePreviewUrl}
          resetMessageButton={resetMessageButton}
          resetPhotoButton={resetPhotoButton}
          createTweet={createTweet}
          tweetCreated={tweetCreated}
          handleShowCreatePhotoCropModal={handleShowCreatePhotoCropModal}
          handleCloseCreateTweetModal={handleCloseCreateTweetModal}
        />
        <TweetList />
        <ScrollHome />
      </div>
      <CreateCropPhotoModal
        showCreatePhotoCropModal={showCreatePhotoCropModal}
        handleCloseCreatePhotoCropModal={handleCloseCreatePhotoCropModal}
        imagePreviewUrl={imagePreviewUrl}
        crop={crop}
        setCrop={setCrop}
        zoom={zoom}
        setZoom={setZoom}
        onCropComplete={onCropComplete}
        handleSaveCroppedPhoto={handleSaveCroppedPhoto}
        createRatio1x1={createRatio1x1}
        createRatio4x3={createRatio4x3}
        createRatio16x9={createRatio16x9}
        handleCreateRatio1x1={handleCreateRatio1x1}
        handleCreateRatio4x3={handleCreateRatio4x3}
        handleCreateRatio16x9={handleCreateRatio16x9}
      />
    </Container>
  );
}
