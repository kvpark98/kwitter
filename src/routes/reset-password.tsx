import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { isSignInWithEmailLink, updatePassword } from "firebase/auth";
import { auth } from "../firebase";
import { Wrapper } from "../components/auth-components";
import { Button, Container } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

export default function ResetPassword() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const [newPassword, setNewPassword] = useState("");

  const [error, setError] = useState("");
  const [newPasswordErrorMessage, setNewPasswordErrorMessage] = useState("");

  const [isNewPassword, setIsNewPassword] = useState(false);

  const [showErrorModal, setShowErrorModal] = useState(false);
  const handleCloseErrorModal = () => setShowErrorModal(false);
  const handleShowErrorModal = () => setShowErrorModal(true);

  const logOut = () => {
    auth.signOut();
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

  const changePassword = async (event: React.FormEvent<HTMLFormElement>) => {
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
        window.sessionStorage.setItem("PasswordChanged?", "Success");
        logOut();
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
  console.log("changed password : " + newPassword);

  return (
    <Container>
      <div className="d-flex justify-content-center align-items-center">
        <Wrapper>
          <div className="w-100 mb-1 d-flex justify-content-center">
            <h1 className="fs-1">Reset your password</h1>
          </div>
          <Alert variant="light" className="mt-3 py-4">
            <Form
              onSubmit={changePassword}
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
          </Alert>
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
        </Wrapper>
      </div>
    </Container>
  );
}
