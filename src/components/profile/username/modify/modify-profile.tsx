import { useEffect, useRef, useState } from "react";
import { FirebaseError } from "firebase/app";
import { updateProfile } from "firebase/auth";
import { auth } from "../../../../firebase";
import ChangeUsernameForm from "./change-username-form";
import { Modal } from "react-bootstrap";

export interface ChangeUsernameProps {
  showModifyModal: boolean;
  setShowModifyModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ModifyProfile({
  showModifyModal,
  setShowModifyModal,
}: ChangeUsernameProps) {
  const user = auth.currentUser;

  const nameInputRef = useRef<HTMLInputElement>(null);

  const avatarInputRef = useRef<HTMLInputElement>(null);

  const backgroundInputRef = useRef<HTMLInputElement>(null);

  const handleCloseModifyModal = () => {
    setShowModifyModal(false);
    reset();
  };

  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState(user?.displayName);

  const [isName, setIsName] = useState(true);

  const [avatar, setAvatar] = useState(user?.photoURL);

  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const [backgroundFile, setBackgroundFile] = useState<File | null>(null);

  const [avatarImagePreviewUrl, setAvatarImagePreviewUrl] =
    useState<string>("");

  const [backgroundImagePreviewUrl, setBackgroundImagePreviewUrl] =
    useState<string>("");

  const [isProfileModified, setIsProfileModified] = useState(false);

  const [error, setError] = useState("");

  const [nameErrorMessage, setNameErrorMessage] = useState("");

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

  const reset = () => {
    setName(user?.displayName);

    setIsName(true);

    setNameErrorMessage("");

    nameInputRef.current?.classList.remove("form-control-invalid");
  };

  useEffect(() => {
    window.localStorage.removeItem("error");
  }, []);

  const changeName = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isLoading || !isName) {
      return;
    }

    setError("");

    try {
      setIsLoading(true);

      await updateProfile(auth.currentUser!, {
        displayName: name,
      });

      setIsProfileModified(true);

      reset();

      setTimeout(() => {
        setIsProfileModified(false);
      }, 5000);
    } catch (error) {
      setIsProfileModified(false);

      if (error instanceof FirebaseError) {
        setError(error.code);
        console.log("FirebaseError", error.code);
      }

      setTimeout(() => {
        setError("");
      }, 5000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      show={showModifyModal}
      onHide={handleCloseModifyModal}
      backdrop="static"
      keyboard={false}
      centered
    >
      <ChangeUsernameForm
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
        avatarFile={avatarFile}
        avatarImagePreviewUrl={avatarImagePreviewUrl}
        handleAvatarImage={handleAvatarImage}
        backgroundFile={backgroundFile}
        backgroundImagePreviewUrl={backgroundImagePreviewUrl}
        handleBackgroundImage={handleBackgroundImage}
        noSpace={noSpace}
        reset={reset}
        changeName={changeName}
        isProfileModified={isProfileModified}
        handleCloseModifyModal={handleCloseModifyModal}
      />
    </Modal>
  );
}
