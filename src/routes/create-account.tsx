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
import styles from "../App.module.css";

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

  const [showEmailAlreadyInUseErrorModal, setShowEmailAlreadyInUseErrorModal] =
    useState(false);

  const handleShowEmailAlreadyInUseErrorModal = () =>
    setShowEmailAlreadyInUseErrorModal(true);

  const handleCloseEmailAlreadyInUseErrorModal = async () => {
    setShowEmailAlreadyInUseErrorModal(false);
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
      /^[A-Za-z0-9]{4,}([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]{3,}([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
    setEmail(value.replace(/\s/gi, ""));
    if (value !== "") {
      if (!regex.test(value)) {
        setEmailErrorMessage("Not a valid email format.");
        setIsEmail(false);
      } else if (error) {
        setError("This email is already in use.");
        setEmailErrorMessage("This email is already in use.");
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
    const regex = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{6,}$/;
    setPassword(value.replace(/\s/gi, ""));
    if (value !== "") {
      if (!regex.test(value)) {
        setPasswordErrorMessage(
          "Please enter at least 6 characters including numbers, English, and special characters."
        );
        setIsPassword(false);
      } else {
        setIsPassword(true);
      }
    } else {
      setPasswordErrorMessage("Please enter your passwords.");
      setIsPassword(false);
    }
  };

  const logOut = () => {
    auth.signOut();
    navigate("/login");
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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
      setPasswordErrorMessage("Please enter your passwords.");
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
        setError("This email is already in use.");
        handleShowEmailAlreadyInUseErrorModal();
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Wrapper>
      <Title>Create account</Title>
      <Form
        onSubmit={onSubmit}
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
            name="name"
            value={name}
            type="text"
            placeholder="Name"
            maxLength={20}
          />
          {isName ? (
            <div className="mt-1 text-center" style={{ color: "#198754" }}>
              Good!
            </div>
          ) : (
            <div className="mt-1 text-center" style={{ color: "#dc3545" }}>
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
            name="email"
            value={email}
            type="text"
            placeholder="Email"
            maxLength={50}
          />
          {isEmail ? (
            <div className="mt-1 text-center" style={{ color: "#198754" }}>
              Good!
            </div>
          ) : (
            <div className="mt-1 text-center" style={{ color: "#dc3545" }}>
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
            name="password"
            value={password}
            type="password"
            placeholder="Password"
            maxLength={20}
          />
          {isPassword ? (
            <div className="mt-1 text-center" style={{ color: "#198754" }}>
              Good!
            </div>
          ) : (
            <div className="mt-1 text-center" style={{ color: "#dc3545" }}>
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
        <Modal.Header className="border-0 text-dark fw-bold fs-4">
          Email Verification needed
        </Modal.Header>
        <Modal.Body>
          <span className="text-dark">
            Please go to your email and click the link for verification.
          </span>
        </Modal.Body>
        <Modal.Footer className="border-0">
          <Button variant="primary" onClick={handleCloseEmailVerificationModal}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Email-already-in-use Modal */}
      <Modal
        show={showEmailAlreadyInUseErrorModal}
        onHide={handleCloseEmailAlreadyInUseErrorModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header className="border-0 text-dark fw-bold fs-4">
          Error
        </Modal.Header>
        <Modal.Body>
          <span className="text-danger">{error}</span>
        </Modal.Body>
        <Modal.Footer className="border-0">
          <Button
            variant="primary"
            onClick={handleCloseEmailAlreadyInUseErrorModal}
          >
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="d-flex justify-content-between">
        <GoogleButton />
        <GithubButton />
      </div>
    </Wrapper>
  );
}
