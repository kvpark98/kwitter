import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { auth, db, storage } from "../../../firebase";
import { FirebaseError } from "firebase/app";
import { deleteField, doc, updateDoc } from "firebase/firestore";
import {
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

  const newFileInputRef = React.createRef<HTMLInputElement>();

  const [isLoading, setIsLoading] = useState(false);

  const [newMessage, setNewMessage] = useState(message);

  const [newFile, setNewFile] = useState<File | null>(null);

  const [isNewMessage, setIsNewMessage] = useState(true);

  const [tweetModified, setTweetModified] = useState(false);

  const [deletePhotoClicked, setDeletePhotoClicked] = useState(false);

  const [error, setError] = useState("");

  const handleDeletePhotoClicked = () => {
    setDeletePhotoClicked((current) => !current);
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

    const { files } = event.currentTarget;

    if (files && files.length === 1) {
      const selectedFile = files[0];

      if (selectedFile.size <= 1024 * 1024) {
        setNewFile(selectedFile);
        setError("");
      } else {
        setNewFile(null);
        if (newFileInputRef.current) {
          newFileInputRef.current.value = "";
        }
        setError("size-exhausted");

        setTimeout(() => {
          setError("");
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
    if (newFileInputRef.current) {
      newFileInputRef.current.value = "";
    }
  };

  const resetPhotoButton = () => {
    resetPhotoSubmit();
    setError("");
    setTweetModified(false);
  };

  const modifyTweet = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isLoading || !isNewMessage || newMessage.length > 180 || !user) {
      return;
    }

    setError("");

    try {
      setIsLoading(true);

      // Firestore의 트윗 문서 업데이트
      await updateDoc(doc(db, "tweets", id), {
        message: newMessage,
        createdAt: Date.now(),
      });

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
          });
        } else {
          // 파일 크기가 1MB를 초과하면 에러 발생
          setNewFile(null);
          throw new Error("size-exhausted");
        }
      }

      // 기존 이미지만 삭제
      if (deletePhotoClicked) {
        await updateDoc(doc(db, "tweets", id), {
          photo: deleteField(),
        });

        const photoRef = ref(storage, `tweets/${user.uid}/${id}`);
        await deleteObject(photoRef);
      }

      // 트윗이 수정되었음을 표시
      setTweetModified(true);

      // 트윗 수정 상태를 5초 후에 초기화
      setTimeout(() => {
        setTweetModified(false);
      }, 5000);

      // 파일 상태를 초기화
      resetPhotoSubmit();
    } catch (error) {
      // 에러 발생 시 트윗 수정 상태를 초기화
      setTweetModified(false);

      if (error instanceof FirebaseError) {
        setError(error.code);
        console.log(error.code);
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
        newFile={newFile}
        handleNewFile={handleNewFile}
        photo={photo}
        deletePhotoClicked={deletePhotoClicked}
        handleDeletePhotoClicked={handleDeletePhotoClicked}
        resetMessageButton={resetMessageButton}
        resetPhotoButton={resetPhotoButton}
        modifyTweet={modifyTweet}
        tweetModified={tweetModified}
        handleCloseModifyModal={handleCloseModifyModal}
      />
    </Modal>
  );
}
