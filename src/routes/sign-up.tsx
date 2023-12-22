import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { Switcher, Wrapper } from "../components/auth-components";
import GithubButton from "../components/github-btn";
import GoogleButton from "../components/google-btn";
import { Button, Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

export default function SignUp() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

  const [isName, setIsName] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);

  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    const regName = /^[가-힣a-zA-Z]{2,20}$/;

    setName(value.replace(/\s/gi, ""));

    if (value !== "") {
      if (!regName.test(value)) {
        setNameErrorMessage(
          "Please enter at least 2 characters either in English or Korean."
        );
        setIsName(false);
      } else {
        setIsName(true);
      }
    } else {
      setNameErrorMessage("Please enter your name.");
      setIsName(false);
    }
  };

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    const regEmail =
      /^[A-Za-z0-9]{3,}([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]{3,}([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;

    setEmail(value.replace(/\s/gi, ""));

    if (value !== "") {
      if (!regEmail.test(value)) {
        setEmailErrorMessage("Not a valid email format.");
        setIsEmail(false);
      } else {
        setIsEmail(true);
      }
    } else {
      setEmailErrorMessage("Please enter your email.");
      setIsEmail(false);
    }
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    const regPassword = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{8,}$/;

    setPassword(value.replace(/\s/gi, ""));

    if (value !== "") {
      if (!regPassword.test(value)) {
        setPasswordErrorMessage(
          "Please enter at least 8 characters including numbers, English, and special characters."
        );
        setIsPassword(false);
      } else {
        setIsPassword(true);
      }
    } else {
      setPasswordErrorMessage("Please enter your password.");
      setIsPassword(false);
    }
  };

  const noSpace = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === "Space") {
      event.preventDefault();
    }
  };

  const logOut = () => {
    auth.signOut();
    navigate("/sign-in");
  };

  const reset = () => {
    setName("");
    setEmail("");
    setPassword("");

    setNameErrorMessage("");
    setEmailErrorMessage("");
    setPasswordErrorMessage("");
  };

  const actionCodeSettings = {
    url: "http://127.0.0.1:5173/sign-in",
    handleCodeInApp: true,
  };

  const signIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (name === "") {
      setNameErrorMessage("Please enter your name.");
      setIsName(false);
    }
    if (email === "") {
      setEmailErrorMessage("Please enter your email.");
      setIsEmail(false);
    }
    if (password === "") {
      setPasswordErrorMessage("Please enter your password.");
      setIsPassword(false);
    }

    if (isLoading || !isName || !isEmail || !isPassword) {
      return;
    }

    setError("");

    try {
      setIsLoading(true);

      // Create an account
      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      window.localStorage.setItem("verificationNeeded", "true");

      // Verify email
      await sendEmailVerification(credentials.user, actionCodeSettings);

      // Update the profile
      await updateProfile(credentials.user, {
        displayName: name,
      });

      logOut();
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError(error.code);
        console.log("error : " + error.code);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <div className="d-flex justify-content-center">
        <Wrapper>
          <div className="w-100 mb-1 d-flex justify-content-center">
            <h1 className="fs-2">Sign up</h1>
          </div>
          {error && (
            <Alert
              variant="danger"
              className="d-flex align-itmes-center m-0 mt-3 w-100"
              dismissible
            >
              <p>
                <span>
                  {error === "auth/email-already-in-use" &&
                    "This email is already in use."}
                  {error === "auth/account-exists-with-different-credential" &&
                    "Email is invalid or already taken."}
                  {error === "auth/invalid-email" &&
                    "The email address is not valid."}
                  {error === "auth/too-many-requests" &&
                    "Too many attempts. Please try again after some delay."}
                  {error === "auth/network-request-failed" &&
                    "A network error has occurred. Please try again."}
                  {error === "auth/web-storage-unsupported" &&
                    "Your browser does not support web storage. Please try again."}
                </span>
              </p>
            </Alert>
          )}
          <Alert variant="light" className="mt-3 py-4">
            <Form
              onSubmit={signIn}
              className="d-flex"
              style={{
                width: "340px",
                flexDirection: "column",
                gap: "15px",
              }}
            >
              <Form.Group controlId="name" className="mb-2">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  className="border-none mt-1 mb-1"
                  onChange={handleName}
                  onKeyDown={noSpace}
                  name="name"
                  value={name}
                  type="text"
                  maxLength={20}
                />
                {!isName && (
                  <div className="mt-2 text-danger">{nameErrorMessage}</div>
                )}
              </Form.Group>
              <Form.Group controlId="email" className="mb-2">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  className="border-none mt-1 mb-1"
                  onChange={handleEmail}
                  onKeyDown={noSpace}
                  name="email"
                  value={email}
                  type="text"
                  maxLength={50}
                />
                {!isEmail && (
                  <div className="mt-2 text-danger">{emailErrorMessage}</div>
                )}
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  className="border-none mt-1 mb-1"
                  onChange={handlePassword}
                  onKeyDown={noSpace}
                  name="password"
                  value={password}
                  type="password"
                  maxLength={20}
                />
                {!isPassword && (
                  <div className="mt-2 text-danger">{passwordErrorMessage}</div>
                )}
              </Form.Group>
              <Button type="submit" className="fw-bold">
                {isLoading ? "Loading..." : "Sign up"}
              </Button>
            </Form>
            <Switcher className="d-flex justify-content-between">
              <Button onClick={reset} type="button" variant="outline-warning">
                Reset
              </Button>
              <Link to="/sign-in">Sign in</Link>
            </Switcher>
          </Alert>
          <div className="w-100 d-flex justify-content-between align-items-center">
            <span
              className="w-50 border border-secondary"
              style={{ height: 0 }}
            ></span>
            <span className="mx-3">OR</span>
            <span
              className="w-50 border border-secondary"
              style={{ height: 0 }}
            ></span>
          </div>
          <Alert variant="light" className="w-100 mt-3 py-4">
            <GoogleButton />
            <GithubButton />
          </Alert>
        </Wrapper>
      </div>
    </Container>
  );
}
