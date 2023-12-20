import { useEffect, useState } from "react";
import { FirebaseError } from "firebase/app";
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { auth } from "../firebase";
import { Wrapper } from "../components/auth-components";
import { Button, Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { useNavigate } from "react-router-dom";

export default function SignInWithEmail() {
  const navigate = useNavigate();

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

  useEffect(() => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      window.localStorage.setItem("clickedEmailLink?", "True");
      window.localStorage.removeItem("signInEmailSent?");
    }
  }, []);

  const signInwithEmail = async (event: React.FormEvent<HTMLFormElement>) => {
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

        window.localStorage.setItem("signedInWithEmail?", "True");

        window.localStorage.removeItem("clickedEmailLink?");
        window.localStorage.removeItem("emailForSignIn");

        navigate("/reset-password");
      }
    } catch (error) {
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

  return (
    <Container>
      <div className="d-flex justify-content-center">
        <Wrapper>
          <div className="w-100 mb-1 d-flex justify-content-center">
            <h1 className="fs-2">Sign in with email</h1>
          </div>
          {window.localStorage.getItem("clickedEmailLink?") === "True" && (
            <Alert
              variant="success"
              className="d-flex align-itmes-center m-0 mt-3 w-100"
              dismissible
            >
              <p>
                Your email was verified successfully. Please enter your verified
                email one more time.
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
                    "It looks like you clicked on an invalid sign in link. Please try again."}
                  {error === "auth/too-many-requests" &&
                    "Too many attempts. Please try again later."}
                  {error === "auth/invalid-email" &&
                    "Email is invalid. Please enter the email where the link was sent to."}
                </span>
              </p>
            </Alert>
          )}
          <Alert variant="light" className="mt-3 py-4">
            <Form
              onSubmit={signInwithEmail}
              className="d-flex"
              style={{
                width: "340px",
                flexDirection: "column",
                gap: "15px",
              }}
            >
              <Form.Group controlId="email" className="mb-2">
                <Form.Label>Enter your verified email address.</Form.Label>
                <Form.Control
                  className="border-none mt-1 mb-1"
                  onChange={handleEmail}
                  onKeyDown={noSpace}
                  name="email"
                  value={email}
                  // {...(window.localStorage.getItem("emailForSignIn") !==
                  //   null && {
                  //   defaultValue: `${window.localStorage.getItem(
                  //     "emailForSignIn"
                  //   )}`,
                  // })}
                  type="text"
                  maxLength={50}
                />
                {!isEmail && (
                  <div className="mt-2 text-danger">{emailErrorMessage}</div>
                )}
              </Form.Group>
              <Button type="submit" className="fw-bold">
                {isLoading ? "Loading..." : "Sign in with email"}
              </Button>
            </Form>
          </Alert>
        </Wrapper>
      </div>
    </Container>
  );
}
