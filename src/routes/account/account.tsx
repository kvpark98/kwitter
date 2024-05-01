import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import {
  EmailAuthProvider,
  deleteUser,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { auth } from "../../firebase";
import { Container } from "react-bootstrap";
import ScrollProfile from "../../components/scrolls/scrollProfile";
import AccountTitle from "../../components/account/account-title";
import AccountContent from "../../components/account/account-content";
import SideBar from "../../components/header&footer/side-bar/side-bar";
import ChangePasswordErrors from "../../components/modals/error/change-password-errors";
import ChangePassword from "../../components/account/change-password/change-password";
import DeleteAccount from "../../components/account/delete-account/delete-account";

export default function Account() {
  const newPasswordInputRef = useRef<HTMLInputElement>(null);
  const newPasswordConfirmInputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

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

  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const handleShowChangePasswordModal = () => {
    setShowChangePasswordModal(true);
  };
  const handleCloseChangePasswordModal = () => {
    setShowChangePasswordModal(false);
    reset();
  };

  const [showChangePasswordErrorsModal, setShowChangePasswordErrorsModal] =
    useState(false);
  const handleShowChangePasswordErrorsModal = () => {
    setShowChangePasswordModal(false);
    setShowChangePasswordErrorsModal(true);
  };
  const handleCloseChangePasswordErrorsModal = () => {
    setShowChangePasswordErrorsModal(false);
    setError("");
    handleShowChangePasswordModal();
  };

  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
  const handleShowDeleteAccountModal = () => {
    setShowDeleteAccountModal(true);
  };
  const handleCloseDeleteAccountModal = () => {
    setShowDeleteAccountModal(false);
    resetDeletePassword();
    setDataRemovalChecked(false);
    setContentRetentionChecked(false);
    setRejoiningChecked(false);
    setConsiderationChecked(false);
    setAllChecked(false);
  };

  const signOut = () => {
    auth.signOut();
    navigate("/sign-in");
  };

  const handleCurrentPassword = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;

    setCurrentPassword(value.replace(/\s/gi, ""));

    if (value !== "") {
      setIsCurrentPassword(true);
    } else {
      setIsCurrentPassword(false);
    }
  };

  const handleNewPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    const regPassword =
      /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-]).{8,}$/;

    setNewPassword(value.replace(/\s/gi, ""));

    if (value !== "") {
      if (!regPassword.test(value)) {
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
          if (value !== newPasswordConfirm) {
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

    setNewPasswordConfirm(value.replace(/\s/gi, ""));

    if (value !== "") {
      if (value !== newPassword) {
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

    setDeletePassword(value.replace(/\s/gi, ""));

    if (value !== "") {
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
  };

  useEffect(() => {
    window.localStorage.removeItem("error");
  }, []);

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

      const credential = EmailAuthProvider.credential(
        auth.currentUser?.email!,
        currentPassword
      );

      await reauthenticateWithCredential(auth.currentUser!, credential);

      if (currentPassword !== newPassword) {
        await updatePassword(auth.currentUser!, newPassword);

        window.localStorage.setItem("PasswordChanged", "true");

        signOut();
      } else {
        throw new Error("auth/same-password");
      }
    } catch (error) {
      window.localStorage.removeItem("PasswordChanged");

      if (error instanceof FirebaseError) {
        setError(error.code);
        console.log("FirebaseError", error.code);

        if (
          error.code === "auth/invalid-login-credentials" ||
          error.code === "auth/wrong-password"
        ) {
          setCurrentPassword("");

          setIsCurrentPassword(false);
        }
      } else {
        setError("auth/same-password");

        setNewPassword("");
        setNewPasswordConfirm("");

        setIsNewPassword(false);
        setIsNewPasswordConfirm(false);

        setNewPasswordErrorMessage("");
        setNewPasswordConfirmErrorMessage("");

        newPasswordInputRef.current?.classList.remove("form-control-invalid");
        newPasswordInputRef.current?.classList.remove("form-control-valid");

        newPasswordConfirmInputRef.current?.classList.remove(
          "form-control-invalid"
        );
        newPasswordConfirmInputRef.current?.classList.remove(
          "form-control-valid"
        );
      }

      handleShowChangePasswordErrorsModal();
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
        auth.currentUser?.email!,
        deletePassword
      );

      await reauthenticateWithCredential(auth.currentUser!, credential);

      await deleteUser(auth.currentUser!);

      window.localStorage.setItem("accountDeleted", "true");

      signOut();
    } catch (error) {
      window.localStorage.removeItem("accountDeleted");

      if (error instanceof FirebaseError) {
        setError(error.code);
        console.log("FirebaseError", error.code);
      }

      resetDeletePassword();

      setTimeout(() => {
        setError("");
      }, 5000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container fluid className="h-100">
      <SideBar />
      <div className="h-100 m-auto" style={{ maxWidth: "800px" }}>
        <AccountTitle back={back} />
        <hr />
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
      <ChangePasswordErrors
        error={error}
        showChangePasswordErrorsModal={showChangePasswordErrorsModal}
        handleCloseChangePasswordErrorsModal={
          handleCloseChangePasswordErrorsModal
        }
      />
      <DeleteAccount
        showDeleteAccountModal={showDeleteAccountModal}
        handleCloseDeleteAccountModal={handleCloseDeleteAccountModal}
        isLoading={isLoading}
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
    </Container>
  );
}
