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

  const [isEmail, setIsEmail] = useState(false);

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

  const logOut = () => {
    auth.signOut();
    navigate("/sign-in");
  };

  const redirect = () => {
    logOut();
    navigate("/sign-in");
  };

  useEffect(() => {
    window.localStorage.removeItem("error");
  }, []);

  const signInWithEmail = async (event: React.FormEvent<HTMLFormElement>) => {
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

      // Sign in with email
      if (isSignInWithEmailLink(auth, window.location.href)) {
        await signInWithEmailLink(auth, email, window.location.href);
        window.localStorage.setItem("isSignedInWithEmail", "true");
        navigate("/reset-password");
      } else {
        redirect();
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError(error.code);
        window.localStorage.setItem("error", error.code);
        console.log("error : " + error.code);
        if (error.code !== "auth/invalid-email") {
          logOut();
        }
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
      {!error || error === "auth/invalid-email" ? (
        <div className="d-flex justify-content-center">
          <Wrapper>
            <div className="w-100 mb-1 d-flex justify-content-center">
              <h1 className="fs-2">Sign in with email</h1>
            </div>
            {isSignInWithEmailLink(auth, window.location.href) && (
              <Alert
                variant="success"
                className="d-flex align-itmes-center m-0 mt-3 w-100"
              >
                <p>
                  Your email was verified. Please enter your email one more
                  time.
                </p>
              </Alert>
            )}
            {error === "auth/invalid-email" && (
              <Alert
                variant="danger"
                className="d-flex align-itmes-center m-0 mt-3 w-100"
                dismissible
              >
                <p>
                  <span>
                    {error === "auth/invalid-email" &&
                      "The email provided does not match the sign-in email address."}
                  </span>
                </p>
              </Alert>
            )}
            <Alert variant="light" className="mt-3 py-4">
              <Form
                onSubmit={signInWithEmail}
                className="d-flex"
                style={{
                  width: "340px",
                  flexDirection: "column",
                  gap: "15px",
                }}
              >
                <Form.Group controlId="email" className="mb-2">
                  <Form.Label>
                    Please enter the email address to which the sign-in link was
                    originally sent.
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
                  {isLoading ? "Loading..." : "Sign in with email"}
                </Button>
              </Form>
            </Alert>
          </Wrapper>
        </div>
      ) : (
        <div className="d-flex justify-content-center align-items-center">
          <Alert
            variant="danger"
            className="m-0 mt-5"
            style={{ width: "450px" }}
          >
            <Alert.Heading className="mb-4">
              Oh snap! You got an error!
            </Alert.Heading>
            <p>
              <span>
                {error === "auth/invalid-action-code" &&
                  "The link is malformed or has already been used. Please try again."}
                {error === "auth/too-many-requests" &&
                  "Too many attempts. Please try again after some delay."}
                {error === "auth/network-request-failed" &&
                  "A network error has occurred. Please try again."}
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
            <hr />
            <div className="d-flex justify-content-end">
              <Button
                onClick={redirect}
                variant="outline-danger"
                className="fw-bold"
              >
                return to sign in
              </Button>
            </div>
          </Alert>
        </div>
      )}
    </Container>
  );
}
