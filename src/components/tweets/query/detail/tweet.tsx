import { Card } from "react-bootstrap";
import { useState } from "react";
import { FirebaseError } from "firebase/app";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { auth, db, storage } from "../../../../firebase";
import ModifyTweet from "../../modify/modify-tweet";
import TweetBody from "./tweet-body";
import TweetFooter from "./tweet-footer";
import TweetDeleteModal from "../../../modals/delete/tweet-delete-modal";

export interface Tweet {
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
}: Tweet) {
  const user = auth.currentUser;

  const [isLoading, setIsLoading] = useState(false);

  const [showModifyModal, setShowModifyModal] = useState(false);
  const handleShowModifyModal = () => setShowModifyModal(true);
  const handleCloseModifyModal = () => setShowModifyModal(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleShowDeleteModal = () => setShowDeleteModal(true);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);

  const [error, setError] = useState("");

  // 트윗 삭제 함수
  const deleteTweet = async () => {
    if (isLoading || user?.uid !== userId) {
      return;
    }

    try {
      setIsLoading(true);

      // Firestore db에서 트윗 문서 삭제
      await deleteDoc(doc(db, "tweets", id));

      // 이미지가 있는 경우 Storage에서 이미지 삭제
      if (photo) {
        const photoRef = ref(storage, `tweets/${user.uid}/${id}`);
        await deleteObject(photoRef);
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError(error.code);
        console.log(error.code);
      }
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
        showDeleteModal={showDeleteModal}
        handleCloseDeleteModal={handleCloseDeleteModal}
        deleteTweet={deleteTweet}
      />
    </div>
  );
}
