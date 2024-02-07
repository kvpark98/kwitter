import { Card } from "react-bootstrap";
import { useState } from "react";
import { FirebaseError } from "firebase/app";
import { FirestoreError, deleteDoc, doc } from "firebase/firestore";
import { StorageError, deleteObject, ref } from "firebase/storage";
import { auth, db, storage } from "../../../../firebase";
import ModifyTweet from "../../modify/modify-tweet";
import TweetBody from "./tweet-body";
import TweetFooter from "./tweet-footer";
import TweetDeleteModal from "../../../modals/warning/tweet-delete-modal";

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

  const [showModifyModal, setShowModifyModal] = useState(false);
  const handleShowModifyModal = () => setShowModifyModal(true);
  const handleCloseModifyModal = () => setShowModifyModal(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleShowDeleteModal = () => setShowDeleteModal(true);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);

  const [showDeleteErrorsModal, setShowDeleteErrorsModal] = useState(false);
  const handleShowDeleteErrorsModal = () => {
    handleCloseDeleteModal();
    setShowDeleteErrorsModal(true);
  };
  const handleCloseDeleteErrorsModal = () => setShowDeleteErrorsModal(false);

  const [error, setError] = useState("");

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
      <Card
        {...(user?.uid === userId && { border: "success" })}
        className="mb-4"
      >
        <TweetBody message={message} photo={photo} username={username} />
        <TweetFooter
          user={user}
          timeAgo={timeAgo}
          userId={userId}
          handleShowModifyModal={handleShowModifyModal}
          handleShowDeleteModal={handleShowDeleteModal}
        />
      </Card>
      {showModifyModal && (
        <ModifyTweet
          id={id}
          message={message}
          photo={photo}
          showModifyModal={showModifyModal}
          handleCloseModifyModal={handleCloseModifyModal}
        />
      )}
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
