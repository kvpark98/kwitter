import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { isSignInWithEmailLink, updatePassword } from "firebase/auth";
import { auth } from "../../firebase";
import { Switcher, Wrapper } from "../../components/styles/auth-components";
import { Button, Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Footer from "../../components/header&footer/footer";

export default function ResetPassword() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);

  const [error, setError] = useState("");

  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [passwordConfirmErrorMessage, setPasswordConfirmErrorMessage] =
    useState("");

  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const signOut = () => {
    auth.signOut();
    navigate("/sign-in");
  };

  const navigateToHome = () => {
    window.sessionStorage.removeItem("isSignedInWithEmail");
    navigate("/");
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    const regPassword = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{8,}$/;

    setPassword(value.replace(/\s/gi, ""));

    if (value !== "") {
      if (!regPassword.test(value)) {
        if (passwordConfirm) {
          setPasswordErrorMessage(
            "Please enter at least 8 characters including numbers, English, and special characters."
          );
          setPasswordConfirmErrorMessage(
            "Please make your password valid first."
          );
          setIsPassword(false);
          setIsPasswordConfirm(false);

          document
            .getElementById("password")
            ?.classList.add("form-control-invalid");
          document
            .getElementById("password")
            ?.classList.remove("form-control-valid");

          document
            .getElementById("passwordConfirm")
            ?.classList.add("form-control-invalid");
          document
            .getElementById("passwordConfirm")
            ?.classList.remove("form-control-valid");
        } else {
          setPasswordErrorMessage(
            "Please enter at least 8 characters including numbers, English, and special characters."
          );
          setPasswordConfirmErrorMessage("");
          setIsPassword(false);
          setIsPasswordConfirm(false);

          document
            .getElementById("password")
            ?.classList.add("form-control-invalid");
          document
            .getElementById("password")
            ?.classList.remove("form-control-valid");

          document
            .getElementById("passwordConfirm")
            ?.classList.remove("form-control-invalid");
          document
            .getElementById("passwordConfirm")
            ?.classList.remove("form-control-valid");
        }
      } else {
        if (passwordConfirm) {
          if (value !== passwordConfirm) {
            setPasswordConfirmErrorMessage("The password does not match.");
            setIsPassword(true);
            setIsPasswordConfirm(false);

            document
              .getElementById("password")
              ?.classList.remove("form-control-invalid");
            document
              .getElementById("password")
              ?.classList.add("form-control-valid");

            document
              .getElementById("passwordConfirm")
              ?.classList.add("form-control-invalid");
            document
              .getElementById("passwordConfirm")
              ?.classList.remove("form-control-valid");
          } else {
            setPasswordConfirmErrorMessage("");
            setIsPassword(true);
            setIsPasswordConfirm(true);

            document
              .getElementById("password")
              ?.classList.remove("form-control-invalid");
            document
              .getElementById("password")
              ?.classList.add("form-control-valid");

            document
              .getElementById("passwordConfirm")
              ?.classList.remove("form-control-invalid");
            document
              .getElementById("passwordConfirm")
              ?.classList.add("form-control-valid");
          }
        } else {
          setPasswordConfirmErrorMessage("");
          setIsPassword(true);
          setIsPasswordConfirm(false);

          document
            .getElementById("password")
            ?.classList.remove("form-control-invalid");
          document
            .getElementById("password")
            ?.classList.add("form-control-valid");

          document
            .getElementById("passwordConfirm")
            ?.classList.remove("form-control-invalid");
        }
      }
    } else {
      if (passwordConfirm) {
        setPasswordErrorMessage("");
        setPasswordConfirmErrorMessage("Please enter your password first.");
        setIsPassword(false);
        setIsPasswordConfirm(false);

        document
          .getElementById("password")
          ?.classList.remove("form-control-invalid");
        document
          .getElementById("password")
          ?.classList.remove("form-control-valid");

        document
          .getElementById("passwordConfirm")
          ?.classList.add("form-control-invalid");
        document
          .getElementById("passwordConfirm")
          ?.classList.remove("form-control-valid");
      } else {
        setPasswordErrorMessage("");
        setPasswordConfirmErrorMessage("");
        setIsPassword(false);
        setIsPasswordConfirm(false);

        document
          .getElementById("password")
          ?.classList.remove("form-control-invalid");
        document
          .getElementById("password")
          ?.classList.remove("form-control-valid");

        document
          .getElementById("passwordConfirm")
          ?.classList.remove("form-control-invalid");
        document
          .getElementById("passwordConfirm")
          ?.classList.remove("form-control-valid");
      }
    }
  };

  const handlepasswordConfirm = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;

    setPasswordConfirm(value.replace(/\s/gi, ""));

    if (value !== "") {
      if (value !== password) {
        setPasswordConfirmErrorMessage("The password does not match.");
        setIsPasswordConfirm(false);

        document
          .getElementById("passwordConfirm")
          ?.classList.add("form-control-invalid");
        document
          .getElementById("passwordConfirm")
          ?.classList.remove("form-control-valid");
      } else {
        setIsPasswordConfirm(true);

        document
          .getElementById("passwordConfirm")
          ?.classList.remove("form-control-invalid");
        document
          .getElementById("passwordConfirm")
          ?.classList.add("form-control-valid");
      }
    } else {
      setPasswordConfirmErrorMessage("");
      setIsPasswordConfirm(false);

      document
        .getElementById("passwordConfirm")
        ?.classList.remove("form-control-invalid");
      document
        .getElementById("passwordConfirm")
        ?.classList.remove("form-control-valid");
    }
  };

  const noSpace = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === "Space") {
      event.preventDefault();
    }
  };

  const reset = () => {
    setPassword("");
    setPasswordConfirm("");

    setIsPassword(false);
    setIsPasswordConfirm(false);

    setPasswordErrorMessage("");
    setPasswordConfirmErrorMessage("");

    document
      .getElementById("password")
      ?.classList.remove("form-control-invalid");
    document.getElementById("password")?.classList.remove("form-control-valid");

    document
      .getElementById("passwordConfirm")
      ?.classList.remove("form-control-invalid");
    document
      .getElementById("passwordConfirm")
      ?.classList.remove("form-control-valid");
  };

  useEffect(() => {
    window.localStorage.removeItem("error");
  }, []);

  const resetPassword = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password === "") {
      setPasswordErrorMessage("Please enter your password.");
      setIsPassword(false);

      document
        .getElementById("password")
        ?.classList.add("form-control-invalid");
    }
    if (passwordConfirm === "" && isPassword) {
      setPasswordConfirmErrorMessage("Please confirm your password.");
      setIsPasswordConfirm(false);

      document
        .getElementById("passwordConfirm")
        ?.classList.add("form-control-invalid");
    }

    if (
      isLoading ||
      !isPassword ||
      !isPasswordConfirm ||
      password !== passwordConfirm
    ) {
      return;
    }

    setError("");

    try {
      setIsLoading(true);

      await updatePassword(auth.currentUser!, password);

      window.sessionStorage.removeItem("isSignedInWithEmail");

      window.localStorage.setItem("PasswordChanged", "true");

      signOut();
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError(error.code);
        console.log("error : " + error.code);

        window.localStorage.setItem("error", error.code);

        window.localStorage.removeItem("PasswordChanged");

        if (error.code === "auth/requires-recent-login") {
          signOut();
        }
      }
      reset();
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

  return (
    <div className="h-100">
      <div className="wrap">
        <Wrapper>
          <div className="mb-2">
            <h1 className="fs-2">Reset Password</h1>
          </div>
          {window.sessionStorage.getItem("isSignedInWithEmail") && (
            <Alert variant="success" className="m-0 mt-3 w-100">
              <p>
                You have successfully signed in using the email link. Kindly
                proceed to reset your password within the next 5 minutes.
              </p>
            </Alert>
          )}
          {error && (
            <Alert variant="danger" className="m-0 mt-3 w-100" dismissible>
              <p>
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
              onSubmit={resetPassword}
              className="d-flex flex-column row-gap-3"
            >
              <Form.Group>
                <Form.Label htmlFor="password">New Password</Form.Label>
                <Form.Control
                  className="border-none mt-1 mb-1"
                  onChange={handlePassword}
                  onKeyDown={noSpace}
                  id="password"
                  name="password"
                  value={password}
                  type="password"
                  autoComplete="new-password"
                  maxLength={20}
                />
                {!isPassword && passwordErrorMessage && (
                  <div className="mt-2 text-danger">{passwordErrorMessage}</div>
                )}
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="passwordConfirm">
                  New Password Confirm
                </Form.Label>
                <Form.Control
                  className="border-none mt-1 mb-1"
                  onChange={handlepasswordConfirm}
                  onKeyDown={noSpace}
                  id="passwordConfirm"
                  name="passwordConfirm"
                  value={passwordConfirm}
                  type="password"
                  autoComplete="new-password"
                  maxLength={20}
                  {...(!isPassword ? { disabled: true } : { disabled: false })}
                />
                {!isPasswordConfirm && passwordConfirmErrorMessage && (
                  <div className="mt-2 text-danger">
                    {passwordConfirmErrorMessage}
                  </div>
                )}
              </Form.Group>
              <Button type="submit" className="mt-2 fw-bold">
                {isLoading ? "Loading..." : "Reset"}
              </Button>
            </Form>
            <Switcher className="d-flex justify-content-between">
              <Button onClick={reset} type="button" variant="outline-info">
                Reset
              </Button>
              <Button variant="outline-success" onClick={handleShowModal}>
                Home
              </Button>
            </Switcher>
          </Alert>
          <Modal
            show={showModal}
            onHide={handleCloseModal}
            backdrop="static"
            keyboard={false}
          >
            <Alert variant="warning" className="m-0 p-0">
              <Modal.Body>
                <Alert.Heading className="mb-3">Alert</Alert.Heading>
                <p>
                  If you don't reset your password now, you'll need to request a
                  new link. Would you like to proceed?
                </p>
              </Modal.Body>
              <Modal.Footer className="border-0 pt-0 p-3">
                <Button variant="outline-dark" onClick={handleCloseModal}>
                  Close
                </Button>
                <Button variant="outline-primary" onClick={navigateToHome}>
                  Proceed
                </Button>
              </Modal.Footer>
            </Alert>
          </Modal>
        </Wrapper>
        <Footer />
      </div>
    </div>
  );
}
