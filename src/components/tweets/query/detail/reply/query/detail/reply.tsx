import { Card } from "react-bootstrap";
import { User } from "firebase/auth";
import ReplyBody from "./reply-body";
import { useRef, useState } from "react";
import {
  FirestoreError,
  addDoc,
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
import ModifyReply from "../../modify/modify-reply";
import ModifyReplyErrorModal from "../../../../../../modals/error/modify-reply-error-modal";
import ModifyReplyDiscardModal from "../../modify/modify-reply-discard-modal/modify-reply-discard-modal";
import ModifyReplySuccessModal from "../../../../../../modals/success/modify-reply-success-modal";
import ReplyFooter from "./reply-footer";

export interface IReply {
  id: string;
  timeAgo: string | undefined;
  tweetId: string;
  tweetUserId: string;
  reply: string;
  replyUserId: string;
  replyUsername: string;
  totalLikes: number;
}

export interface ReplyProps {
  user: User | null;
  id: string;
  timeAgo: string | undefined;
  tweetId: string;
  tweetUserId: string;
  reply: string;
  replyUserId: string;
  replyUsername: string;
  totalLikes: number;
  setIsReplyDeleted: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Reply({
  user,
  id,
  timeAgo,
  tweetId,
  tweetUserId,
  reply,
  replyUserId,
  replyUsername,
  totalLikes,
  setIsReplyDeleted,
}: ReplyProps) {
  const replyTextAreaRef = useRef<HTMLTextAreaElement>(null);

  const defaultAvatarURL = "/person-circle.svg";

  const [isLoading, setIsLoading] = useState(false);

  const [replyAvatar, setReplyAvatar] = useState(defaultAvatarURL);

  const [newReply, setNewReply] = useState(reply);

  const [isNewReply, setIsNewReply] = useState(true);

  const [likes, setLikes] = useState(totalLikes);

  const [isLike, setIsLike] = useState(false);

  const [error, setError] = useState("");

  const getLikes = async () => {
    const likeQuery = query(
      collection(db, "replyLikes"),
      where("likeUserId", "==", user?.uid),
      where("replyId", "==", id)
    );

    const likeSnapshot = await getDocs(likeQuery);
    if (!likeSnapshot.empty) {
      likeSnapshot.forEach(async (doc) => {
        const data = doc.data();
        setIsLike(data.isLike);
      });
    } else {
      setIsLike(false);
    }
  };

  getLikes();

  // debounce 함수: 주어진 시간 동안 이벤트를 무시하고, 마지막 호출만 실행하는 함수
  // debounce 함수는 연속적인 호출을 관리하고, 마지막 호출만 유효하게 처리할 수 있다. 따라서, 사용자가 빠르게 여러 번 클릭할 때 마지막 클릭만이 실제로 처리되어 예기치 않은 동작을 방지할 수 있다.
  function debounce(func: (...args: any[]) => void, wait: number) {
    let timeout: ReturnType<typeof setTimeout> | undefined; // 타이머를 저장할 변수

    // 반환된 함수는 실제로 호출되는 함수
    return function (...args: any[]) {
      // 나중에 실행될 함수 정의
      const later = () => {
        clearTimeout(timeout); // 기존 타이머 제거 (later 함수 내에서 clearTimeout(timeout)을 호출하는 것은 이전에 설정된 타이머가 있다면 그것을 취소하고, 새로운 타이머를 설정하는 것을 확실하게 하기 위한 안전장치이다. 이를 통해 debounce 함수가 예상대로 동작하고, 마지막 클릭만 처리될 수 있도록 보장한다.)
        func(...args); // 주어진 함수 실행 (실제 작업 수행)
      };

      clearTimeout(timeout); // 함수가 호출될 때마다 이전 타이머 제거
      timeout = setTimeout(later, wait); // 새로운 타이머 설정 (wait 밀리초 후 later 함수 실행)
      // clearTimeout(timeout)와 setTimeout(later, wait)는 debounce 함수에서 늘 함께 사용된다. 이 두 코드는 각 함수 호출 시 이전에 설정된 타이머를 취소하고, 새로운 타이머를 설정하여 마지막 클릭만을 처리할 수 있도록 보장한다. 이는 debounce 함수가 예상대로 동작하고, 원하는 기능을 제공할 수 있도록 핵심적인 역할을 한다.
    };
  }

  const handleLikes = async () => {
    try {
      const likeQuery = query(
        collection(db, "replyLikes"),
        where("likeUserId", "==", user?.uid),
        where("replyId", "==", id)
      );
      const likeSnapshot = await getDocs(likeQuery);

      if (isLike) {
        await updateDoc(doc(db, "replys", id), {
          totalLikes: likes - 1,
        });

        likeSnapshot.forEach(async (doc) => {
          await deleteDoc(doc.ref);
        });

        setIsLike(false);

        setLikes((current) => current - 1);
      } else {
        await updateDoc(doc(db, "replys", id), {
          totalLikes: likes + 1,
        });

        await addDoc(collection(db, "replyLikes"), {
          createdAt: Date.now(),
          isLike: true,
          tweetId: tweetId,
          tweetUserId: tweetUserId,
          replyId: id,
          replyUserId: replyUserId,
          likeUserId: user?.uid,
        });

        setIsLike(true);

        setLikes((current) => current + 1);
      }
    } catch (error) {
      console.error("Error handling likes: ", error);
    }
  };

  const debouncedHandleLikes = debounce(handleLikes, 300);

  const [showModifyReplyModal, setShowModifyReplyModal] = useState(false);
  const handleShowModifyReplyModal = () => {
    setShowModifyReplyModal(true);
  };
  const handleCloseModifyReplyModal = () => {
    if (replyTextAreaRef.current?.value !== reply) {
      handleShowModifyReplyDiscardModal();
    } else {
      setShowModifyReplyModal(false);
      resetReply();
    }
  };

  const handleCloseModifyReplyDiscardBothModal = () => {
    setShowModifyReplyModal(false);
    resetReply();
    setShowModifyReplyDiscardModal(false);
  };

  const [showModifyReplyDiscardModal, setShowModifyReplyDiscardModal] =
    useState(false);
  const handleShowModifyReplyDiscardModal = () =>
    setShowModifyReplyDiscardModal(true);
  const handleCloseModifyReplyDiscardModal = () =>
    setShowModifyReplyDiscardModal(false);

  const [showModifyReplySuccessModal, setShowModifyReplySuccessModal] =
    useState(false);
  const handleShowModifyReplySuccessModal = () => {
    setShowModifyReplyModal(false);
    setShowModifyReplySuccessModal(true);
  };
  const handleCloseModifyReplySuccessModal = () => {
    setShowModifyReplySuccessModal(false);
  };

  const [showModifyReplyErrorModal, setShowModifyReplyErrorModal] =
    useState(false);
  const handleShowModifyReplyErrorModal = () => {
    setShowModifyReplyModal(false);
    setShowModifyReplyErrorModal(true);
  };
  const handleCloseModifyReplyErrorModal = () => {
    setShowModifyReplyErrorModal(false);
    setError("");
    handleShowModifyReplyModal();
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

      handleShowModifyReplySuccessModal();
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

      handleShowModifyReplyErrorModal();
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

      const replyLikeQuery = query(
        collection(db, "replyLikes"),
        where("replyId", "==", id)
      );

      const replyLikeSnapshot = await getDocs(replyLikeQuery);
      replyLikeSnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });

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
        <ReplyFooter
          user={user}
          replyUserId={replyUserId}
          likes={likes}
          isLike={isLike}
          debouncedHandleLikes={debouncedHandleLikes}
        />
      </Card>
      <ModifyReply
        isLoading={isLoading}
        replyTextAreaRef={replyTextAreaRef}
        newReply={newReply}
        handleNewReply={handleNewReply}
        isNewReply={isNewReply}
        resetReply={resetReply}
        modifyReply={modifyReply}
        showModifyReplyModal={showModifyReplyModal}
        handleCloseModifyReplyModal={handleCloseModifyReplyModal}
      />
      <ModifyReplyDiscardModal
        showModifyReplyDiscardModal={showModifyReplyDiscardModal}
        handleCloseModifyReplyDiscardModal={handleCloseModifyReplyDiscardModal}
        handleCloseModifyReplyDiscardBothModal={
          handleCloseModifyReplyDiscardBothModal
        }
      />
      <ModifyReplySuccessModal
        showModifyReplySuccessModal={showModifyReplySuccessModal}
        handleCloseModifyReplySuccessModal={handleCloseModifyReplySuccessModal}
      />
      <ModifyReplyErrorModal
        error={error}
        showModifyReplyErrorModal={showModifyReplyErrorModal}
        handleCloseModifyReplyErrorModal={handleCloseModifyReplyErrorModal}
      />
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
