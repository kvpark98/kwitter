import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { isSignInWithEmailLink, updatePassword } from "firebase/auth";
import { auth } from "../firebase";
import { Switcher, Wrapper } from "../components/auth-components";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Header from "../components/header";
import Footer from "../components/footer";

export default function ResetPassword() {
  const navigate = useNavigate();

  const [isSignedInWithEmail, setIsSignedInWithEmail] = useState(
    window.localStorage.getItem("isSignedInWithEmail")
  );

  const [isLoading, setIsLoading] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");

  const [isNewPassword, setIsNewPassword] = useState(false);
  const [isNewPasswordConfirm, setIsNewPasswordConfirm] = useState(false);

  const [error, setError] = useState("");

  const [newPasswordErrorMessage, setNewPasswordErrorMessage] = useState("");
  const [newPasswordConfirmErrorMessage, setNewPasswordConfirmErrorMessage] =
    useState("");

  const logOut = () => {
    auth.signOut();
    navigate("/sign-in");
  };

  const handleNewPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    const regNewPassword = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{8,}$/;

    setNewPassword(value.replace(/\s/gi, ""));

    if (value !== "") {
      if (!regNewPassword.test(value)) {
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
            .getElementById("password")
            ?.classList.add("form-control-invalid");
          document
            .getElementById("passwordConfirm")
            ?.classList.add("form-control-invalid");
        } else {
          setNewPasswordErrorMessage(
            "Please enter at least 8 characters including numbers, English, and special characters."
          );
          setIsNewPassword(false);
          document
            .getElementById("password")
            ?.classList.add("form-control-invalid");
        }
      } else {
        if (newPasswordConfirm) {
          if (value !== newPasswordConfirm) {
            setNewPasswordConfirmErrorMessage("The password does not match.");
            setIsNewPassword(true);
            setIsNewPasswordConfirm(false);
            document
              .getElementById("password")
              ?.classList.remove("form-control-invalid");
            document
              .getElementById("passwordConfirm")
              ?.classList.add("form-control-invalid");
          } else {
            setNewPasswordConfirmErrorMessage("");
            setIsNewPassword(true);
            setIsNewPasswordConfirm(true);
            document
              .getElementById("password")
              ?.classList.remove("form-control-invalid");
            document
              .getElementById("passwordConfirm")
              ?.classList.remove("form-control-invalid");
          }
        } else {
          setIsNewPassword(true);
          setIsNewPasswordConfirm(false);
          document
            .getElementById("password")
            ?.classList.remove("form-control-invalid");
        }
      }
    } else {
      if (newPasswordConfirm) {
        setNewPasswordErrorMessage("Please enter your password.");
        setNewPasswordConfirmErrorMessage("Please enter your password first.");
        setIsNewPassword(false);
        setIsNewPasswordConfirm(false);
        document
          .getElementById("password")
          ?.classList.add("form-control-invalid");
        document
          .getElementById("passwordConfirm")
          ?.classList.add("form-control-invalid");
      } else {
        setNewPasswordErrorMessage("Please enter your password.");
        setIsNewPassword(false);
        setIsNewPasswordConfirm(false);
        document
          .getElementById("password")
          ?.classList.add("form-control-invalid");
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
          .getElementById("passwordConfirm")
          ?.classList.add("form-control-invalid");
      } else {
        setIsNewPasswordConfirm(true);
        document
          .getElementById("passwordConfirm")
          ?.classList.remove("form-control-invalid");
      }
    } else {
      setNewPasswordConfirmErrorMessage("Please confirm your password.");
      setIsNewPasswordConfirm(false);
      document
        .getElementById("passwordConfirm")
        ?.classList.add("form-control-invalid");
    }
  };

  const noSpace = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === "Space") {
      event.preventDefault();
    }
  };

  const reset = () => {
    setNewPassword("");
    setNewPasswordConfirm("");

    setIsNewPassword(false);
    setIsNewPasswordConfirm(false);

    setNewPasswordErrorMessage("");
    setNewPasswordConfirmErrorMessage("");

    document
      .getElementById("password")
      ?.classList.remove("form-control-invalid");
    document
      .getElementById("passwordConfirm")
      ?.classList.remove("form-control-invalid");
  };

  useEffect(() => {
    window.localStorage.removeItem("isSignedInWithEmail");
    window.localStorage.removeItem("error");
  }, []);

  const resetPassword = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (newPassword === "") {
      setNewPasswordErrorMessage("Please enter your password.");
      setIsNewPassword(false);
      document
        .getElementById("password")
        ?.classList.add("form-control-invalid");
    }
    if (newPasswordConfirm === "") {
      setNewPasswordConfirmErrorMessage("Please confirm your password.");
      setIsNewPasswordConfirm(false);
      document
        .getElementById("passwordConfirm")
        ?.classList.add("form-control-invalid");
    }

    if (
      isLoading ||
      !isNewPassword ||
      !isNewPasswordConfirm ||
      newPassword !== newPasswordConfirm
    ) {
      return;
    }

    setError("");

    try {
      setIsLoading(true);

      if (auth.currentUser !== null) {
        await updatePassword(auth.currentUser, newPassword);

        window.localStorage.setItem("PasswordChanged", "true");

        setIsSignedInWithEmail("");

        logOut();
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError(error.code);
        window.localStorage.setItem("error", error.code);
        console.log("error : " + error.code);

        window.localStorage.removeItem("PasswordChanged");
        setIsSignedInWithEmail("");
        logOut();
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
            <h1 className="fs-2 text-center">
              <div className="text-center mb-3">Reset password for</div>
              <div className="text-center">{auth.currentUser?.displayName}</div>
            </h1>
          </div>
          {isSignedInWithEmail && (
            <Alert
              variant="success"
              className="d-flex align-itmes-center m-0 mt-3 w-100"
              dismissible
            >
              <p>Your are signed in with email. Please reset your password.</p>
            </Alert>
          )}
          {error === "auth/requires-recent-login" && (
            <Alert
              variant="danger"
              className="d-flex align-itmes-center m-0 mt-3 w-100"
              dismissible
            >
              <p>
                <span>
                  {error === "auth/requires-recent-login" &&
                    "Your last sign-in time does not meet the security threshold. Please sign in again."}
                </span>
              </p>
            </Alert>
          )}
          <Alert variant="light" className="mt-3 py-4 w-100">
            <Form
              onSubmit={resetPassword}
              className="d-flex"
              style={{
                flexDirection: "column",
                gap: "15px",
              }}
            >
              <Form.Group>
                <Form.Label htmlFor="password">New password</Form.Label>
                <Form.Control
                  className="border-none mt-1 mb-1"
                  onChange={handleNewPassword}
                  onKeyDown={noSpace}
                  id="password"
                  name="password"
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
                <Form.Label htmlFor="passwordConfirm">
                  New Password Confirm
                </Form.Label>
                <Form.Control
                  className="border-none mt-1 mb-1"
                  onChange={handleNewPasswordConfirm}
                  onKeyDown={noSpace}
                  id="passwordConfirm"
                  name="passwordConfirm"
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
                {isLoading ? "Loading..." : "Reset"}
              </Button>
            </Form>
            <Switcher className="d-flex justify-content-between">
              <Button onClick={reset} type="button" variant="outline-warning">
                Reset
              </Button>
              <Link to="/" className="btn btn-outline-success">
                Next time
              </Link>
            </Switcher>
          </Alert>
        </Wrapper>
        <Footer />
      </div>
    </div>
  );
}
