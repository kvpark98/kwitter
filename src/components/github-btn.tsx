import {
  GithubAuthProvider,
  browserSessionPersistence,
  signInWithPopup,
} from "firebase/auth";
import styled from "styled-components";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Modal } from "react-bootstrap";
import { useState } from "react";
import { FirebaseError } from "firebase/app";

const Logo = styled.img`
  height: 25px;
`;

export default function GithubButton() {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);
  const handleShowErrorModal = () => setShowErrorModal(true);
  const handleCloseErrorModal = () => setShowErrorModal(false);

  const onClick = async () => {
    try {
      // Existing and future Auth states are now persisted in the current
      // session only. Closing the window would clear any existing state even
      // if a user forgets to sign out.
      auth.setPersistence(browserSessionPersistence);
      const provider = new GithubAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError(error.code);
        console.log(error);
        handleShowErrorModal();
      }
    }
  };
  return (
    <div>
      <Button
        variant="outline-secondary"
        onClick={onClick}
        className="w-100 d-flex justify-content-center align-items-center"
      >
        <Logo src="/github-logo.svg" />
        <span className="ms-2">Continue with GitHub</span>
      </Button>
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
                  "Incorrect email or password."}
                {error === "auth/account-exists-with-different-credential" &&
                  "Email is invalid or already taken."}
                {error === "auth/too-many-requests" &&
                  "Too many attempts. Please try again after some delay."}
                {error === "auth/network-request-failed" &&
                  "A network error has occurred. Please reopen the page."}
                {auth.currentUser &&
                  auth.currentUser?.emailVerified === false &&
                  "Your email was not verified. Please go to your email and click on the link for verification in order to login."}
              </span>
            </p>
          </Modal.Body>
          <Modal.Footer className="border-0 pt-0 p-3">
            <Button variant="outline-danger" onClick={handleCloseErrorModal}>
              Ok
            </Button>
          </Modal.Footer>
        </Alert>
      </Modal>
    </div>
  );
}
