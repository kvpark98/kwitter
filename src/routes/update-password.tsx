import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { isSignInWithEmailLink, updatePassword } from "firebase/auth";
import { auth } from "../firebase";
import { Switcher, Title, Wrapper } from "../components/auth-components";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

export default function UpdatePassword() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const [newPassword, setNewPassword] = useState("");

  const [error, setError] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

  const [isPassword, setIsPassword] = useState(false);

  const [showFindPasswordSuccessModal, setShowFindPasswordSuccessModal] =
    useState(false);
  const handleCloseFindPasswordSuccessModal = () =>
    setShowFindPasswordSuccessModal(false);
  const handleShowFindPasswordSuccessModal = () => {
    setShowFindPasswordSuccessModal(true);
  };

  const [showErrorModal, setShowErrorModal] = useState(false);
  const handleCloseErrorModal = () => setShowErrorModal(false);
  const handleShowErrorModal = () => setShowErrorModal(true);

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const regPassword = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{8,}$/;
    setNewPassword(value.replace(/\s/gi, ""));
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

  const update = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (newPassword === "") {
      setPasswordErrorMessage("Please enter your password.");
      setIsPassword(false);
    }

    if (isLoading || !isPassword) {
      return;
    }

    setError("");

    try {
      setIsLoading(true);

      if (auth.currentUser !== null) {
        await updatePassword(auth.currentUser, newPassword);
        handleShowFindPasswordSuccessModal();
      }

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
  console.log("changed password : " + newPassword);

  return (
    <Wrapper>
      <Title>Update password</Title>
      <Form
        onSubmit={update}
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
            onChange={handlePassword}
            onKeyDown={noSpace}
            name="password"
            value={newPassword}
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
          {isLoading ? "Loading..." : "Update"}
        </Button>
      </Form>
      <Switcher>
        <div>
          <Link to="/login">Login &rarr;</Link>
        </div>
      </Switcher>
      {/* Find Password Success Modal */}
      <Modal
        show={showFindPasswordSuccessModal}
        onHide={handleCloseFindPasswordSuccessModal}
        backdrop="static"
        keyboard={false}
      >
        <Alert variant="success" className="m-0 p-0">
          <Modal.Body>
            <Alert.Heading className="mb-3">Success!</Alert.Heading>
            <p>
              <span>Your password has been updated successfully.</span>
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
                {error === "auth/invalid-action-code" &&
                  "The link from your email has already been used or expired. Please go to 'Login' page and click 'Forgot my password' again to get a new link."}
                {error === "auth/too-many-requests" &&
                  "Too many attempts. Please try again later."}
                {error === "auth/invalid-email" &&
                  "Your email is incorrect. Please try again with the same email that you entered earlier."}
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
