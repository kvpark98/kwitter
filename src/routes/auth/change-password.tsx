import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { auth } from "../../firebase";
import { Switcher, Wrapper } from "../../components/styles/auth-components";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Header from "../../components/header&footer/header";
import Footer from "../../components/header&footer/footer";

export default function ChangePassword() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");

  const [isCurrentPassword, setIsCurrentPassword] = useState(false);
  const [isNewPassword, setIsNewPassword] = useState(false);
  const [isNewPasswordConfirm, setIsNewPasswordConfirm] = useState(false);

  const [error, setError] = useState("");

  const [currentPasswordErrorMessage, setCurrentPasswordErrorMessage] =
    useState("");
  const [newPasswordErrorMessage, setNewPasswordErrorMessage] = useState("");
  const [newPasswordConfirmErrorMessage, setNewPasswordConfirmErrorMessage] =
    useState("");

  const signOut = () => {
    auth.signOut();
    navigate("/sign-in");
  };

  const handleCurrentPassword = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;

    setCurrentPassword(value.replace(/\s/gi, ""));

    document
      .getElementById("currentPassword")
      ?.classList.remove("form-control-invalid");

    if (value !== "") {
      setIsCurrentPassword(true);
    } else {
      setCurrentPasswordErrorMessage("");

      setIsCurrentPassword(false);
    }
  };

  const handleNewPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    const regPassword = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{8,}$/;

    setNewPassword(value.replace(/\s/gi, ""));

    if (value !== "") {
      if (!regPassword.test(value)) {
        setNewPasswordErrorMessage(
          "Please enter at least 8 characters including numbers, English, and special characters."
        );

        setIsNewPassword(false);
        setIsNewPasswordConfirm(false);

        document
          .getElementById("newPassword")
          ?.classList.add("form-control-invalid");
        document
          .getElementById("newPassword")
          ?.classList.remove("form-control-valid");

        document
          .getElementById("newPasswordConfirm")
          ?.classList.remove("form-control-valid");

        if (newPasswordConfirm) {
          setNewPasswordConfirmErrorMessage(
            "Please make your password valid first."
          );

          document
            .getElementById("newPasswordConfirm")
            ?.classList.add("form-control-invalid");
        } else {
          setNewPasswordConfirmErrorMessage("");

          document
            .getElementById("newPasswordConfirm")
            ?.classList.remove("form-control-invalid");
        }
      } else {
        setIsNewPassword(true);

        document
          .getElementById("newPassword")
          ?.classList.remove("form-control-invalid");
        document
          .getElementById("newPassword")
          ?.classList.add("form-control-valid");

        if (newPasswordConfirm) {
          if (value !== newPasswordConfirm) {
            setNewPasswordConfirmErrorMessage("The password does not match.");
            setIsNewPasswordConfirm(false);

            document
              .getElementById("newPasswordConfirm")
              ?.classList.add("form-control-invalid");
            document
              .getElementById("newPasswordConfirm")
              ?.classList.remove("form-control-valid");
          } else {
            setNewPasswordConfirmErrorMessage("");
            setIsNewPasswordConfirm(true);

            document
              .getElementById("newPasswordConfirm")
              ?.classList.remove("form-control-invalid");
            document
              .getElementById("newPasswordConfirm")
              ?.classList.add("form-control-valid");
          }
        } else {
          setNewPasswordConfirmErrorMessage("");
          setIsNewPasswordConfirm(false);

          document
            .getElementById("newPasswordConfirm")
            ?.classList.remove("form-control-invalid");
        }
      }
    } else {
      setNewPasswordErrorMessage("");

      setIsNewPassword(false);
      setIsNewPasswordConfirm(false);

      document
        .getElementById("newPassword")
        ?.classList.remove("form-control-invalid");
      document
        .getElementById("newPassword")
        ?.classList.remove("form-control-valid");

      document
        .getElementById("newPasswordConfirm")
        ?.classList.remove("form-control-valid");

      if (newPasswordConfirm) {
        setNewPasswordConfirmErrorMessage("Please enter your password first.");

        document
          .getElementById("newPasswordConfirm")
          ?.classList.add("form-control-invalid");
      } else {
        setNewPasswordConfirmErrorMessage("");

        document
          .getElementById("newPasswordConfirm")
          ?.classList.remove("form-control-invalid");
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

        document
          .getElementById("newPasswordConfirm")
          ?.classList.add("form-control-invalid");
        document
          .getElementById("newPasswordConfirm")
          ?.classList.remove("form-control-valid");
      } else {
        setIsNewPasswordConfirm(true);

        document
          .getElementById("newPasswordConfirm")
          ?.classList.remove("form-control-invalid");
        document
          .getElementById("newPasswordConfirm")
          ?.classList.add("form-control-valid");
      }
    } else {
      setNewPasswordConfirmErrorMessage("");
      setIsNewPasswordConfirm(false);

      document
        .getElementById("newPasswordConfirm")
        ?.classList.remove("form-control-invalid");
      document
        .getElementById("newPasswordConfirm")
        ?.classList.remove("form-control-valid");
    }
  };

  const noSpace = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === "Space") {
      event.preventDefault();
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  const reset = () => {
    setCurrentPassword("");
    setNewPassword("");
    setNewPasswordConfirm("");

    setIsCurrentPassword(false);
    setIsNewPassword(false);
    setIsNewPasswordConfirm(false);

    setCurrentPasswordErrorMessage("");
    setNewPasswordErrorMessage("");
    setNewPasswordConfirmErrorMessage("");

    document
      .getElementById("currentPassword")
      ?.classList.remove("form-control-invalid");

    document
      .getElementById("newPassword")
      ?.classList.remove("form-control-invalid");
    document
      .getElementById("newPassword")
      ?.classList.remove("form-control-valid");

    document
      .getElementById("newPasswordConfirm")
      ?.classList.remove("form-control-invalid");
    document
      .getElementById("newPasswordConfirm")
      ?.classList.remove("form-control-valid");
  };

  useEffect(() => {
    window.localStorage.removeItem("error");
  }, []);

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
      if (error instanceof FirebaseError) {
        setError(error.code);
        console.log("error : " + error.code);

        window.localStorage.removeItem("PasswordChanged");

        if (
          error.code === "auth/invalid-login-credentials" ||
          error.code === "auth/wrong-password"
        ) {
          setCurrentPassword("");

          setIsCurrentPassword(false);

          setCurrentPasswordErrorMessage("");

          document
            .getElementById("currentPassword")
            ?.classList.remove("form-control-invalid");
        }
      } else {
        setError("auth/same-password");
        console.log(error);

        setNewPassword("");
        setNewPasswordConfirm("");

        setIsNewPassword(false);
        setIsNewPasswordConfirm(false);

        setNewPasswordErrorMessage("");
        setNewPasswordConfirmErrorMessage("");

        document
          .getElementById("newPassword")
          ?.classList.remove("form-control-invalid");
        document
          .getElementById("newPassword")
          ?.classList.remove("form-control-valid");

        document
          .getElementById("newPasswordConfirm")
          ?.classList.remove("form-control-invalid");
        document
          .getElementById("newPasswordConfirm")
          ?.classList.remove("form-control-valid");
      }
    } finally {
      setIsLoading(false);
    }
  };

  console.log("user : " + auth.currentUser);
  console.log("emailVerified : " + auth.currentUser?.emailVerified);

  return (
    <div className="h-100">
      <Header />
      <div className="wrap">
        <Wrapper>
          <div className="mb-2">
            <h1 className="fs-2">Change Password</h1>
          </div>
          {error && (
            <Alert variant="danger" className="m-0 mt-3 w-100" dismissible>
              <p>
                {(error === "auth/wrong-password" ||
                  error === "auth/invalid-credential") &&
                  "Your current password is incorrect."}
                {error === "auth/same-password" &&
                  "Your new password is the same as your current password."}
                {error === "auth/user-not-found" &&
                  "User not found. Please verify your account and try again."}
                {error === "auth/user-disabled" &&
                  "Account disabled. Please contact support to re-enable your account."}
                {error === "auth/requires-recent-login" &&
                  "Security concern. For this action, recent sign-in is required. Please sign in again."}
                {error === "auth/too-many-requests" &&
                  "Excessive attempts. Please retry after a brief delay."}
                {error === "auth/network-request-failed" &&
                  "An unexpected network error has occurred. Kindly reopen the page."}
                {error === "auth/invalid-user-token" &&
                  "Invalid user token. Please sign in again to obtain a valid token."}
                {error === "auth/user-token-expired" &&
                  "Your credentials have expired. Please try again."}
                {error === "auth/web-storage-unsupported" &&
                  "Your browser does not support web storage."}
                {error === "auth/internal-error" &&
                  "An internal error occurred. Please try again later or contact support for assistance."}
                {error === "auth/unknown" &&
                  "An unexpected error occurred. Please try again or contact support."}
              </p>
            </Alert>
          )}
          <Alert variant="light" className="mt-3 px-4 py-4 w-100">
            <Form
              onSubmit={changePassword}
              className="d-flex flex-column row-gap-3"
            >
              <Form.Group>
                <Form.Label htmlFor="currentPassword">
                  Current Password
                </Form.Label>
                <Form.Control
                  className="border-none mt-1 mb-1"
                  onChange={handleCurrentPassword}
                  onKeyDown={noSpace}
                  id="currentPassword"
                  name="currentPassword"
                  value={currentPassword}
                  type="password"
                  autoComplete="new-password"
                  maxLength={20}
                />
                {!isCurrentPassword && currentPasswordErrorMessage && (
                  <div className="mt-2 text-danger">
                    {currentPasswordErrorMessage}
                  </div>
                )}
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="newPassword">New Password</Form.Label>
                <Form.Control
                  className="border-none mt-1 mb-1"
                  onChange={handleNewPassword}
                  onKeyDown={noSpace}
                  id="newPassword"
                  name="newPassword"
                  value={newPassword}
                  type="password"
                  autoComplete="new-password"
                  maxLength={20}
                />
                {!isNewPassword && newPasswordErrorMessage && (
                  <div className="mt-2 text-danger">
                    {newPasswordErrorMessage}
                  </div>
                )}
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="newPasswordConfirm">
                  New Password Confirm
                </Form.Label>
                <Form.Control
                  className="border-none mt-1 mb-1"
                  onChange={handleNewPasswordConfirm}
                  onKeyDown={noSpace}
                  id="newPasswordConfirm"
                  name="newPasswordConfirm"
                  value={newPasswordConfirm}
                  type="password"
                  autoComplete="new-password"
                  maxLength={20}
                  {...(!isNewPassword
                    ? { disabled: true }
                    : { disabled: false })}
                />
                {!isNewPasswordConfirm && newPasswordConfirmErrorMessage && (
                  <div className="mt-2 text-danger">
                    {newPasswordConfirmErrorMessage}
                  </div>
                )}
              </Form.Group>
              <Button
                type="submit"
                className="mt-2 fw-bold"
                {...(!isCurrentPassword ||
                !isNewPassword ||
                !isNewPasswordConfirm
                  ? { disabled: true }
                  : { disabled: false })}
              >
                {isLoading ? "Loading..." : "Change"}
              </Button>
            </Form>
            <Switcher className="d-flex justify-content-between">
              <Button onClick={reset} type="button" variant="outline-info">
                Reset
              </Button>
              <Button onClick={goBack} type="button" variant="outline-success">
                Back
              </Button>
            </Switcher>
          </Alert>
        </Wrapper>
        <Footer />
      </div>
    </div>
  );
}
