import {
  GithubAuthProvider,
  browserSessionPersistence,
  signInWithPopup,
} from "firebase/auth";
import styled from "styled-components";
import { auth } from "../../firebase";
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

  const signInWithGitHub = async () => {
    try {
      auth.setPersistence(browserSessionPersistence);

      const provider = new GithubAuthProvider();

      await signInWithPopup(auth, provider);

      navigate("/");
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError(error.code);
        console.log(error.code);

        handleShowErrorModal();
      }
    }
  };
  return (
    <div>
      <Button
        variant="outline-secondary"
        onClick={signInWithGitHub}
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
              {error === "auth/account-exists-with-different-credential" &&
                "Apologies, but this email is already associated with a different method of signing in."}
              {error === "auth/cancelled-popup-request" &&
                "Oops! It seems the request for authentication pop-up was unexpectedly cancelled."}
              {error === "auth/popup-blocked" &&
                "Hold on! Our attempt to authenticate is being thwarted by a popup blocker. Please disable it and give it another shot."}
              {error === "auth/popup-closed-by-user" &&
                "It looks like you closed the authentication popup. Let's try that again, shall we?"}
              {error === "auth/too-many-requests" &&
                "Excessive attempts. Please retry after a brief delay."}
              {error === "auth/network-request-failed" &&
                "An unexpected network error has occurred. Kindly reopen the page."}
              {error === "auth/unauthorized-domain" &&
                "Uh-oh! This authentication domain is not authorized. Double-check your credentials and try once more."}
              {error === "auth/internal-error" &&
                "An internal error occurred. Please try again later or contact support for assistance."}
              {error === "auth/unknown" &&
                "An unexpected error occurred. Please try again or contact support."}
            </p>
          </Modal.Body>
          <Modal.Footer className="border-0 pt-0 p-3">
            <Button variant="outline-dark" onClick={handleCloseErrorModal}>
              Close
            </Button>
          </Modal.Footer>
        </Alert>
      </Modal>
    </div>
  );
}
