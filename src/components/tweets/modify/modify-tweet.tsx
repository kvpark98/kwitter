import React, { useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { auth, db, storage } from "../../../firebase";
import { FirebaseError } from "firebase/app";
import {
  FirestoreError,
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
import ModifyTweetForm from "./modify-tweet-form";

export interface ModifyTweetProps {
  id: string;
  message: string;
  photo?: string;
  showModifyModal: boolean;
  handleCloseModifyModal: () => void;
}

export default function ModifyTweet({
  id,
  message,
  photo,
  showModifyModal,
  handleCloseModifyModal,
}: ModifyTweetProps) {
  const user = auth.currentUser;

  const newFileInputRef = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState(false);

  const [newMessage, setNewMessage] = useState(message);

  const [newFile, setNewFile] = useState<File | null>(null);

  const [isNewMessage, setIsNewMessage] = useState(true);

  const [tweetModified, setTweetModified] = useState(false);

  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>("");

  const [error, setError] = useState("");

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

  return (
    <Modal
      show={showModifyModal}
      onHide={handleCloseModifyModal}
      backdrop="static"
      keyboard={false}
      centered
    >
      <ModifyTweetForm
        isLoading={isLoading}
        error={error}
        newFileInputRef={newFileInputRef}
        newMessage={newMessage}
        handleNewMessage={handleNewMessage}
        isNewMessage={isNewMessage}
        handleNewFile={handleNewFile}
        photo={photo}
        imagePreviewUrl={imagePreviewUrl}
        resetMessageButton={resetMessageButton}
        resetPhotoButton={resetPhotoButton}
        deletePhoto={deletePhoto}
        modifyTweet={modifyTweet}
        tweetModified={tweetModified}
        handleCloseModifyModal={handleCloseModifyModal}
      />
    </Modal>
  );
}
