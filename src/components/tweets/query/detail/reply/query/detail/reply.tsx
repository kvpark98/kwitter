import { Card } from "react-bootstrap";
import { User } from "firebase/auth";
import ReplyBody from "./reply-body";
import { useState } from "react";
import {
  FirestoreError,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../../../../../../firebase";
import { FirebaseError } from "firebase/app";
import { StorageError } from "firebase/storage";
import DeleteReplyWarningModal from "../../../../../../modals/warning/delete-reply-warning-modal";
import DeleteReplyErrorModal from "../../../../../../modals/error/delete-reply-error-modal";

export interface IReply {
  id: string;
  timeAgo: string | undefined;
  reply: string;
  replyUserId: string;
  replyUsername: string;
  tweetId: string;
}

export interface ReplyProps {
  user: User | null;
  id: string;
  timeAgo: string | undefined;
  reply: string;
  replyUserId: string;
  replyUsername: string;
  handleShowReplyListModal: () => void;
  handleCloseReplyListModal: () => void;
}

export default function Reply({
  user,
  id,
  timeAgo,
  reply,
  replyUserId,
  replyUsername,
  handleShowReplyListModal,
  handleCloseReplyListModal,
}: ReplyProps) {
  const defaultAvatarURL = "/person-circle.svg";

  const [isLoading, setIsLoading] = useState(false);

  const [replyAvatar, setReplyAvatar] = useState(defaultAvatarURL);

  const [error, setError] = useState("");

  const [showReplyDeleteModal, setShowReplyDeleteModal] = useState(false);
  const handleShowReplyDeleteModal = () => {
    // handleCloseReplyListModal();
    setShowReplyDeleteModal(true);
  };
  const handleCloseReplyDeleteModal = () => {
    setShowReplyDeleteModal(false);
    // handleShowReplyListModal();
  };

  const [showReplyDeleteErrorModal, setShowReplyDeleteErrorModal] =
    useState(false);
  const handleShowReplyDeleteErrorModal = () => {
    handleCloseReplyDeleteModal();
    setShowReplyDeleteErrorModal(true);
  };
  const handleCloseReplyDeleteErrorModal = () => {
    setShowReplyDeleteErrorModal(false);
    // handleShowReplyListModal();
  };

  const getReplyAvatar = async () => {
    const replyAvatarQuery = query(
      collection(db, "avatars"),
      where("userId", "==", replyUserId)
    );

    const snapshot = await getDocs(replyAvatarQuery);
    snapshot.forEach(async (doc) => {
      const data = doc.data();
      setReplyAvatar(data.avatar);
    });
  };

  getReplyAvatar();

  const deleteReply = async () => {
    if (isLoading || user?.uid !== replyUserId) {
      return;
    }

    setError("");

    try {
      setIsLoading(true);

      await deleteDoc(doc(db, "replys", id));
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError(error.code);
      } else if (error instanceof FirestoreError) {
        setError(error.code);
      } else if (error instanceof StorageError) {
        setError(error.code);
      } else {
        setError("size-exhausted");
      }
      handleShowReplyDeleteErrorModal();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Card className="d-flex rounded-0 border border-0 border-bottom border-secondary-subtle">
        <ReplyBody
          user={user}
          replyAvatar={replyAvatar}
          timeAgo={timeAgo}
          reply={reply}
          replyUserId={replyUserId}
          replyUsername={replyUsername}
          handleShowReplyDeleteModal={handleShowReplyDeleteModal}
        />
      </Card>
      <DeleteReplyWarningModal
        isLoading={isLoading}
        showReplyDeleteModal={showReplyDeleteModal}
        handleCloseReplyDeleteModal={handleCloseReplyDeleteModal}
        deleteReply={deleteReply}
      />
      <DeleteReplyErrorModal
        error={error}
        showReplyDeleteErrorModal={showReplyDeleteErrorModal}
        handleCloseReplyDeleteErrorModal={handleCloseReplyDeleteErrorModal}
      />
    </>
  );
}
