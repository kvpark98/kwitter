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

export default function ResetPassword() {
  const navigate = useNavigate();

  const [isSignedInWithEmail, setIsSignedInWithEmail] = useState(
    window.localStorage.getItem("isSignedInWithEmail")
  );

  const [isLoading, setIsLoading] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);

  const [error, setError] = useState("");

  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [passwordConfirmErrorMessage, setPasswordConfirmErrorMessage] =
    useState("");

  const signOut = () => {
    auth.signOut();
    navigate("/sign-in");
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
    window.localStorage.removeItem("isSignedInWithEmail");
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

      const credential = EmailAuthProvider.credential(
        auth.currentUser?.email!,
        password
      );

      await reauthenticateWithCredential(auth.currentUser!, credential);

      await updatePassword(auth.currentUser!, password);

      window.localStorage.setItem("PasswordChanged", "true");

      setIsSignedInWithEmail("");

      signOut();
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError(error.code);
        window.localStorage.setItem("error", error.code);
        console.log("error : " + error.code);

        window.localStorage.removeItem("PasswordChanged");
        setIsSignedInWithEmail("");
        signOut();
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
  console.log("changed password : " + password);

  return (
    <div className="h-100">
      <Header />
      <div className="wrap">
        <Wrapper>
          <div className="w-100 mb-1 d-flex justify-content-center">
            <h1 className="fs-2 text-center">Reset password</h1>
          </div>
          <Alert
            variant="warning"
            className="d-flex align-itmes-center m-0 mt-3 w-100"
          >
            <p>
              Please reset your password within 5 minutes, or you have to sign
              in again.
            </p>
          </Alert>
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
                    "This requires recent sign-in. Please sign in again."}
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
                  onChange={handlePassword}
                  onKeyDown={noSpace}
                  id="password"
                  name="password"
                  value={password}
                  type="password"
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
                  maxLength={20}
                  {...(!isPassword ? { disabled: true } : { disabled: false })}
                />
                {!isPasswordConfirm && passwordConfirmErrorMessage && (
                  <div className="mt-2 text-danger">
                    {passwordConfirmErrorMessage}
                  </div>
                )}
              </Form.Group>
              <Button type="submit" className="fw-bold">
                {isLoading ? "Loading..." : "Reset"}
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
