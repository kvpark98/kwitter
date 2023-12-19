import { useState } from "react";
import { FirebaseError } from "firebase/app";
import { sendSignInLinkToEmail } from "firebase/auth";
import { auth } from "../firebase";
import { Switcher, Wrapper } from "../components/auth-components";
import { Button, Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { Link } from "react-router-dom";

export default function SendSignInLink() {
  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState("");

  const [error, setError] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");

  const [isEmail, setIsEmail] = useState(false);

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

      //Send sign in link
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);

      window.localStorage.setItem("emailForSignIn", email);
      window.localStorage.setItem("signInEmailSent?", "True");
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError(error.code);
        console.log(error.code);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const actionCodeSettings = {
    url: "http://127.0.0.1:5173/sign-in-with-email",
    handleCodeInApp: true,
  };

  console.log("user : " + auth.currentUser);
  console.log("emailVerified : " + auth.currentUser?.emailVerified);

  return (
    <Container>
      <div className="d-flex justify-content-center">
        <Wrapper>
          <div className="w-100 mb-1 d-flex justify-content-center">
            <h1 className="fs-2">Send sign in link</h1>
          </div>
          {window.localStorage.getItem("signInEmailSent?") === "True" && (
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
                  {error === "auth/invalid-login-credentials" &&
                    "Incorrect email or password. Please try again."}
                  {error === "auth/too-many-requests" &&
                    "Too many attempts. Please try again later."}
                  {error === "auth/account-exists-with-different-credential" &&
                    "Email is invalid or already taken."}
                </span>
              </p>
            </Alert>
          )}
          {auth.currentUser && auth.currentUser?.emailVerified === false && (
            <Alert
              variant="danger"
              className="d-flex align-itmes-center m-0 mt-3 w-100"
              dismissible
            >
              <p>
                <span>
                  Your email was not verified. Please go to your email and click
                  the link for verification.
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
              <Form.Group controlId="email" className="mb-2">
                <Form.Label>
                  Enter your enrolled email address and we will send you a link
                  for sign in.
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
                {!isEmail && (
                  <div className="mt-2 text-danger">{emailErrorMessage}</div>
                )}
              </Form.Group>
              <Button type="submit" className="fw-bold">
                {isLoading ? "Loading..." : "Send sign in email"}
              </Button>
            </Form>
            <Switcher>
              <Link to="/sign-in">Sign in &rarr;</Link>
            </Switcher>
          </Alert>
        </Wrapper>
      </div>
    </Container>
  );
}
