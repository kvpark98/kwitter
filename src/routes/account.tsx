import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import {
  EmailAuthProvider,
  deleteUser,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { Container } from "react-bootstrap";
import ScrollProfile from "../components/scrolls/scrollProfile";
import AccountContent from "../components/account/account-content";
import ChangePassword from "../components/account/change-password/change-password";
import DeleteAccount from "../components/account/delete-account/delete-account";
import AccountHeader from "../components/account/account-header";
import SideBar from "../components/sidebar/side-bar";
import { StorageError, deleteObject, ref } from "firebase/storage";
import {
  FirestoreError,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { ITweet } from "../components/tweets/query/detail/tweet";
import ChangePasswordErrorModal from "../components/modals/error/change-password-error-modal";
import DeleteAccountErrorModal from "../components/modals/error/delete-account-error-modal";

export interface ILike {
  id: string;
  createdAt: string;
  isLike: boolean;
  likeUserId: string;
  tweetId: string;
  tweetUserId: string;
}

export default function Account() {
  const user = auth.currentUser;

  const newPasswordInputRef = useRef<HTMLInputElement>(null);
  const newPasswordConfirmInputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const [tweets, setTweets] = useState<ITweet[]>([]);
  const [avatar, setAvatar] = useState("");
  const [background, setBackground] = useState("");
  // const [likes, setLikes] = useState<ILike[]>([]);

  useEffect(() => {
    const getTweets = async () => {
      const tweetQuery = query(
        collection(db, "tweets"),
        where("tweetUserId", "==", user?.uid)
      );

      const tweetSnapshot = await getDocs(tweetQuery);
      const tweets = tweetSnapshot.docs.map((doc) => {
        const {
          createdAt,
          message,
          photo,
          tweetUserId,
          tweetUsername,
          totalLikes,
        } = doc.data();

        return {
          id: doc.id,
          createdAt,
          message,
          photo,
          tweetUserId,
          tweetUsername,
          totalLikes,
        };
      });
      setTweets(tweets);
    };

    getTweets();

    const getAvatar = async () => {
      const avatarQuery = query(
        collection(db, "avatars"),
        where("userId", "==", user?.uid)
      );

      const avatarSnapshot = await getDocs(avatarQuery);
      avatarSnapshot.forEach(async (doc) => {
        const data = doc.data();
        setAvatar(data.avatar);
      });
    };

    getAvatar();

    const getBackground = async () => {
      const backgroundQuery = query(
        collection(db, "backgrounds"),
        where("userId", "==", user?.uid)
      );

      const backgroundSnapshot = await getDocs(backgroundQuery);
      backgroundSnapshot.forEach(async (doc) => {
        const data = doc.data();
        setBackground(data.background);
      });
    };

    getBackground();

    // const getLikes = async () => {
    //   const likeQuery = query(
    //     collection(db, "likes"),
    //     where("likeUserId", "==", user?.uid)
    //   );

    //   const likeSnapshot = await getDocs(likeQuery);
    //   const likes = likeSnapshot.docs.map((doc) => {
    //     const { createdAt, isLike, likeUserId, tweetId, tweetUserId } =
    //       doc.data();

    //     return {
    //       id: doc.id,
    //       createdAt,
    //       isLike,
    //       likeUserId,
    //       tweetId,
    //       tweetUserId,
    //     };
    //   });
    //   setLikes(likes);
    // };

    // getLikes();
  }, []);

  const [isLoading, setIsLoading] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");

  const [isCurrentPassword, setIsCurrentPassword] = useState(false);
  const [isNewPassword, setIsNewPassword] = useState(false);
  const [isNewPasswordConfirm, setIsNewPasswordConfirm] = useState(false);

  const [dataRemovalChecked, setDataRemovalChecked] = useState(false);

  const [contentRetentionChecked, setContentRetentionChecked] = useState(false);

  const [rejoiningChecked, setRejoiningChecked] = useState(false);

  const [considerationChecked, setConsiderationChecked] = useState(false);

  const [allChecked, setAllChecked] = useState(false);

  const [deletePassword, setDeletePassword] = useState("");

  const [isDeletePassword, setIsDeletePassword] = useState(false);

  const [error, setError] = useState("");

  const [newPasswordErrorMessage, setNewPasswordErrorMessage] = useState("");
  const [newPasswordConfirmErrorMessage, setNewPasswordConfirmErrorMessage] =
    useState("");

  const [currentPasswordInputType, setCurrentPasswordInputType] =
    useState(false);
  const [newPasswordInputType, setNewPasswordInputType] = useState(false);
  const [newPasswordConfirmInputType, setNewPasswordConfirmInputType] =
    useState(false);

  const [deletePasswordInputType, setDeletePasswordInputType] = useState(false);

  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const handleShowChangePasswordModal = () => setShowChangePasswordModal(true);
  const handleCloseChangePasswordModal = () => {
    setShowChangePasswordModal(false);
    setCurrentPasswordInputType(false);
    setNewPasswordInputType(false);
    setNewPasswordConfirmInputType(false);
    reset();
  };

  const [showChangePasswordErrorModal, setShowChangePasswordErrorModal] =
    useState(false);
  const handleShowChangePasswordErrorModal = () => {
    setShowChangePasswordModal(false);
    setShowChangePasswordErrorModal(true);
  };
  const handleCloseChangePasswordErrorModal = () => {
    setShowChangePasswordErrorModal(false);
    setCurrentPasswordInputType(false);
    setNewPasswordInputType(false);
    setNewPasswordConfirmInputType(false);
    handleShowChangePasswordModal();
  };

  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
  const handleShowDeleteAccountModal = () => setShowDeleteAccountModal(true);
  const handleCloseDeleteAccountModal = () => {
    setShowDeleteAccountModal(false);
    setDataRemovalChecked(false);
    setContentRetentionChecked(false);
    setRejoiningChecked(false);
    setConsiderationChecked(false);
    setAllChecked(false);
    setDeletePasswordInputType(false);
    resetDeletePassword();
  };

  const [showDeleteAccountErrorModal, setShowDeleteAccountErrorModal] =
    useState(false);
  const handleShowDeleteAccountErrorModal = () => {
    setShowDeleteAccountModal(false);
    setShowDeleteAccountErrorModal(true);
  };
  const handleCloseDeleteAccountErrorModal = () => {
    setShowDeleteAccountErrorModal(false);
    setDeletePasswordInputType(false);
    handleShowDeleteAccountModal();
  };

  const signOut = () => {
    auth.signOut();
    navigate("/welcome");
  };

  const changeCurrentPasswordType = () => {
    setCurrentPasswordInputType((current) => !current);
  };

  const changeNewPasswordType = () => {
    setNewPasswordInputType((current) => !current);
  };

  const changeNewPasswordConfirmType = () => {
    setNewPasswordConfirmInputType((current) => !current);
  };

  const changeDeletePasswordType = () => {
    setDeletePasswordInputType((current) => !current);
  };

  const handleCurrentPassword = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;

    const trimmedValue = value.replace(/\s/gi, "");
    setCurrentPassword(trimmedValue);

    if (trimmedValue !== "") {
      setIsCurrentPassword(true);
    } else {
      setIsCurrentPassword(false);
    }
  };

  const handleNewPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    const regPassword =
      /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-]).{8,}$/;

    const trimmedValue = value.replace(/\s/gi, "");
    setNewPassword(trimmedValue);

    if (trimmedValue !== "") {
      if (!regPassword.test(trimmedValue)) {
        setNewPasswordErrorMessage(
          "Please enter at least 8 characters including numbers, English, and special characters."
        );
        setIsNewPassword(false);
        setIsNewPasswordConfirm(false);

        newPasswordInputRef.current?.classList.add("form-control-invalid");
        newPasswordInputRef.current?.classList.remove("form-control-valid");

        newPasswordConfirmInputRef.current?.classList.remove(
          "form-control-valid"
        );

        if (newPasswordConfirm) {
          setNewPasswordConfirmErrorMessage(
            "Please make your password valid first."
          );

          newPasswordConfirmInputRef.current?.classList.add(
            "form-control-invalid"
          );
        } else {
          setNewPasswordConfirmErrorMessage("");

          newPasswordConfirmInputRef.current?.classList.remove(
            "form-control-invalid"
          );
        }
      } else {
        setIsNewPassword(true);

        newPasswordInputRef.current?.classList.remove("form-control-invalid");
        newPasswordInputRef.current?.classList.add("form-control-valid");

        if (newPasswordConfirm) {
          if (trimmedValue !== newPasswordConfirm) {
            setNewPasswordConfirmErrorMessage("The password does not match.");
            setIsNewPasswordConfirm(false);

            newPasswordConfirmInputRef.current?.classList.add(
              "form-control-invalid"
            );
            newPasswordConfirmInputRef.current?.classList.remove(
              "form-control-valid"
            );
          } else {
            setNewPasswordConfirmErrorMessage("");
            setIsNewPasswordConfirm(true);

            newPasswordConfirmInputRef.current?.classList.remove(
              "form-control-invalid"
            );
            newPasswordConfirmInputRef.current?.classList.add(
              "form-control-valid"
            );
          }
        } else {
          setNewPasswordConfirmErrorMessage("");
          setIsNewPasswordConfirm(false);

          newPasswordConfirmInputRef.current?.classList.remove(
            "form-control-invalid"
          );
        }
      }
    } else {
      setNewPasswordErrorMessage("");

      setIsNewPassword(false);
      setIsNewPasswordConfirm(false);

      newPasswordInputRef.current?.classList.remove("form-control-invalid");
      newPasswordInputRef.current?.classList.remove("form-control-valid");

      newPasswordConfirmInputRef.current?.classList.remove(
        "form-control-valid"
      );

      if (newPasswordConfirm) {
        setNewPasswordConfirmErrorMessage("Please enter your password first.");

        newPasswordConfirmInputRef.current?.classList.add(
          "form-control-invalid"
        );
      } else {
        setNewPasswordConfirmErrorMessage("");

        newPasswordConfirmInputRef.current?.classList.remove(
          "form-control-invalid"
        );
      }
    }
  };

  const handleNewPasswordConfirm = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;

    const trimmedValue = value.replace(/\s/gi, "");
    setNewPasswordConfirm(trimmedValue);

    if (trimmedValue !== "") {
      if (trimmedValue !== newPassword) {
        setNewPasswordConfirmErrorMessage("The password does not match.");
        setIsNewPasswordConfirm(false);

        newPasswordConfirmInputRef.current?.classList.add(
          "form-control-invalid"
        );
        newPasswordConfirmInputRef.current?.classList.remove(
          "form-control-valid"
        );
      } else {
        setIsNewPasswordConfirm(true);

        newPasswordConfirmInputRef.current?.classList.remove(
          "form-control-invalid"
        );
        newPasswordConfirmInputRef.current?.classList.add("form-control-valid");
      }
    } else {
      setNewPasswordConfirmErrorMessage("");
      setIsNewPasswordConfirm(false);

      newPasswordConfirmInputRef.current?.classList.remove(
        "form-control-invalid"
      );
      newPasswordConfirmInputRef.current?.classList.remove(
        "form-control-valid"
      );
    }
  };

  const handleDeletePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    const trimmedValue = value.replace(/\s/gi, "");
    setDeletePassword(trimmedValue);

    if (trimmedValue !== "") {
      setIsDeletePassword(true);
    } else {
      setIsDeletePassword(false);
    }
  };

  const noSpace = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === "Space") {
      event.preventDefault();
    }
  };

  const back = () => {
    navigate(-1);
  };

  const reset = () => {
    setCurrentPassword("");
    setNewPassword("");
    setNewPasswordConfirm("");

    setIsCurrentPassword(false);
    setIsNewPassword(false);
    setIsNewPasswordConfirm(false);

    setCurrentPasswordInputType(false);
    setNewPasswordInputType(false);
    setNewPasswordConfirmInputType(false);

    setNewPasswordErrorMessage("");
    setNewPasswordConfirmErrorMessage("");

    newPasswordInputRef.current?.classList.remove("form-control-invalid");
    newPasswordInputRef.current?.classList.remove("form-control-valid");

    newPasswordConfirmInputRef.current?.classList.remove(
      "form-control-invalid"
    );
    newPasswordConfirmInputRef.current?.classList.remove("form-control-valid");
  };

  const resetDeletePassword = () => {
    setDeletePassword("");

    setIsDeletePassword(false);

    setDeletePasswordInputType(false);
  };

  useEffect(() => {
    if (
      !dataRemovalChecked ||
      !contentRetentionChecked ||
      !rejoiningChecked ||
      !considerationChecked
    ) {
      setAllChecked(false);
    }
  }, [
    dataRemovalChecked,
    contentRetentionChecked,
    rejoiningChecked,
    considerationChecked,
  ]);

  const agreeDataRemoval = () => {
    setDataRemovalChecked((current) => !current);
    resetDeletePassword();
  };

  const agreeContentRetention = () => {
    setContentRetentionChecked((current) => !current);
    resetDeletePassword();
  };

  const agreeRejoining = () => {
    setRejoiningChecked((current) => !current);
    resetDeletePassword();
  };

  const agreeConsideration = () => {
    setConsiderationChecked((current) => !current);
    resetDeletePassword();
  };

  const agreeAll = () => {
    if (!allChecked) {
      setAllChecked(true);

      if (
        !dataRemovalChecked ||
        !contentRetentionChecked ||
        !rejoiningChecked ||
        !considerationChecked
      ) {
        setDataRemovalChecked(true);
        setContentRetentionChecked(true);
        setRejoiningChecked(true);
        setConsiderationChecked(true);

        resetDeletePassword();
      }
    } else {
      setAllChecked(false);
    }
  };

  const changePassword = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      isLoading ||
      !isCurrentPassword ||
      !isNewPassword ||
      !isNewPasswordConfirm ||
      newPassword !== newPasswordConfirm
    ) {
      return;
    }

    setError("");

    try {
      setIsLoading(true);

      const user = auth.currentUser!;

      const credential = EmailAuthProvider.credential(
        auth.currentUser?.email!,
        currentPassword
      );

      await reauthenticateWithCredential(user, credential);

      if (currentPassword !== newPassword) {
        await updatePassword(user, newPassword);

        const userDocRef = doc(db, "users", user.uid);

        await setDoc(userDocRef, { password: newPassword }, { merge: true });

        window.localStorage.setItem("PasswordChanged", "true");

        signOut();
      } else {
        throw new Error("auth/same-password");
      }
    } catch (error) {
      window.localStorage.removeItem("PasswordChanged");

      if (error instanceof FirebaseError) {
        setError(error.code);
      } else {
        setError("auth/same-password");
      }

      reset();

      handleShowChangePasswordErrorModal();
    } finally {
      setIsLoading(false);
    }
  };

  const deleteAccount = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      isLoading ||
      !isDeletePassword ||
      !dataRemovalChecked ||
      !contentRetentionChecked ||
      !rejoiningChecked ||
      !considerationChecked
    ) {
      return;
    }

    setError("");

    try {
      setIsLoading(true);

      const credential = EmailAuthProvider.credential(
        user?.email!,
        deletePassword
      );

      await reauthenticateWithCredential(user!, credential);

      if (avatar) {
        const avatarRef = ref(storage, `avatars/${user?.uid}`);
        await deleteObject(avatarRef);

        const avatarQuery = query(
          collection(db, "avatars"),
          where("userId", "==", user?.uid)
        );

        const avatarSnapshot = await getDocs(avatarQuery);
        avatarSnapshot.forEach(async (avatar) => {
          await deleteDoc(avatar.ref);
        });
      }

      if (background) {
        const backgroundRef = ref(storage, `backgrounds/${user?.uid}`);
        await deleteObject(backgroundRef);

        const backgroundQuery = query(
          collection(db, "backgrounds"),
          where("userId", "==", user?.uid)
        );

        const backgroundSnapshot = await getDocs(backgroundQuery);
        backgroundSnapshot.forEach(async (background) => {
          await deleteDoc(background.ref);
        });
      }

      if (tweets.length !== 0) {
        tweets.forEach(async (tweet) => {
          if (tweet.photo) {
            const tweetRef = ref(storage, `tweets/${user?.uid}/${tweet.id}`);
            await deleteObject(tweetRef);
          }
        });

        const tweetQuery = query(
          collection(db, "tweets"),
          where("tweetUserId", "==", user?.uid)
        );

        const tweetSnapshot = await getDocs(tweetQuery);
        tweetSnapshot.forEach(async (tweet) => {
          await deleteDoc(tweet.ref);
        });
      }

      // 내가 작성한 모든 댓글 삭제
      const myReplyQuery = query(
        collection(db, "replys"),
        where("replyUserId", "==", user?.uid)
      );

      const myReplySnapshot = await getDocs(myReplyQuery);
      myReplySnapshot.forEach(async (reply) => {
        await deleteDoc(reply.ref);
      });

      // 내가 작성한 트윗에 달린 모든 댓글 삭제
      const othersReplyQuery = query(
        collection(db, "replys"),
        where("tweetUserId", "==", user?.uid)
      );

      const othersReplySnapshot = await getDocs(othersReplyQuery);
      othersReplySnapshot.forEach(async (reply) => {
        await deleteDoc(reply.ref);
      });

      // 내가 한 모든 트윗 좋아요 삭제
      const myTweetLikeQuery = query(
        collection(db, "tweetLikes"),
        where("likeUserId", "==", user?.uid)
      );

      const myTweetLikeSnapshot = await getDocs(myTweetLikeQuery);
      myTweetLikeSnapshot.forEach(async (like) => {
        await deleteDoc(like.ref);
      });

      // 내가 작성한 트윗에 달린 모든 좋아요 삭제
      const othersTweetLikeQuery = query(
        collection(db, "tweetLikes"),
        where("tweetUserId", "==", user?.uid)
      );

      const othersTweetLikeSnapshot = await getDocs(othersTweetLikeQuery);
      othersTweetLikeSnapshot.forEach(async (like) => {
        await deleteDoc(like.ref);
      });

      // 내가 한 모든 댓글 좋아요 삭제
      const myReplyLikeQuery = query(
        collection(db, "replyLikes"),
        where("likeUserId", "==", user?.uid)
      );

      const myReplyLikeSnapshot = await getDocs(myReplyLikeQuery);
      myReplyLikeSnapshot.forEach(async (like) => {
        await deleteDoc(like.ref);
      });

      // 내가 작성한 댓글에 달린 모든 좋아요 삭제
      const othersReplyLikeQuery = query(
        collection(db, "replyLikes"),
        where("replyUserId", "==", user?.uid)
      );

      const othersReplyLikeSnapshot = await getDocs(othersReplyLikeQuery);
      othersReplyLikeSnapshot.forEach(async (like) => {
        await deleteDoc(like.ref);
      });

      // 내가 작성한 트윗에 달린 다른 사람의 댓글에 달린 모든 좋아요 삭제
      const othersTweetReplyLikeQuery = query(
        collection(db, "replyLikes"),
        where("tweetUserId", "==", user?.uid)
      );

      const othersTweetReplyLikeSnapshot = await getDocs(
        othersTweetReplyLikeQuery
      );
      othersTweetReplyLikeSnapshot.forEach(async (like) => {
        await deleteDoc(like.ref);
      });

      const userQuery = query(
        collection(db, "users"),
        where("userId", "==", user?.uid)
      );

      const userSnapshot = await getDocs(userQuery);
      userSnapshot.forEach(async (user) => {
        await deleteDoc(user.ref);
      });

      await deleteUser(user!);

      window.localStorage.setItem("accountDeleted", "true");

      signOut();
    } catch (error) {
      window.localStorage.removeItem("accountDeleted");

      if (error instanceof FirebaseError) {
        setError(error.code);
      } else if (error instanceof FirestoreError) {
        setError(error.code);
      } else if (error instanceof StorageError) {
        setError(error.code);
      } else {
        setError("size-exhausted");
      }

      resetDeletePassword();

      handleShowDeleteAccountErrorModal();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container fluid className="d-flex justify-content-center h-100 p-0">
      <SideBar />
      <div
        className="overflow-y-auto bg-light h-100"
        style={{ width: "630px" }}
      >
        <AccountHeader back={back} />
        <AccountContent
          handleShowChangePasswordModal={handleShowChangePasswordModal}
          handleShowDeleteAccountModal={handleShowDeleteAccountModal}
        />
        <ScrollProfile />
      </div>
      <ChangePassword
        showChangePasswordModal={showChangePasswordModal}
        handleCloseChangePasswordModal={handleCloseChangePasswordModal}
        newPasswordInputRef={newPasswordInputRef}
        newPasswordConfirmInputRef={newPasswordConfirmInputRef}
        isLoading={isLoading}
        currentPasswordInputType={currentPasswordInputType}
        newPasswordInputType={newPasswordInputType}
        newPasswordConfirmInputType={newPasswordConfirmInputType}
        changeCurrentPasswordType={changeCurrentPasswordType}
        changeNewPasswordType={changeNewPasswordType}
        changeNewPasswordConfirmType={changeNewPasswordConfirmType}
        currentPassword={currentPassword}
        handleCurrentPassword={handleCurrentPassword}
        isCurrentPassword={isCurrentPassword}
        newPassword={newPassword}
        handleNewPassword={handleNewPassword}
        isNewPassword={isNewPassword}
        newPasswordErrorMessage={newPasswordErrorMessage}
        newPasswordConfirm={newPasswordConfirm}
        handleNewPasswordConfirm={handleNewPasswordConfirm}
        isNewPasswordConfirm={isNewPasswordConfirm}
        newPasswordConfirmErrorMessage={newPasswordConfirmErrorMessage}
        noSpace={noSpace}
        reset={reset}
        changePassword={changePassword}
      />
      <ChangePasswordErrorModal
        error={error}
        showChangePasswordErrorModal={showChangePasswordErrorModal}
        handleCloseChangePasswordErrorModal={
          handleCloseChangePasswordErrorModal
        }
      />
      <DeleteAccount
        showDeleteAccountModal={showDeleteAccountModal}
        handleCloseDeleteAccountModal={handleCloseDeleteAccountModal}
        isLoading={isLoading}
        deletePasswordInputType={deletePasswordInputType}
        changeDeletePasswordType={changeDeletePasswordType}
        deletePassword={deletePassword}
        handleDeletePassword={handleDeletePassword}
        isDeletePassword={isDeletePassword}
        noSpace={noSpace}
        resetDeletePassword={resetDeletePassword}
        dataRemovalChecked={dataRemovalChecked}
        agreeDataRemoval={agreeDataRemoval}
        contentRetentionChecked={contentRetentionChecked}
        agreeContentRetention={agreeContentRetention}
        rejoiningChecked={rejoiningChecked}
        agreeRejoining={agreeRejoining}
        considerationChecked={considerationChecked}
        agreeConsideration={agreeConsideration}
        allChecked={allChecked}
        agreeAll={agreeAll}
        deleteAccount={deleteAccount}
      />
      <DeleteAccountErrorModal
        error={error}
        showDeleteAccountErrorModal={showDeleteAccountErrorModal}
        handleCloseDeleteAccountErrorModal={handleCloseDeleteAccountErrorModal}
      />
    </Container>
  );
}
