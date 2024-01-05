import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import {
  EmailAuthProvider,
  isSignInWithEmailLink,
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

  const [originalPassword, setOriginalPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");

  const [isOriginalPassword, setIsOriginalPassword] = useState(false);
  const [isNewPassword, setIsNewPassword] = useState(false);
  const [isNewPasswordConfirm, setIsNewPasswordConfirm] = useState(false);

  const [error, setError] = useState("");

  const [originalPasswordErrorMessage, setOriginalPasswordErrorMessage] =
    useState("");
  const [newPasswordErrorMessage, setNewPasswordErrorMessage] = useState("");
  const [newPasswordConfirmErrorMessage, setNewPasswordConfirmErrorMessage] =
    useState("");

  const signOut = () => {
    auth.signOut();
    navigate("/sign-in");
  };

  const handleOriginalPassword = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;

    setOriginalPassword(value.replace(/\s/gi, ""));

    if (value !== "") {
      setIsOriginalPassword(true);

      document
        .getElementById("originalPassword")
        ?.classList.remove("form-control-invalid");
    } else {
      setOriginalPasswordErrorMessage("");
      setIsOriginalPassword(false);

      document
        .getElementById("originalPassword")
        ?.classList.remove("form-control-invalid");
    }
  };

  const handleNewPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    const regPassword = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{8,}$/;

    setNewPassword(value.replace(/\s/gi, ""));

    if (value !== "") {
      if (!regPassword.test(value)) {
        if (newPasswordConfirm) {
          setNewPasswordErrorMessage(
            "Please enter at least 8 characters including numbers, English, and special characters."
          );
          setNewPasswordConfirmErrorMessage(
            "Please make your password valid first."
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
            ?.classList.add("form-control-invalid");
          document
            .getElementById("newPasswordConfirm")
            ?.classList.remove("form-control-valid");
        } else {
          setNewPasswordErrorMessage(
            "Please enter at least 8 characters including numbers, English, and special characters."
          );
          setNewPasswordConfirmErrorMessage("");
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
            ?.classList.remove("form-control-invalid");
          document
            .getElementById("newPasswordConfirm")
            ?.classList.remove("form-control-valid");
        }
      } else {
        if (newPasswordConfirm) {
          if (value !== newPasswordConfirm) {
            setNewPasswordConfirmErrorMessage("The password does not match.");
            setIsNewPassword(true);
            setIsNewPasswordConfirm(false);

            document
              .getElementById("newPassword")
              ?.classList.remove("form-control-invalid");
            document
              .getElementById("newPassword")
              ?.classList.add("form-control-valid");

            document
              .getElementById("newPasswordConfirm")
              ?.classList.add("form-control-invalid");
            document
              .getElementById("newPasswordConfirm")
              ?.classList.remove("form-control-valid");
          } else {
            setNewPasswordConfirmErrorMessage("");
            setIsNewPassword(true);
            setIsNewPasswordConfirm(true);

            document
              .getElementById("newPassword")
              ?.classList.remove("form-control-invalid");
            document
              .getElementById("newPassword")
              ?.classList.add("form-control-valid");

            document
              .getElementById("newPasswordConfirm")
              ?.classList.remove("form-control-invalid");
            document
              .getElementById("newPasswordConfirm")
              ?.classList.add("form-control-valid");
          }
        } else {
          setNewPasswordConfirmErrorMessage("");
          setIsNewPassword(true);
          setIsNewPasswordConfirm(false);

          document
            .getElementById("newPassword")
            ?.classList.remove("form-control-invalid");
          document
            .getElementById("newPassword")
            ?.classList.add("form-control-valid");

          document
            .getElementById("newPasswordConfirm")
            ?.classList.remove("form-control-invalid");
        }
      }
    } else {
      if (newPasswordConfirm) {
        setNewPasswordErrorMessage("");
        setNewPasswordConfirmErrorMessage("Please enter your password first.");
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
          ?.classList.add("form-control-invalid");
        document
          .getElementById("newPasswordConfirm")
          ?.classList.remove("form-control-valid");
      } else {
        setNewPasswordErrorMessage("");
        setNewPasswordConfirmErrorMessage("");
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
          ?.classList.remove("form-control-invalid");
        document
          .getElementById("newPasswordConfirm")
          ?.classList.remove("form-control-valid");
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

  const reset = () => {
    setOriginalPassword("");
    setNewPassword("");
    setNewPasswordConfirm("");

    setIsOriginalPassword(false);
    setIsNewPassword(false);
    setIsNewPasswordConfirm(false);

    setOriginalPasswordErrorMessage("");
    setNewPasswordErrorMessage("");
    setNewPasswordConfirmErrorMessage("");

    document
      .getElementById("originalPassword")
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

    if (originalPassword === "") {
      setOriginalPasswordErrorMessage("Please enter your password.");
      setIsOriginalPassword(false);

      document
        .getElementById("originalPassword")
        ?.classList.add("form-control-invalid");
    }
    if (newPassword === "") {
      setNewPasswordErrorMessage("Please enter your password.");
      setIsNewPassword(false);

      document
        .getElementById("newPassword")
        ?.classList.add("form-control-invalid");
    }
    if (newPasswordConfirm === "" && isNewPassword) {
      setNewPasswordConfirmErrorMessage("Please confirm your password.");
      setIsNewPasswordConfirm(false);

      document
        .getElementById("newPasswordConfirm")
        ?.classList.add("form-control-invalid");
    }

    if (
      isLoading ||
      !isOriginalPassword ||
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
        originalPassword
      );

      await reauthenticateWithCredential(auth.currentUser!, credential);

      await updatePassword(auth.currentUser!, newPassword);

      window.localStorage.setItem("PasswordChanged", "true");

      signOut();
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError(error.code);
        console.log("error : " + error.code);

        window.localStorage.removeItem("PasswordChanged");
      }
    } finally {
      setIsLoading(false);
    }
  };

  console.log("user : " + auth.currentUser);
  console.log("emailVerified : " + auth.currentUser?.emailVerified);
  console.log(
    "isSignInWithEmailLink : " +
      isSignInWithEmailLink(auth, window.location.href)
  );
  console.log("changed password : " + newPassword);

  return (
    <div className="h-100">
      <Header />
      <div className="wrap">
        <Wrapper>
          <div className="w-100 mb-1 d-flex justify-content-center">
            <h1 className="fs-2 text-center">Change password</h1>
          </div>
          {error && (
            <Alert
              variant="danger"
              className="d-flex align-itmes-center m-0 mt-3 w-100"
              dismissible
            >
              <p>
                <span>
                  {error === "auth/invalid-login-credentials" &&
                    "Your original password is incorrect."}
                  {error === "auth/network-request-failed" &&
                    "A network error has occurred. Please reopen the page."}
                  {error === "auth/invalid-user-token" &&
                    "Your credential is no longer valid. Please sign in again."}
                  {error === "auth/user-token-expired" &&
                    "Your credential has expired. Please sign in again."}
                  {error === "auth/web-storage-unsupported" &&
                    "Your browser does not support web storage. Please try again."}
                </span>
              </p>
            </Alert>
          )}
          <Alert variant="light" className="mt-3 py-4 w-100">
            <Form
              onSubmit={changePassword}
              className="d-flex"
              style={{
                flexDirection: "column",
                gap: "15px",
              }}
            >
              <Form.Group>
                <Form.Label htmlFor="originalPassword">
                  Original password
                </Form.Label>
                <Form.Control
                  className="border-none mt-1 mb-1"
                  onChange={handleOriginalPassword}
                  onKeyDown={noSpace}
                  id="originalPassword"
                  name="originalPassword"
                  value={originalPassword}
                  type="password"
                  maxLength={20}
                />
                {!isOriginalPassword && originalPasswordErrorMessage && (
                  <div className="mt-2 text-danger">
                    {originalPasswordErrorMessage}
                  </div>
                )}
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="newPassword">New password</Form.Label>
                <Form.Control
                  className="border-none mt-1 mb-1"
                  onChange={handleNewPassword}
                  onKeyDown={noSpace}
                  id="newPassword"
                  name="newPassword"
                  value={newPassword}
                  type="password"
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
              <Button type="submit" className="fw-bold">
                {isLoading ? "Loading..." : "Change"}
              </Button>
            </Form>
            <Switcher className="d-flex justify-content-between">
              <Button onClick={reset} type="button" variant="outline-info">
                Reset
              </Button>
              <Link to="/" className="btn btn-outline-success">
                Home
              </Link>
            </Switcher>
          </Alert>
        </Wrapper>
        <Footer />
      </div>
    </div>
  );
}
