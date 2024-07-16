import { useEffect, useRef, useState } from "react";
import ScrollHome from "../components/scrolls/scrollHome";
import CreateTweet from "../components/tweets/create/create-tweet";
import TweetList from "../components/tweets/query/list/tweet-list";
import { Container } from "react-bootstrap";
import { CroppedAreaPixels } from "./profile";
import { auth, db, storage } from "../firebase";
import {
  FirestoreError,
  Unsubscribe,
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
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
import CreateTweetDiscardModal from "../components/tweets/create/create-tweet-discard-modal/create-tweet-discard-modal";
import { useNavigate } from "react-router-dom";
import TweetHeader from "../components/tweets/tweet-header";
import SideBar from "../components/sidebar/side-bar";
import { ITweet } from "../components/tweets/query/detail/tweet";
import CreateTweetErrorModal from "../components/modals/error/create-tweet-error-modal";
import CreateTweetSuccessModal from "../components/modals/success/create-tweet-success-modal";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import ResetPassword from "../components/auth/reset-password/reset-password";
import ResetPasswordErrorModal from "../components/modals/error/reset-password-error-modal";
import TweetDeleteSuccessModal from "../components/modals/success/tweet-delete-success-modal";
import ReplyDeleteSuccessModal from "../components/modals/success/reply-delete-success-modal";

export default function Home() {
  const user = auth.currentUser;

  const passwordInputRef = useRef<HTMLInputElement>(null);
  const passwordConfirmInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const [signInMethod, setSignInMethod] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);

  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [passwordConfirmErrorMessage, setPasswordConfirmErrorMessage] =
    useState("");

  const [passwordInputType, setPasswordInputType] = useState(false);
  const [passwordConfirmInputType, setPasswordConfirmInputType] =
    useState(false);

  const [tweets, setTweets] = useState<ITweet[]>([]);

  const [message, setMessage] = useState("");

  const [file, setFile] = useState<File | null>(null);

  const [isMessage, setIsMessage] = useState(false);

  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>("");

  const [croppedImagePreviewUrl, setCroppedImagePreviewUrl] =
    useState<string>("");

  const [isTweetDeleted, setIsTweetDeleted] = useState(false);

  const [isReplyDeleted, setIsReplyDeleted] = useState(false);

  const [likes, setLikes] = useState(0);

  const [error, setError] = useState("");

  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
  const handleShowResetPasswordModal = () => setShowResetPasswordModal(true);
  const handleCloseResetPasswordModal = () => {
    setShowResetPasswordModal(false);
    setPasswordInputType(false);
    setPasswordConfirmInputType(false);
  };

  const [showResetPasswordErrorModal, setShowResetPasswordErrorModal] =
    useState(false);
  const handleShowResetPasswordErrorModal = () => {
    handleCloseResetPasswordModal();
    setShowResetPasswordErrorModal(true);
  };
  const handleCloseResetPasswordErrorModal = () => {
    setShowResetPasswordErrorModal(false);
    setPasswordInputType(false);
    setPasswordConfirmInputType(false);
    handleShowResetPasswordModal();
  };

  const [showCreateTweetModal, setShowCreateTweetModal] = useState(false);
  const handleShowCreateTweetModal = () => setShowCreateTweetModal(true);
  const handleCloseCreateTweetModal = () => {
    if (imagePreviewUrl || message) {
      handleShowCreateTweetDiscardModal();
    } else {
      setShowCreateTweetModal(false);
      resetMessageButton();
      resetPhotoButton();
      handleCreateRatio1x1();
      setZoom(1);
      setShowCreateTweetDiscardModal(false);
    }
  };

  const handleCloseCreateTweetDiscardBothModal = () => {
    setShowCreateTweetModal(false);
    resetMessageButton();
    resetPhotoButton();
    handleCreateRatio1x1();
    setZoom(1);
    setShowCreateTweetDiscardModal(false);
  };

  const [showCreateTweetDiscardModal, setShowCreateTweetDiscardModal] =
    useState(false);
  const handleShowCreateTweetDiscardModal = () => {
    setShowCreateTweetDiscardModal(true);
  };
  const handleCloseCreateTweetDiscardModal = () => {
    setShowCreateTweetDiscardModal(false);
  };

  const [showCreateTweetSuccessModal, setShowCreateTweetSuccessModal] =
    useState(false);
  const handleShowCreateTweetSuccessModal = () => {
    handleCloseCreateTweetDiscardBothModal();
    setShowCreateTweetSuccessModal(true);
  };
  const handleCloseCreateTweetSuccessModal = () => {
    setShowCreateTweetSuccessModal(false);
  };

  const [showCreateTweetErrorsModal, setShowCreateTweetErrorsModal] =
    useState(false);
  const handleShowCreateTweetErrorsModal = () => {
    setShowCreateTweetModal(false);
    setShowCreateTweetErrorsModal(true);
  };
  const handleCloseCreateTweetErrorsModal = () => {
    setShowCreateTweetErrorsModal(false);
    setError("");
    handleShowCreateTweetModal();
  };

  const [showDeleteTweetSuccessModal, setShowDeleteTweetSuccessModal] =
    useState(false);
  const handleShowDeleteTweetSuccessModal = () =>
    setShowDeleteTweetSuccessModal(true);
  const handleCloseDeleteTweetSuccessModal = () => {
    setShowDeleteTweetSuccessModal(false);
    setIsTweetDeleted(false);
  };

  const [showDeleteReplySuccessModal, setShowDeleteReplySuccessModal] =
    useState(false);
  const handleShowDeleteReplySuccessModal = () =>
    setShowDeleteReplySuccessModal(true);
  const handleCloseDeleteReplySuccessModal = () => {
    setShowDeleteReplySuccessModal(false);
    setIsReplyDeleted(false);
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
    setZoom(1);
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
      setZoom(1);

      setShowCreatePhotoCropModal(false);
      setShowCreateTweetModal(true);
    };
  };

  useEffect(() => {
    if (isTweetDeleted) {
      handleShowDeleteTweetSuccessModal();
    }
    if (isReplyDeleted) {
      handleShowDeleteReplySuccessModal();
    }
  }, [isTweetDeleted, isReplyDeleted]);

  useEffect(() => {
    checkSignInMethod();
    checkCurrentPassword();

    if (signInMethod === "emailLink") {
      handleShowResetPasswordModal();
    }
  }, [signInMethod]);

  const checkSignInMethod = async () => {
    const user = auth.currentUser;

    if (user) {
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const signInMethod = userDocSnap.data().signInMethod;
        setSignInMethod(signInMethod);
      }
    }
  };

  const checkCurrentPassword = async () => {
    const user = auth.currentUser;

    if (user) {
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const currentPassword = userDocSnap.data().password;
        setCurrentPassword(currentPassword);
      }
    }
  };

  const signOut = () => {
    auth.signOut();
    navigate("/welcome");
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

  // 컴포넌트가 마운트될 때 tweet 가져오기
  useEffect(() => {
    // Firestore 구독을 위한 변수
    let unsubscribe: Unsubscribe | null = null;

    // 사용자의 tweet을 가져오는 함수
    const fetchTweets = async () => {
      // Firestore 쿼리 생성
      const tweetQuery = query(
        collection(db, "tweets"),
        orderBy("createdAt", "desc")
      );

      // 실시간 업데이트를 수신하기 위해 onSnapshot 이벤트 리스너 등록
      unsubscribe = await onSnapshot(tweetQuery, (snapshot) => {
        // 스냅샷을 tweet 배열로 변환
        const tweets = snapshot.docs.map((doc) => {
          // Firestore 문서에서 필요한 데이터 추출
          const {
            createdAt,
            message,
            photo,
            tweetUserId,
            tweetUsername,
            likes,
          } = doc.data();

          // 새로운 tweet 객체 생성
          return {
            id: doc.id,
            timeAgo: formatTimeAgo(createdAt),
            createdAt,
            message,
            photo,
            tweetUserId,
            tweetUsername,
            likes,
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

  const changePasswordType = () => {
    setPasswordInputType((current) => !current);
  };

  const changePasswordConfirmType = () => {
    setPasswordConfirmInputType((current) => !current);
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    const regPassword =
      /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-]).{8,}$/;

    const trimmedValue = value.replace(/\s/gi, "");
    setPassword(trimmedValue);

    if (trimmedValue !== "") {
      if (!regPassword.test(trimmedValue)) {
        setPasswordErrorMessage(
          "Please enter at least 8 characters including numbers, English, and special characters."
        );
        setIsPassword(false);
        setIsPasswordConfirm(false);

        passwordInputRef.current?.classList.add("form-control-invalid");
        passwordInputRef.current?.classList.remove("form-control-valid");

        passwordConfirmInputRef.current?.classList.remove("form-control-valid");
        if (passwordConfirm) {
          setPasswordConfirmErrorMessage(
            "Please make your password valid first."
          );

          passwordConfirmInputRef.current?.classList.add(
            "form-control-invalid"
          );
        } else {
          setPasswordConfirmErrorMessage("");

          passwordConfirmInputRef.current?.classList.remove(
            "form-control-invalid"
          );
        }
      } else {
        setIsPassword(true);

        passwordInputRef.current?.classList.remove("form-control-invalid");
        passwordInputRef.current?.classList.add("form-control-valid");
        if (passwordConfirm) {
          if (trimmedValue !== passwordConfirm) {
            setPasswordConfirmErrorMessage("The password does not match.");
            setIsPasswordConfirm(false);

            passwordConfirmInputRef.current?.classList.add(
              "form-control-invalid"
            );
            passwordConfirmInputRef.current?.classList.remove(
              "form-control-valid"
            );
          } else {
            setPasswordConfirmErrorMessage("");
            setIsPasswordConfirm(true);

            passwordConfirmInputRef.current?.classList.remove(
              "form-control-invalid"
            );
            passwordConfirmInputRef.current?.classList.add(
              "form-control-valid"
            );
          }
        } else {
          setPasswordConfirmErrorMessage("");
          setIsPasswordConfirm(false);

          passwordConfirmInputRef.current?.classList.remove(
            "form-control-invalid"
          );
        }
      }
    } else {
      setPasswordErrorMessage("");
      setIsPassword(false);
      setIsPasswordConfirm(false);

      passwordInputRef.current?.classList.remove("form-control-invalid");
      passwordInputRef.current?.classList.remove("form-control-valid");

      passwordConfirmInputRef.current?.classList.remove("form-control-valid");
      if (passwordConfirm) {
        setPasswordConfirmErrorMessage("Please enter your password first.");

        passwordConfirmInputRef.current?.classList.add("form-control-invalid");
      } else {
        setPasswordConfirmErrorMessage("");

        passwordConfirmInputRef.current?.classList.remove(
          "form-control-invalid"
        );
      }
    }
  };

  const handlePasswordConfirm = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;

    const trimmedValue = value.replace(/\s/gi, "");
    setPasswordConfirm(trimmedValue);

    if (trimmedValue !== "") {
      if (trimmedValue !== password) {
        setPasswordConfirmErrorMessage("The password does not match.");
        setIsPasswordConfirm(false);

        passwordConfirmInputRef.current?.classList.add("form-control-invalid");
        passwordConfirmInputRef.current?.classList.remove("form-control-valid");
      } else {
        setIsPasswordConfirm(true);

        passwordConfirmInputRef.current?.classList.remove(
          "form-control-invalid"
        );
        passwordConfirmInputRef.current?.classList.add("form-control-valid");
      }
    } else {
      setPasswordConfirmErrorMessage("");
      setIsPasswordConfirm(false);

      passwordConfirmInputRef.current?.classList.remove("form-control-invalid");
      passwordConfirmInputRef.current?.classList.remove("form-control-valid");
    }
  };

  const noSpace = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === "Space") {
      event.preventDefault();
    }
  };

  const reset = () => {
    setPassword("");
    setPasswordConfirm("");

    setIsPassword(false);
    setIsPasswordConfirm(false);

    setPasswordInputType(false);
    setPasswordConfirmInputType(false);

    setPasswordErrorMessage("");
    setPasswordConfirmErrorMessage("");

    passwordInputRef.current?.classList.remove("form-control-invalid");
    passwordInputRef.current?.classList.remove("form-control-valid");

    passwordConfirmInputRef.current?.classList.remove("form-control-invalid");
    passwordConfirmInputRef.current?.classList.remove("form-control-valid");
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

        handleShowCreateTweetErrorsModal();
      }
    }
  };

  const resetMessageSubmit = () => {
    setMessage("");
    setIsMessage(false);
  };

  const resetMessageButton = () => {
    resetMessageSubmit();
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
  };

  const back = () => {
    navigate(-1);
  };

  const resetPassword = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      isLoading ||
      !isPassword ||
      !isPasswordConfirm ||
      password !== passwordConfirm
    ) {
      return;
    }

    setError("");

    try {
      setIsLoading(true);

      const user = auth.currentUser!;

      const credential = EmailAuthProvider.credential(
        auth.currentUser?.email!,
        currentPassword
      );

      await reauthenticateWithCredential(user, credential);

      await updatePassword(user, password);

      const userDocRef = doc(db, "users", user.uid);

      await setDoc(userDocRef, { password: password }, { merge: true });

      window.localStorage.setItem("PasswordChanged", "true");

      signOut();
    } catch (error) {
      window.localStorage.removeItem("PasswordChanged");

      if (error instanceof FirebaseError) {
        setError(error.code);

        handleShowResetPasswordErrorModal();
      }
    } finally {
      setIsLoading(false);
    }
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
        message: message,
        createdAt: Date.now(),
        tweetUserId: user.uid,
        tweetUsername: user.displayName || "Anonymous",
        likes: likes,
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

      handleShowCreateTweetSuccessModal();
    } catch (error) {
      setImagePreviewUrl("");

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

      handleShowCreateTweetErrorsModal();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container fluid className="d-flex justify-content-center h-100 p-0">
      <SideBar handleShowCreateTweetModal={handleShowCreateTweetModal} />
      <div
        className="overflow-y-auto bg-light h-100"
        style={{ width: "630px" }}
      >
        <TweetHeader tweets={tweets} back={back} />
        <TweetList
          tweets={tweets}
          setLikes={setLikes}
          setIsTweetDeleted={setIsTweetDeleted}
          setIsReplyDeleted={setIsReplyDeleted}
        />
        <ScrollHome />
      </div>
      <ResetPassword
        showResetPasswordModal={showResetPasswordModal}
        handleCloseResetPasswordModal={handleCloseResetPasswordModal}
        passwordInputRef={passwordInputRef}
        passwordConfirmInputRef={passwordConfirmInputRef}
        isLoading={isLoading}
        passwordInputType={passwordInputType}
        passwordConfirmInputType={passwordConfirmInputType}
        changePasswordType={changePasswordType}
        changePasswordConfirmType={changePasswordConfirmType}
        password={password}
        handlePassword={handlePassword}
        isPassword={isPassword}
        passwordErrorMessage={passwordErrorMessage}
        passwordConfirm={passwordConfirm}
        handlePasswordConfirm={handlePasswordConfirm}
        isPasswordConfirm={isPasswordConfirm}
        passwordConfirmErrorMessage={passwordConfirmErrorMessage}
        noSpace={noSpace}
        reset={reset}
        signInMethod={signInMethod}
        resetPassword={resetPassword}
      />
      <ResetPasswordErrorModal
        error={error}
        showResetPasswordErrorModal={showResetPasswordErrorModal}
        handleCloseResetPasswordErrorModal={handleCloseResetPasswordErrorModal}
      />
      <CreateTweet
        showCreateTweetModal={showCreateTweetModal}
        isLoading={isLoading}
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
        handleShowCreatePhotoCropModal={handleShowCreatePhotoCropModal}
        handleCloseCreateTweetModal={handleCloseCreateTweetModal}
      />
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
      <CreateTweetDiscardModal
        showCreateTweetDiscardModal={showCreateTweetDiscardModal}
        handleCloseCreateTweetDiscardModal={handleCloseCreateTweetDiscardModal}
        handleCloseCreateTweetDiscardBothModal={
          handleCloseCreateTweetDiscardBothModal
        }
      />
      <CreateTweetSuccessModal
        showCreateTweetSuccessModal={showCreateTweetSuccessModal}
        handleCloseCreateTweetSuccessModal={handleCloseCreateTweetSuccessModal}
      />
      <CreateTweetErrorModal
        error={error}
        showCreateTweetErrorsModal={showCreateTweetErrorsModal}
        handleCloseCreateTweetErrorsModal={handleCloseCreateTweetErrorsModal}
      />
      <TweetDeleteSuccessModal
        showDeleteTweetSuccessModal={showDeleteTweetSuccessModal}
        handleCloseDeleteTweetSuccessModal={handleCloseDeleteTweetSuccessModal}
      />
      <ReplyDeleteSuccessModal
        showDeleteReplySuccessModal={showDeleteReplySuccessModal}
        handleCloseDeleteReplySuccessModal={handleCloseDeleteReplySuccessModal}
      />
    </Container>
  );
}
