import { useState } from "react";
import { FirebaseError } from "firebase/app";
import { sendSignInLinkToEmail } from "firebase/auth";
import { auth } from "../firebase";
import { Switcher, Wrapper } from "../components/auth-components";
import { Button, Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/header";

export default function SendSignInLink() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState("");

  const [isEmail, setIsEmail] = useState(false);

  const [isPasswordResetLinkSent, setIsPasswordResetLinkSent] = useState(false);

  const [error, setError] = useState("");

  const [emailErrorMessage, setEmailErrorMessage] = useState("");

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

  const reset = () => {
    setEmail("");

    setIsEmail(false);

    setEmailErrorMessage("");
  };

  const actionCodeSettings = {
    url: "http://127.0.0.1:5173/sign-in-with-email",
    handleCodeInApp: true,
  };

  const sendSignInLink = async (event: React.FormEvent<HTMLFormElement>) => {
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

      // Send sign in link
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);

      setIsPasswordResetLinkSent(true);

      setTimeout(() => {
        navigate("/sign-in");
      }, 7000);
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError(error.code);
        console.log("error : " + error.code);
        setIsPasswordResetLinkSent(false);
      }
    } finally {
      setIsLoading(false);
    }
  };

  console.log("user : " + auth.currentUser);
  console.log("emailVerified : " + auth.currentUser?.emailVerified);

  return (
    <div className="h-100">
      <Header />
      <Container>
        <div className="d-flex justify-content-center">
          <Wrapper>
            <div className="w-100 mb-1 d-flex justify-content-center">
              <h1 className="fs-2">Send sign in link</h1>
            </div>
            {isPasswordResetLinkSent && (
              <Alert
                variant="warning"
                className="d-flex align-itmes-center m-0 mt-3 w-100"
                dismissible
              >
                <p>
                  Check your email for a link to sign in. If it doesn’t appear
                  within a few minutes, check your spam folder.
                </p>
              </Alert>
            )}
            {error && (
              <Alert
                variant="danger"
                className="d-flex align-itmes-center m-0 mt-3 w-100"
                dismissible
              >
                <p>
                  <span>
                    {error === "auth/invalid-action-code" &&
                      "The link is malformed or has already been used. Please get a new link."}
                    {error === "auth/too-many-requests" &&
                      "Too many attempts. Please try again after some delay."}
                    {error === "auth/network-request-failed" &&
                      "A network error has occurred. Please reopen the page."}
                    {error === "auth/requires-recent-login" &&
                      "Your last sign-in time does not meet the security threshold. Please sign in again."}
                    {error === "auth/invalid-user-token" &&
                      "Your credential is no longer valid. Please sign in again."}
                    {error === "auth/user-token-expired" &&
                      "Your credential has expired. Please sign in again."}
                    {error === "auth/web-storage-unsupported" &&
                      "Your browser does not support web storage. Please try again."}
                  </span>
                </p>
              </Alert>
            )}
            <Alert variant="light" className="mt-3 py-4">
              <Form
                onSubmit={sendSignInLink}
                className="d-flex"
                style={{
                  width: "340px",
                  flexDirection: "column",
                  gap: "15px",
                }}
              >
                <Form.Group controlId="email">
                  <Form.Label>
                    Enter your enrolled email address and we will send you a
                    link for sign in.
                  </Form.Label>
                  <Form.Control
                    className="border-none mt-1 mb-1"
                    onChange={handleEmail}
                    onKeyDown={noSpace}
                    name="email"
                    value={email}
                    type="text"
                    maxLength={50}
                  />
                  {!isEmail && emailErrorMessage && (
                    <div className="mt-2 text-danger">{emailErrorMessage}</div>
                  )}
                </Form.Group>
                <Button type="submit" className="mt-2 fw-bold">
                  {isLoading ? "Loading..." : "Send sign in email"}
                </Button>
              </Form>
              <Switcher className="d-flex justify-content-between">
                <Button onClick={reset} type="button" variant="outline-warning">
                  Reset
                </Button>
                <Link to="/sign-in" className="btn btn-outline-success">
                  Sign in
                </Link>
              </Switcher>
            </Alert>
          </Wrapper>
        </div>
      </Container>
    </div>
  );
}
