import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { auth } from "../firebase";
import { Switcher, Title, Wrapper } from "../components/auth-components";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

export default function OneTimeLogin() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState("");

  const [error, setError] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");

  const [isEmail, setIsEmail] = useState(false);

  const [showOneTimeLoginSuccessModal, setShowOneTimeLoginSuccessModal] =
    useState(false);
  const handleShowOneTimeLoginSuccessModal = () => {
    setShowOneTimeLoginSuccessModal(true);
  };
  const handleCloseOneTimeLoginSuccessModal = () => {
    navigate("/reset-password");
    setShowOneTimeLoginSuccessModal(false);
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

  const noSpace = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === "Space") {
      event.preventDefault();
    }
  };

  const oneTimeLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (email === "") {
      setEmailErrorMessage("Please enter your email.");
      setIsEmail(false);
    }

    if (isLoading || !isEmail) {
      return;
    }

    setError("");

    try {
      setIsLoading(true);

      if (isSignInWithEmailLink(auth, window.location.href)) {
        await signInWithEmailLink(auth, email, window.location.href);
        window.localStorage.removeItem("emailForSignIn");
        handleShowOneTimeLoginSuccessModal();
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError(error.code);
        handleShowErrorModal();
        console.log(error.code);
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

  return (
    <Wrapper>
      <Title>Sign in with email</Title>
      <Form
        onSubmit={oneTimeLogin}
        style={{
          width: "100%",
          marginTop: "50px",
          marginBottom: "10px",
          display: "flex",
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
        <Button type="submit" className="rounded-pill fw-bold">
          {isLoading ? "Loading..." : "One-time Login"}
        </Button>
      </Form>
      <Switcher>
        <div>
          <Link to="/sign-in">Login &rarr;</Link>
        </div>
      </Switcher>
      {/* One-time Login Success Modal */}
      <Modal
        show={showOneTimeLoginSuccessModal}
        onHide={handleCloseOneTimeLoginSuccessModal}
        backdrop="static"
        keyboard={false}
      >
        <Alert variant="success" className="m-0 p-0">
          <Modal.Body>
            <Alert.Heading className="mb-3">
              One-time Login Success
            </Alert.Heading>
            <p>
              <span>
                You were logged in through email link. The link can be used only
                once, so please make sure to change your password.
              </span>
            </p>
          </Modal.Body>
          <Modal.Footer className="border-0 pt-0 p-3">
            <Button
              variant="dark"
              onClick={handleCloseOneTimeLoginSuccessModal}
            >
              Ok
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
                {error === "auth/invalid-action-code" &&
                  "The link from your email has already been used or expired. Please go to 'Login' page and click 'Forgot my password' again to get a new link."}
                {error === "auth/too-many-requests" &&
                  "Too many attempts. Please try again later."}
                {error === "auth/invalid-email" &&
                  "Your email is incorrect. Please enter the email where the link was sent to."}
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
    </Wrapper>
  );
}
