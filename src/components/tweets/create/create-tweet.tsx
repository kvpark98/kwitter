import {
  FirestoreError,
  addDoc,
  collection,
  updateDoc,
} from "firebase/firestore";
import React, { useRef, useState } from "react";
import { auth, db, storage } from "../../../firebase";
import { FirebaseError } from "firebase/app";
import {
  StorageError,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import CreateTweetForm from "./create-tweet-form";

export default function CreateTweet() {
  const user = auth.currentUser;

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState(false);

  const [message, setMessage] = useState("");

  const [file, setFile] = useState<File | null>(null);

  const [isMessage, setIsMessage] = useState(false);

  const [tweetCreated, setTweetCreated] = useState(false);

  const [error, setError] = useState("");

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

    const { files } = event.currentTarget;

    if (files && files.length === 1) {
      const selectedFile = files[0];

      if (selectedFile.size <= 1024 * 1024) {
        setFile(selectedFile);
        setError("");
      } else {
        setFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        setError("size-exhausted");

        setTimeout(() => {
          setError("");
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

      // 트윗이 등록되었음을 표시
      setTweetCreated(true);

      // 트윗 등록 상태를 5초 후에 초기화
      setTimeout(() => {
        setTweetCreated(false);
      }, 5000);
    } catch (error) {
      // 에러 발생 시 트윗 등록 상태를 초기화
      setTweetCreated(false);

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
    <div className="w-100">
      <CreateTweetForm
        isLoading={isLoading}
        error={error}
        fileInputRef={fileInputRef}
        message={message}
        handleMessage={handleMessage}
        isMessage={isMessage}
        file={file}
        handleFile={handleFile}
        resetMessageButton={resetMessageButton}
        resetPhotoButton={resetPhotoButton}
        createTweet={createTweet}
        tweetCreated={tweetCreated}
      />
    </div>
  );
}
