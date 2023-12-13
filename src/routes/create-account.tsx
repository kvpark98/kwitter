import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { Switcher, Title, Wrapper } from "../components/auth-components";
import GithubButton from "../components/github-btn";
import GoogleButton from "../components/google-btn";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

export default function CreateAccount() {
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

  const [showEmailVerificationModal, setShowEmailVerificationModal] =
    useState(false);

  const handleShowEmailVerificationModal = () =>
    setShowEmailVerificationModal(true);

  const handleCloseEmailVerificationModal = async () => {
    setShowEmailVerificationModal(false);
    logOut();
  };

  const [showErrorModal, setShowErrorModal] = useState(false);

  const handleShowErrorModal = () => setShowErrorModal(true);

  const handleCloseErrorModal = async () => {
    setShowErrorModal(false);
  };

  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setName(value.replace(/\s/gi, ""));
    if (value !== "") {
      if (value.length < 3) {
        setNameErrorMessage("Please enter at least 3 characters.");
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
    const regex =
      /^[A-Za-z0-9]{3,}([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]{3,}([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
    setEmail(value.replace(/\s/gi, ""));
    if (value !== "") {
      if (!regex.test(value)) {
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
    const regex = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{8,}$/;
    setPassword(value.replace(/\s/gi, ""));
    if (value !== "") {
      if (!regex.test(value)) {
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
    navigate("/login");
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

      // Verify email
      await sendEmailVerification(credentials.user);

      // Update the profile
      await updateProfile(credentials.user, {
        displayName: name,
      });

      // Pop up Email verification modal
      handleShowEmailVerificationModal();
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError(error.code);
        handleShowErrorModal();
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Wrapper>
      <Title>Create account</Title>
      <Form
        onSubmit={signIn}
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
            onChange={handleName}
            onKeyDown={noSpace}
            name="name"
            value={name}
            type="text"
            placeholder="Name"
            maxLength={20}
          />
          {!isName && (
            <div className="mt-1 text-center text-danger">
              {nameErrorMessage}
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
          {isLoading ? "Loading..." : "Create Account"}
        </Button>
      </Form>
      <Switcher>
        <Link to="/login">Login &rarr;</Link>
      </Switcher>
      {/* Email Verification Modal */}
      <Modal
        show={showEmailVerificationModal}
        onHide={handleCloseEmailVerificationModal}
        backdrop="static"
        keyboard={false}
      >
        <Alert variant="warning" className="m-0 p-0">
          <Modal.Body>
            <Alert.Heading className="mb-3">
              Email Verification needed
            </Alert.Heading>
            <p>
              <span>
                Please go to your email and click the link for verification in
                order to login.
              </span>
            </p>
          </Modal.Body>
          <Modal.Footer className="border-0 pt-0 p-3">
            <Button variant="dark" onClick={handleCloseEmailVerificationModal}>
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
                {error === "auth/email-already-in-use" &&
                  "This email is already in use. Please try again with another email."}
                {error === "auth/too-many-requests" &&
                  "Too many attempts. Please try again later."}
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
  );
}
