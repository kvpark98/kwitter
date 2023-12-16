import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import {
  sendSignInLinkToEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";
import { Switcher, Title, Wrapper } from "../components/auth-components";
import GithubButton from "../components/github-btn";
import { Button, Container } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import GoogleButton from "../components/google-btn";
import Alert from "react-bootstrap/Alert";

export default function Login() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyEmail, setVerifyEmail] = useState("");

  const [error, setError] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [verifyEmailErrorMessage, setVerifyEmailErrorMessage] = useState("");

  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isVerifyEmail, setIsVerifyEmail] = useState(false);

  const [showFindPasswordModal, setShowFindPasswordModal] = useState(false);
  const handleCloseFindPasswordModal = () => {
    setShowFindPasswordModal(false);
    setVerifyEmail("");
    setVerifyEmailErrorMessage("");
  };

  const handleShowFindPasswordModal = () => setShowFindPasswordModal(true);

  const [showFindPasswordSuccessModal, setShowFindPasswordSuccessModal] =
    useState(false);
  const handleCloseFindPasswordSuccessModal = () =>
    setShowFindPasswordSuccessModal(false);
  const handleShowFindPasswordSuccessModal = () => {
    if (verifyEmail) {
      setShowFindPasswordSuccessModal(true);
      handleCloseFindPasswordModal();
    }
  };

  const [showErrorModal, setShowErrorModal] = useState(false);
  const handleShowErrorModal = () => setShowErrorModal(true);
  const handleCloseErrorModal = () => setShowErrorModal(false);

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const regEmail =
      /^[A-Za-z0-9]{3,}([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]{3,}([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
    setEmail(value.replace(/\s/gi, ""));
    if (value) {
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
    setPassword(value.replace(/\s/gi, ""));
    if (value !== "") {
      setIsPassword(true);
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

  const login = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (email === "") {
      setEmailErrorMessage("Please enter your email.");
      setIsEmail(false);
    }
    if (password === "") {
      setPasswordErrorMessage("Please enter your password.");
      setIsPassword(false);
    }

    if (isLoading || !isEmail || !isPassword) {
      return;
    }

    setError("");

    try {
      setIsLoading(true);

      // Log in
      await signInWithEmailAndPassword(auth, email, password);
      window.sessionStorage.removeItem("PasswordChanged?");

      // Ridirect to the home page
      if (auth.currentUser?.emailVerified === true) {
        navigate("/");
      } else {
        handleShowErrorModal();
      }
    } catch (error) {
      handleShowErrorModal();
      if (error instanceof FirebaseError) {
        setError(error.code);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const regPassword =
      /^[A-Za-z0-9]{3,}([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]{3,}([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
    setVerifyEmail(value.replace(/\s/gi, ""));
    if (value !== "") {
      if (!regPassword.test(value)) {
        setVerifyEmailErrorMessage("Not a valid email format.");
        setIsVerifyEmail(false);
      } else {
        setIsVerifyEmail(true);
      }
    } else {
      setVerifyEmailErrorMessage("Please enter your email.");
      setIsVerifyEmail(false);
    }
  };

  const actionCodeSettings = {
    url: "http://127.0.0.1:5173/one-time-login",
    handleCodeInApp: true,
  };

  const verify = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (verifyEmail === "") {
      setVerifyEmailErrorMessage("Please enter your email.");
      setIsVerifyEmail(false);
    }

    if (!isVerifyEmail) return;
    try {
      await sendSignInLinkToEmail(auth, verifyEmail, actionCodeSettings);
      window.localStorage.setItem("emailForSignIn", verifyEmail);
      handleShowFindPasswordSuccessModal();
    } catch (error) {
      console.log(error);
    }
  };

  console.log("user : " + auth.currentUser);
  console.log("emailVerified : " + auth.currentUser?.emailVerified);

  return (
    <Container>
      <div className="d-flex justify-content-center">
        <Wrapper>
          <Title>Login</Title>
          {window.sessionStorage.getItem("PasswordChanged?") === "Success" && (
            <Alert
              variant="success"
              className="d-flex align-itmes-center m-0 mt-3"
              dismissible
            >
              <p>New password set successfully.</p>
            </Alert>
          )}
          <Form
            onSubmit={login}
            className="d-flex mt-3"
            style={{
              width: "420px",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <Form.Group>
              <Form.Control
                style={{
                  width: "100%",
                  borderRadius: "50px",
                  border: "none",
                }}
                onChange={handleEmail}
                onKeyDown={noSpace}
                name="email"
                value={email}
                type="text"
                placeholder="Email"
                maxLength={50}
              />
              {!isEmail && (
                <div className="mt-1 text-center text-danger">
                  {emailErrorMessage}
                </div>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Control
                style={{
                  width: "100%",
                  borderRadius: "50px",
                  border: "none",
                }}
                onChange={handlePassword}
                onKeyDown={noSpace}
                name="password"
                value={password}
                type="password"
                placeholder="Password"
                maxLength={20}
              />
              {!isPassword && (
                <div className="mt-1 text-center text-danger">
                  {passwordErrorMessage}
                </div>
              )}
            </Form.Group>
            <Button type="submit" className="rounded-pill fw-bold">
              {isLoading ? "Loading..." : "Login"}
            </Button>
          </Form>
          <Switcher>
            <div>
              <Link to="/create-account">Create account &rarr;</Link>
            </div>
            <div>
              <Button variant="link" onClick={handleShowFindPasswordModal}>
                Forgot my password
              </Button>
            </div>
          </Switcher>
          {/* Find Password Modal */}
          <Modal
            show={showFindPasswordModal}
            onHide={handleCloseFindPasswordModal}
            backdrop="static"
            keyboard={false}
          >
            <Alert variant="light" className="m-0 p-0">
              <Form onSubmit={verify}>
                <Modal.Body>
                  <Alert.Heading className="mb-3">
                    Please enter your email
                  </Alert.Heading>
                  <Form.Control
                    onChange={handleVerifyEmail}
                    onKeyDown={noSpace}
                    name="findPassword"
                    value={verifyEmail}
                    type="text"
                    placeholder="Email"
                    maxLength={50}
                  ></Form.Control>
                  {!isVerifyEmail && (
                    <div className="mt-2 text-center text-danger">
                      {verifyEmailErrorMessage}
                    </div>
                  )}
                </Modal.Body>
                <Modal.Footer className="border-0 pt-0 p-3">
                  <Button variant="dark" onClick={handleCloseFindPasswordModal}>
                    Close
                  </Button>
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Modal.Footer>
              </Form>
            </Alert>
          </Modal>
          {/* Find Password Success Modal */}
          <Modal
            show={showFindPasswordSuccessModal}
            onHide={handleCloseFindPasswordSuccessModal}
            backdrop="static"
            keyboard={false}
          >
            <Alert variant="warning" className="m-0 p-0">
              <Modal.Body>
                <Alert.Heading className="mb-3">
                  Sign in with email
                </Alert.Heading>
                <p>
                  <span>
                    Check your email for a link to sign in. If it doesn’t appear
                    within a few minutes, check your spam folder.
                  </span>
                </p>
              </Modal.Body>
              <Modal.Footer className="border-0 pt-0 p-3">
                <Button
                  variant="dark"
                  onClick={handleCloseFindPasswordSuccessModal}
                >
                  Close
                </Button>
              </Modal.Footer>
            </Alert>
          </Modal>
          {/* Error Modal */}
          <Modal
            show={showErrorModal}
            onHide={handleCloseErrorModal}
            backdrop="static"
            keyboard={false}
          >
            <Alert variant="danger" className="m-0 p-0">
              <Modal.Body>
                <Alert.Heading className="mb-3">Error</Alert.Heading>
                <p>
                  <span>
                    {error === "auth/invalid-login-credentials" &&
                      "Incorrect email or password. Please try again."}
                    {error === "auth/too-many-requests" &&
                      "Too many attempts. Please try again later."}
                    {auth.currentUser &&
                      auth.currentUser?.emailVerified === false &&
                      "Your email was not verified. Please go to your email and click the link for verification in order to login."}
                  </span>
                </p>
              </Modal.Body>
              <Modal.Footer className="border-0 pt-0 p-3">
                <Button variant="dark" onClick={handleCloseErrorModal}>
                  Ok
                </Button>
              </Modal.Footer>
            </Alert>
          </Modal>
          <div className="d-flex justify-content-between">
            <GoogleButton />
            <GithubButton />
          </div>
        </Wrapper>
      </div>
    </Container>
  );
}
