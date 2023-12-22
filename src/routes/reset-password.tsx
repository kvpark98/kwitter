import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { isSignInWithEmailLink, updatePassword } from "firebase/auth";
import { auth } from "../firebase";
import { Switcher, Wrapper } from "../components/auth-components";
import { Button, Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

export default function ResetPassword() {
  const navigate = useNavigate();

  const [isSignedInWithEmail, setIsSignedInWithEmail] = useState(
    window.localStorage.getItem("isSignedInWithEmail")
  );

  const [isLoading, setIsLoading] = useState(false);

  const [newPassword, setNewPassword] = useState("");

  const [isNewPassword, setIsNewPassword] = useState(false);

  const [error, setError] = useState("");
  const [newPasswordErrorMessage, setNewPasswordErrorMessage] = useState("");

  const logOut = () => {
    auth.signOut();
    navigate("/sign-in");
  };

  const redirect = () => {
    logOut();
    navigate("/sign-in");
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
      } else {
        setIsNewPassword(true);
      }
    } else {
      setNewPasswordErrorMessage("Please enter your password.");
      setIsNewPassword(false);
    }
  };

  const noSpace = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === "Space") {
      event.preventDefault();
    }
  };

  const reset = () => {
    setNewPassword("");

    setNewPasswordErrorMessage("");
  };

  useEffect(() => {
    window.localStorage.removeItem("isSignedInWithEmail");
  }, []);

  const resetPassword = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (newPassword === "") {
      setNewPasswordErrorMessage("Please enter your password.");
      setIsNewPassword(false);
    }

    if (isLoading || !isNewPassword) {
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
    <Container>
      {!error ? (
        <div className="d-flex justify-content-center align-items-center">
          <Wrapper>
            <div className="w-100 mb-1 d-flex justify-content-center">
              <h1 className="fs-2">Reset password</h1>
            </div>
            {isSignedInWithEmail && (
              <Alert
                variant="success"
                className="d-flex align-itmes-center m-0 mt-3 w-100"
                dismissible
              >
                <p>
                  Your are signed in with email. Please reset your password.
                </p>
              </Alert>
            )}
            <Alert variant="light" className="mt-3 py-4">
              <Form
                onSubmit={resetPassword}
                className="d-flex"
                style={{
                  width: "340px",
                  flexDirection: "column",
                  gap: "15px",
                }}
              >
                <Form.Group controlId="password">
                  <Form.Label>New password</Form.Label>
                  <Form.Control
                    className="border-none mt-1 mb-1"
                    onChange={handleNewPassword}
                    onKeyDown={noSpace}
                    name="password"
                    value={newPassword}
                    type="password"
                    maxLength={20}
                  />
                  {!isNewPassword && (
                    <div className="mt-2 text-danger">
                      {newPasswordErrorMessage}
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
                <Link to="/">Next time</Link>
              </Switcher>
            </Alert>
          </Wrapper>
        </div>
      ) : (
        <div className="d-flex justify-content-center align-items-center">
          <Alert
            variant="danger"
            className="m-0 mt-5"
            style={{ width: "450px" }}
          >
            <Alert.Heading className="mb-4">
              Oh snap! You got an error!
            </Alert.Heading>
            <p>
              <span>
                {error === "auth/requires-recent-login" &&
                  "Your last sign-in time does not meet the security threshold. Please sign in again."}
              </span>
            </p>
            <hr />
            <div className="d-flex justify-content-end">
              <Button
                onClick={redirect}
                variant="outline-danger"
                className="fw-bold"
              >
                return to sign in
              </Button>
            </div>
          </Alert>
        </div>
      )}
    </Container>
  );
}
