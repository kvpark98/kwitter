import { Card } from "react-bootstrap";
import { User } from "firebase/auth";
import ReplyBody from "./reply-body";
import { useRef, useState } from "react";
import {
  FirestoreError,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
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
  setIsReplyDeleted: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Reply({
  user,
  id,
  timeAgo,
  reply,
  replyUserId,
  replyUsername,
  setIsReplyDeleted,
}: ReplyProps) {
  const replyTextAreaRef = useRef<HTMLTextAreaElement>(null);

  const defaultAvatarURL = "/person-circle.svg";

  const [isLoading, setIsLoading] = useState(false);

  const [replyAvatar, setReplyAvatar] = useState(defaultAvatarURL);

  const [newReply, setNewReply] = useState("");

  const [isNewReply, setIsNewReply] = useState(true);

  const [error, setError] = useState("");

  const [showModifyReplyModal, setShowModifyReplyModal] = useState(false);
  const handleShowModifyReplyModal = () => {
    setShowModifyReplyModal(true);
  };
  const handleCloseModifyReplyModal = () => {
    setShowModifyReplyModal(false);
  };

  const [showDeleteReplyModal, setShowDeleteReplyModal] = useState(false);
  const handleShowDeleteReplyModal = () => setShowDeleteReplyModal(true);
  const handleCloseDeleteReplyModal = () => setShowDeleteReplyModal(false);

  const [showDeleteReplyErrorModal, setShowDeleteReplyErrorModal] =
    useState(false);
  const handleShowDeleteReplyErrorModal = () => {
    handleCloseDeleteReplyModal();
    setShowDeleteReplyErrorModal(true);
  };
  const handleCloseDeleteReplyErrorModal = () => {
    setShowDeleteReplyErrorModal(false);
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

  const handleNewReply = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.currentTarget.value;

    setNewReply(value);

    if (value.trim() !== "") {
      setIsNewReply(true);
    } else {
      setIsNewReply(false);
    }
  };

  const resetReply = () => {
    setNewReply(reply);
    setIsNewReply(true);
    if (replyTextAreaRef.current) {
      replyTextAreaRef.current.value = reply;
    }
  };

  const modifyReply = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isLoading || !isNewReply || newReply.length > 180 || !user) {
      return;
    }

    setError("");

    try {
      setIsLoading(true);

      await updateDoc(doc(db, "replys", id), {
        createdAt: Date.now(),
        reply: newReply,
        replyUsername: user.displayName,
      });
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

      resetReply();
    } finally {
      setIsLoading(false);
    }
  };

  const deleteReply = async () => {
    if (isLoading || user?.uid !== replyUserId) {
      return;
    }

    setError("");

    try {
      setIsLoading(true);

      await deleteDoc(doc(db, "replys", id));

      setIsReplyDeleted(true);
    } catch (error) {
      setIsReplyDeleted(false);

      if (error instanceof FirebaseError) {
        setError(error.code);
      } else if (error instanceof FirestoreError) {
        setError(error.code);
      } else if (error instanceof StorageError) {
        setError(error.code);
      } else {
        setError("size-exhausted");
      }

      handleShowDeleteReplyErrorModal();
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
          handleShowModifyReplyModal={handleShowModifyReplyModal}
          handleShowDeleteReplyModal={handleShowDeleteReplyModal}
        />
      </Card>
      <DeleteReplyWarningModal
        isLoading={isLoading}
        showDeleteReplyModal={showDeleteReplyModal}
        handleCloseDeleteReplyModal={handleCloseDeleteReplyModal}
        deleteReply={deleteReply}
      />
      <DeleteReplyErrorModal
        error={error}
        showDeleteReplyErrorModal={showDeleteReplyErrorModal}
        handleCloseDeleteReplyErrorModal={handleCloseDeleteReplyErrorModal}
      />
    </>
  );
}
