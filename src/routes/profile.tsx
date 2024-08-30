import { auth, db, storage } from "../firebase";
import { useCallback, useEffect, useRef, useState } from "react";
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
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import ProfileContent from "../components/profile/profile-content";
import { ITweet } from "../components/tweets/query/detail/tweet";
import { Container } from "react-bootstrap";
import CropAvatarModal from "../components/profile/crop-modal/avatar/crop-avatar-modal";
import CropBackgroundModal from "../components/profile/crop-modal/background/crop-background-modal";
import ModifyProfile from "../components/profile/modify-profile/modify/modify-profile";
import ModifyProfileDiscardModal from "../components/profile/discard-modal/modify-profile-discard-modal";
import ModifyProfileErrorModal from "../components/modals/error/modify-profile-error-modal";
import ModifyProfileSuccessModal from "../components/modals/success/modify-profile-success-modal";
import { debounce } from "lodash";
import { IReply } from "../components/tweets/query/detail/reply/query/detail/reply";
import TweetDeleteSuccessModal from "../components/modals/success/tweet-delete-success-modal";
import ReplyDeleteSuccessModal from "../components/modals/success/reply-delete-success-modal";

// CroppedAreaPixels 타입 정의: 이미지 자르기 위치를 표현하는 객체의 타입
export type CroppedAreaPixels = {
  x: number; // 잘린 영역의 x 좌표
  y: number; // 잘린 영역의 y 좌표
  width: number; // 잘린 영역의 너비
  height: number; // 잘린 영역의 높이
};

export default function Profile() {
  const user = auth.currentUser!;

  const defaultAvatarURL = "/person-circle.svg";
  const defaultBackgroundURL = "/default-background.png";

  const nameInputRef = useRef<HTMLInputElement>(null);

  const avatarInputRef = useRef<HTMLInputElement>(null);

  const backgroundInputRef = useRef<HTMLInputElement>(null);

  const avatarImageRef = useRef<HTMLImageElement>(null);

  const backgroundImageRef = useRef<HTMLImageElement>(null);

  const [avatarDeleteButtonClicked, setAvatarDeleteButtonClicked] =
    useState(false);

  const [backgroundDeleteButtonClicked, setBackgroundDeleteButtonClicked] =
    useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState(user?.displayName);

  const [isName, setIsName] = useState(true);

  const [avatar, setAvatar] = useState(user?.photoURL || defaultAvatarURL);

  const [background, setBackground] = useState(defaultBackgroundURL);

  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const [backgroundFile, setBackgroundFile] = useState<File | null>(null);

  const [avatarImagePreviewUrl, setAvatarImagePreviewUrl] =
    useState<string>("");

  const [backgroundImagePreviewUrl, setBackgroundImagePreviewUrl] =
    useState<string>("");

  const [tweets, setTweets] = useState<ITweet[]>([]);

  const [replys, setReplys] = useState<IReply[]>([]);

  const [error, setError] = useState("");

  const [nameErrorMessage, setNameErrorMessage] = useState("");

  const [isTweetDeleted, setIsTweetDeleted] = useState(false);

  const [isReplyDeleted, setIsReplyDeleted] = useState(false);

  const [sortCriteria, setSortCriteria] = useState("Date");

  const handleSortCriteria = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSortCriteria(event.currentTarget.innerText);
  };

  const resetCriteria = () => {
    setSortCriteria("Date");
    setSortOrder(true);
  };

  const [sortOrder, setSortOrder] = useState(true);

  const handleSortOrder = () => {
    setSortOrder((current) => !current);
  };

  const [isTweetActive, setIsTweetActive] = useState(true);

  const handleTweetActive = () => {
    setIsTweetActive(true);
    setSortCriteria("Date");
    setSortOrder(true);
  };

  const handleReplyActive = () => {
    setIsTweetActive(false);
    setSortCriteria("Date");
    setSortOrder(true);
  };

  const [showModifyProfileModal, setShowModifyProfileModal] = useState(false);
  const handleShowModifyProfileModal = () => {
    setShowModifyProfileModal(true);
  };
  const handleCloseModifyProfileModal = () => {
    if (
      avatarImagePreviewUrl ||
      backgroundImagePreviewUrl ||
      avatarDeleteButtonClicked ||
      backgroundDeleteButtonClicked ||
      user?.displayName !== nameInputRef.current?.value
    ) {
      handleShowModifyProfileDiscardModal();
    } else {
      setShowModifyProfileModal(false);
      resetName();
      resetAvatar();
      resetBackground();
      setZoom(1);
      setAvatarDeleteButtonClicked(false);
      setBackgroundDeleteButtonClicked(false);
      setShowModifyProfileDiscardModal(false);
    }
  };

  const handleCloseModifyProfileDiscardBothModal = () => {
    setShowModifyProfileModal(false);
    resetName();
    resetAvatar();
    resetBackground();
    setZoom(1);
    setAvatarDeleteButtonClicked(false);
    setBackgroundDeleteButtonClicked(false);
    setShowModifyProfileDiscardModal(false);
  };

  const [showModifyProfileDiscardModal, setShowModifyProfileDiscardModal] =
    useState(false);
  const handleShowModifyProfileDiscardModal = () => {
    setShowModifyProfileDiscardModal(true);
  };
  const handleCloseModifyProfileDiscardModal = () => {
    setShowModifyProfileDiscardModal(false);
  };

  const [showModifyProfileSuccessModal, setShowModifyProfileSuccessModal] =
    useState(false);
  const handleShowModifyProfileSuccessModal = () => {
    handleCloseModifyProfileDiscardBothModal();
    setShowModifyProfileSuccessModal(true);
  };
  const handleCloseModifyProfileSuccessModal = () => {
    setShowModifyProfileSuccessModal(false);
  };

  const [showModifyProfileErrorsModal, setShowModifyProfileErrorsModal] =
    useState(false);
  const handleShowModifyProfileErrorsModal = () => {
    setShowModifyProfileModal(false);
    setShowModifyProfileErrorsModal(true);
  };
  const handleCloseModifyProfileErrorsModal = () => {
    setShowModifyProfileErrorsModal(false);
    setError("");
    handleShowModifyProfileModal();
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

  useEffect(() => {
    if (isTweetDeleted) {
      handleShowDeleteTweetSuccessModal();
    }
    if (isReplyDeleted) {
      handleShowDeleteReplySuccessModal();
    }
  }, [isTweetDeleted, isReplyDeleted]);

  const [crop, setCrop] = useState({ x: 0, y: 0 }); // 이미지 자르는 위치

  const [zoom, setZoom] = useState(1); // 이미지 확대/축소

  const [croppedAreaPixels, setCroppedAreaPixels] =
    useState<CroppedAreaPixels | null>(null); // 잘린 이미지 정보

  const [showAvatarCropModal, setShowAvatarCropModal] = useState(false);
  const handleShowAvatarCropModal = () => setShowAvatarCropModal(true);
  const handleCloseAvatarCropModal = () => {
    setShowAvatarCropModal(false);
    setShowModifyProfileModal(true);
    resetAvatar();
    setZoom(1);
  };

  const [showBackgroundCropModal, setShowBackgroundCropModal] = useState(false);
  const handleShowBackgroundCropModal = () => setShowBackgroundCropModal(true);
  const handleCloseBackgroundCropModal = () => {
    setShowBackgroundCropModal(false);
    setShowModifyProfileModal(true);
    resetBackground();
    setZoom(1);
  };

  // 이미지 자르기가 완료되었을 때 호출되는 콜백 함수
  const onCropComplete = (
    croppedArea: CroppedAreaPixels, // 자른 영역의 정보
    croppedAreaPixels: CroppedAreaPixels // 자른 영역의 픽셀 정보
  ) => {
    // 자른 영역의 픽셀 정보를 상태로 설정
    setCroppedAreaPixels(croppedAreaPixels);
    console.log(croppedArea);
  };

  const handleSaveCroppedAvatar = () => {
    // 잘린 이미지 정보와 파일이 존재하는지 확인
    if (!croppedAreaPixels || !avatarFile) return;

    // Canvas 엘리먼트 생성 및 그래픽 컨텍스트 가져오기
    const canvas = document.createElement("canvas"); // canvas = 도화지
    const ctx = canvas.getContext("2d"); // Context = 화가
    if (!ctx) return;

    // 이미지 객체 생성 및 소스 설정
    const image = new Image(); // 새 이미지 객체를 생성
    image.src = avatarImagePreviewUrl; // avatarImagePreviewUrl를 새 이미지 객체에 복사하여 붙여넣기

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

      setAvatarImagePreviewUrl(croppedImageDataURL); // 잘린 이미지 (복사본) 미리 보기 가능

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
      setAvatarFile(croppedFile);

      setZoom(1);

      setShowAvatarCropModal(false);
      setShowModifyProfileModal(true);
    };
  };

  const handleSaveCroppedBackground = () => {
    // 잘린 이미지 정보와 파일이 존재하는지 확인
    if (!croppedAreaPixels || !backgroundFile) return;

    // Canvas 엘리먼트 생성 및 그래픽 컨텍스트 가져오기
    const canvas = document.createElement("canvas"); // canvas = 도화지
    const ctx = canvas.getContext("2d"); // Context = 화가
    if (!ctx) return;

    // 이미지 객체 생성 및 소스 설정
    const image = new Image(); // 새 이미지 객체를 생성
    image.src = backgroundImagePreviewUrl; // backgroundImagePreviewUrl를 새 이미지 객체에 복사하여 붙여넣기

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

      setBackgroundImagePreviewUrl(croppedImageDataURL); // 잘린 이미지 (복사본) 미리 보기 가능

      // 데이터 URL을 Blob 객체로 변환
      const byteCharacters = atob(croppedImageDataURL.split(",")[1]);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "image/jpeg" });

      // Blob 객체를 File 객체로 변환 (Blob은 File 객체에 포함되는 개념)
      const croppedFile = new File([blob], "cropped-background.jpeg", {
        type: "image/jpeg",
      });

      // 잘린 이미지 파일 업데이트
      setBackgroundFile(croppedFile);

      setZoom(1);

      setShowBackgroundCropModal(false);
      setShowModifyProfileModal(true);
    };
  };

  const checkUsername = async (username: string) => {
    const usernameQuery = query(
      collection(db, "users"),
      where("username", "==", username)
    );
    const usernameSnapshot = await getDocs(usernameQuery);

    if (!usernameSnapshot.empty) {
      if (user.displayName === username) {
        setNameErrorMessage("");
        setIsName(true);
        nameInputRef.current?.classList.remove("form-control-invalid");
      } else {
        setNameErrorMessage("This username is already in use.");
        setIsName(false);
        nameInputRef.current?.classList.add("form-control-invalid");
      }
    } else {
      setIsName(true);
      nameInputRef.current?.classList.remove("form-control-invalid");
    }
  };

  const debouncedCheckUsername = useCallback(
    debounce((username) => {
      checkUsername(username);
    }, 10),
    []
  );

  const handleName = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    const regName =
      /^(?=.*[가-힣a-zA-Z])[가-힣a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-]{1,20}$/;

    const trimmedValue = value.replace(/\s/gi, "");
    setName(trimmedValue);

    if (trimmedValue !== "") {
      if (!regName.test(trimmedValue)) {
        setNameErrorMessage(
          "Please enter 1 to 20 characters, including at least one letter in English or Korean. Numbers and special characters are allowed."
        );
        setIsName(false);

        nameInputRef.current?.classList.add("form-control-invalid");
      } else {
        debouncedCheckUsername(trimmedValue);
      }
    } else {
      setNameErrorMessage("");
      setIsName(false);

      nameInputRef.current?.classList.remove("form-control-invalid");
    }
  };

  const handleAvatarImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.currentTarget; // 이벤트에서 파일 목록을 가져오기

    // 파일이 존재하고 하나만 선택된 경우
    if (files && files.length === 1) {
      const selectedFile = files[0]; // 첫 번째 선택된 파일

      // 파일 크기가 1MB 이하인 경우
      if (selectedFile.size <= 1024 * 1024) {
        setShowModifyProfileModal(false);
        handleShowAvatarCropModal();

        const reader = new FileReader(); // FileReader 객체를 생성

        // 파일을 읽은 후
        reader.onload = () => {
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

        handleShowModifyProfileErrorsModal();
      }
    }
  };

  const handleBackgroundImage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { files } = event.currentTarget; // 이벤트에서 파일 목록을 가져오기

    // 파일이 존재하고 하나만 선택된 경우
    if (files && files.length === 1) {
      const selectedFile = files[0]; // 첫 번째 선택된 파일

      // 파일 크기가 1MB 이하인 경우
      if (selectedFile.size <= 1024 * 1024) {
        setShowModifyProfileModal(false);
        handleShowBackgroundCropModal();

        const reader = new FileReader(); // FileReader 객체를 생성

        // 파일을 읽은 후
        reader.onload = () => {
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

        handleShowModifyProfileErrorsModal();
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

  const handleDeleteAvatar = () => {
    setAvatarDeleteButtonClicked(true);

    if (avatarImageRef.current) {
      avatarImageRef.current.src = defaultAvatarURL;
    }
  };

  const handleDeleteBackground = () => {
    setBackgroundDeleteButtonClicked(true);

    if (backgroundImageRef.current) {
      backgroundImageRef.current.src = defaultBackgroundURL;
    }
  };

  const modifyProfile = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isLoading || !isName) {
      return;
    }

    setError("");

    try {
      setIsLoading(true);

      if (avatar === defaultAvatarURL && avatarImagePreviewUrl) {
        await addDoc(collection(db, "avatars"), {
          createdAt: Date.now(),
          username: user?.displayName || "Anonymous",
          userId: user?.uid,
        });
      }

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

          // 파일 인풋 리셋
          if (avatarInputRef.current) {
            avatarInputRef.current.value = "";
          }

          // 사용자 프로필 업데이트
          await updateProfile(user!, {
            photoURL: avatarUrl,
          });

          const avatarQuery = query(
            collection(db, "avatars"),
            where("userId", "==", user?.uid)
          );

          const snapshot = await getDocs(avatarQuery);
          snapshot.forEach(async (doc) => {
            await updateDoc(doc.ref, { avatar: avatarUrl });
          });
        }
      }

      if (background === defaultBackgroundURL && backgroundImagePreviewUrl) {
        await addDoc(collection(db, "backgrounds"), {
          createdAt: Date.now(),
          username: user?.displayName || "Anonymous",
          userId: user?.uid,
        });
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

          const backgroundQuery = query(
            collection(db, "backgrounds"),
            where("userId", "==", user?.uid)
          );

          const snapshot = await getDocs(backgroundQuery);
          snapshot.forEach(async (doc) => {
            await updateDoc(doc.ref, { background: backgroundUrl });
          });
        }
      }

      if (avatarDeleteButtonClicked && !avatarImagePreviewUrl) {
        if (avatarInputRef.current) {
          avatarInputRef.current.value = "";
        }

        const locationRef = ref(storage, `avatars/${user?.uid}`);
        await deleteObject(locationRef);

        const avatarQuery = query(
          collection(db, "avatars"),
          where("userId", "==", user?.uid)
        );

        const snapshot = await getDocs(avatarQuery);
        snapshot.forEach(async (doc) => {
          await deleteDoc(doc.ref);
        });

        setAvatar(defaultAvatarURL);

        // 사용자 프로필 업데이트
        await updateProfile(user!, {
          photoURL: defaultAvatarURL,
        });
      }

      if (backgroundDeleteButtonClicked && !backgroundImagePreviewUrl) {
        if (backgroundInputRef.current) {
          backgroundInputRef.current.value = "";
        }

        const locationRef = ref(storage, `backgrounds/${user?.uid}`);
        await deleteObject(locationRef);

        const backgroundQuery = query(
          collection(db, "backgrounds"),
          where("userId", "==", user?.uid)
        );

        const snapshot = await getDocs(backgroundQuery);
        snapshot.forEach(async (doc) => {
          await deleteDoc(doc.ref);
        });

        setBackground(defaultBackgroundURL);
      }

      await updateProfile(auth.currentUser!, {
        displayName: name,
      });

      const usernameQuery = query(
        collection(db, "users"),
        where("userId", "==", user?.uid)
      );

      const usernameSnapshot = await getDocs(usernameQuery);
      usernameSnapshot.forEach(async (doc) => {
        await updateDoc(doc.ref, { username: name });
      });

      const usernameTweetQuery = query(
        collection(db, "tweets"),
        where("tweetUserId", "==", user?.uid)
      );

      const usernameTweetSnapshot = await getDocs(usernameTweetQuery);
      usernameTweetSnapshot.forEach(async (doc) => {
        await updateDoc(doc.ref, { tweetUsername: name });
      });

      const usernameReplyQuery = query(
        collection(db, "replys"),
        where("replyUserId", "==", user?.uid)
      );

      const usernameReplySnapshot = await getDocs(usernameReplyQuery);
      usernameReplySnapshot.forEach(async (doc) => {
        await updateDoc(doc.ref, { replyUsername: name });
      });

      const avatarQuery = query(
        collection(db, "avatars"),
        where("userId", "==", user?.uid)
      );

      const avatarSnapshot = await getDocs(avatarQuery);
      avatarSnapshot.forEach(async (doc) => {
        await updateDoc(doc.ref, { username: name });
      });

      const backgroundQuery = query(
        collection(db, "backgrounds"),
        where("userId", "==", user?.uid)
      );

      const backgroundSnapshot = await getDocs(backgroundQuery);
      backgroundSnapshot.forEach(async (doc) => {
        await updateDoc(doc.ref, { username: name });
      });

      resetName();
      resetAvatar();
      resetBackground();

      setAvatarDeleteButtonClicked(false);
      setBackgroundDeleteButtonClicked(false);

      handleShowModifyProfileSuccessModal();
    } catch (error) {
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
      } else if (error instanceof FirestoreError) {
        setError(error.code);
      } else if (error instanceof StorageError) {
        setError(error.code);
      } else {
        setError("size-exhausted");
      }

      setAvatarDeleteButtonClicked(false);
      setBackgroundDeleteButtonClicked(false);

      handleShowModifyProfileErrorsModal();
    } finally {
      setIsLoading(false);
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
    // Firestore 구독을 위한 변수 선언
    let unsubscribe: Unsubscribe | null = null;

    // 사용자의 트윗을 가져오는 함수 정의
    const fetchUserTweets = async () => {
      const getOrderByField = (sortCriteria: string): string => {
        switch (sortCriteria) {
          case "Replys":
            return "totalReplys";
          case "Likes":
            return "totalLikes";
          case "Date":
          default:
            return "createdAt";
        }
      };

      const orderByField = getOrderByField(sortCriteria);
      const orderDirection = sortOrder ? "desc" : "asc";

      // Firestore 쿼리 생성
      const tweetQuery = query(
        collection(db, "tweets"),
        where("tweetUserId", "==", user?.uid),
        orderBy(orderByField, orderDirection)
      );

      // 실시간 업데이트를 수신하기 위해 onSnapshot 이벤트 리스너 등록
      unsubscribe = onSnapshot(tweetQuery, (snapshot) => {
        // 스냅샷을 tweet 배열로 변환
        const tweets = snapshot.docs.map((doc) => {
          // Firestore 문서에서 필요한 데이터 추출
          const {
            createdAt,
            message,
            photo,
            tweetUserId,
            tweetUsername,
            totalReplys,
            totalLikes,
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
            totalReplys,
            totalLikes,
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
  }, [sortCriteria, sortOrder]);

  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;

    const fetchUserReplys = async () => {
      const getOrderByField = (sortCriteria: string): string => {
        switch (sortCriteria) {
          case "Likes":
            return "totalLikes";
          case "Date":
          default:
            return "createdAt";
        }
      };

      const orderByField = getOrderByField(sortCriteria);
      const orderDirection = sortOrder ? "desc" : "asc";

      const replyQuery = query(
        collection(db, "replys"),
        where("replyUserId", "==", user?.uid),
        orderBy(orderByField, orderDirection)
      );

      unsubscribe = onSnapshot(replyQuery, (snapshot) => {
        const replys = snapshot.docs.map((doc) => {
          const {
            createdAt,
            tweetId,
            tweetUserId,
            reply,
            replyUserId,
            replyUsername,
            totalLikes,
          } = doc.data();

          return {
            id: doc.id,
            timeAgo: formatTimeAgo(createdAt),
            createdAt,
            tweetId,
            tweetUserId,
            reply,
            replyUserId,
            replyUsername,
            totalLikes,
          };
        });
        setReplys(replys);
      });
    };

    fetchUserReplys();

    return () => {
      unsubscribe && unsubscribe();
    };
  }, [sortCriteria, sortOrder]);

  // 컴포넌트가 마운트될 때 background 가져오기
  useEffect(() => {
    // Firestore 구독을 위한 변수 선언
    let unsubscribe: Unsubscribe | null = null;

    // 사용자의 background를 가져오는 함수 정의
    const fetchUserBackground = async () => {
      // Firestore 쿼리 생성
      const backgroundQuery = query(
        collection(db, "backgrounds"),
        where("userId", "==", user?.uid)
      );

      // 실시간 업데이트를 수신하기 위해 onSnapshot 이벤트 리스너 등록
      unsubscribe = onSnapshot(backgroundQuery, (snapshot) => {
        if (!snapshot.empty) {
          // 스냅샷이 비어있지 않은지 확인
          // 첫 번째 문서만 추출
          const firstDoc = snapshot.docs[0];

          // Firestore 문서에서 필요한 데이터 추출
          const { background } = firstDoc.data();

          // 상태 업데이트
          setBackground(background);
        }
      });
    };

    // fetchUserBackground 함수 호출
    fetchUserBackground();

    // 컴포넌트가 언마운트될 때 Firestore 구독 해제
    return () => {
      unsubscribe && unsubscribe(); // 구독이 존재하면 해제
    };
  }, []);

  return (
    <>
      <Container fluid className="d-flex justify-content-center h-100 p-0">
        <ProfileContent
          user={user}
          avatar={avatar}
          background={background}
          handleShowModifyProfileModal={handleShowModifyProfileModal}
          isTweetActive={isTweetActive}
          handleTweetActive={handleTweetActive}
          handleReplyActive={handleReplyActive}
          tweets={tweets}
          replys={replys}
          sortCriteria={sortCriteria}
          handleSortCriteria={handleSortCriteria}
          sortOrder={sortOrder}
          handleSortOrder={handleSortOrder}
          resetCriteria={resetCriteria}
          setIsTweetDeleted={setIsTweetDeleted}
          setIsReplyDeleted={setIsReplyDeleted}
        />
      </Container>
      <ModifyProfile
        defaultAvatarURL={defaultAvatarURL}
        defaultBackgroundURL={defaultBackgroundURL}
        nameInputRef={nameInputRef}
        avatarInputRef={avatarInputRef}
        backgroundInputRef={backgroundInputRef}
        avatarImageRef={avatarImageRef}
        backgroundImageRef={backgroundImageRef}
        isLoading={isLoading}
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
        avatarDeleteButtonClicked={avatarDeleteButtonClicked}
        backgroundDeleteButtonClicked={backgroundDeleteButtonClicked}
        noSpace={noSpace}
        resetName={resetName}
        resetAvatar={resetAvatar}
        resetBackground={resetBackground}
        modifyProfile={modifyProfile}
        showModifyProfileModal={showModifyProfileModal}
        handleCloseModifyProfileModal={handleCloseModifyProfileModal}
        handleDeleteAvatar={handleDeleteAvatar}
        handleDeleteBackground={handleDeleteBackground}
      />
      <CropAvatarModal
        showAvatarCropModal={showAvatarCropModal}
        handleCloseAvatarCropModal={handleCloseAvatarCropModal}
        avatarImagePreviewUrl={avatarImagePreviewUrl}
        crop={crop}
        setCrop={setCrop}
        zoom={zoom}
        setZoom={setZoom}
        onCropComplete={onCropComplete}
        handleSaveCroppedAvatar={handleSaveCroppedAvatar}
      />
      <CropBackgroundModal
        showBackgroundCropModal={showBackgroundCropModal}
        handleCloseBackgroundCropModal={handleCloseBackgroundCropModal}
        backgroundImagePreviewUrl={backgroundImagePreviewUrl}
        crop={crop}
        setCrop={setCrop}
        zoom={zoom}
        setZoom={setZoom}
        onCropComplete={onCropComplete}
        handleSaveCroppedBackground={handleSaveCroppedBackground}
      />
      <ModifyProfileDiscardModal
        showModifyProfileDiscardModal={showModifyProfileDiscardModal}
        handleCloseModifyProfileDiscardModal={
          handleCloseModifyProfileDiscardModal
        }
        handleCloseModifyProfileDiscardBothModal={
          handleCloseModifyProfileDiscardBothModal
        }
      />
      <ModifyProfileSuccessModal
        showModifyProfileSuccessModal={showModifyProfileSuccessModal}
        handleCloseModifyProfileSuccessModal={
          handleCloseModifyProfileSuccessModal
        }
      />
      <TweetDeleteSuccessModal
        showDeleteTweetSuccessModal={showDeleteTweetSuccessModal}
        handleCloseDeleteTweetSuccessModal={handleCloseDeleteTweetSuccessModal}
      />
      <ReplyDeleteSuccessModal
        showDeleteReplySuccessModal={showDeleteReplySuccessModal}
        handleCloseDeleteReplySuccessModal={handleCloseDeleteReplySuccessModal}
      />
      {error && (
        <ModifyProfileErrorModal
          error={error}
          showModifyProfileErrorsModal={showModifyProfileErrorsModal}
          handleCloseModifyProfileErrorsModal={
            handleCloseModifyProfileErrorsModal
          }
        />
      )}
    </>
  );
}
