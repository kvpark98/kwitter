import { useEffect, useState } from "react";
import { FirebaseError } from "firebase/app";
import {
  browserSessionPersistence,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from "firebase/auth";
import { auth } from "../../firebase";
import { Switcher, Wrapper } from "../../components/styles/auth-components";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { Link, useNavigate } from "react-router-dom";

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

    if (value !== "") {
      if (!regEmail.test(value)) {
        setEmailErrorMessage("Email format is not valid.");
        setIsEmail(false);

        document.getElementById("email")?.classList.add("form-control-invalid");
      } else {
        setIsEmail(true);

        document
          .getElementById("email")
          ?.classList.remove("form-control-invalid");
      }
    } else {
      setEmailErrorMessage("");
      setIsEmail(false);

      document
        .getElementById("email")
        ?.classList.remove("form-control-invalid");
    }
  };

  const noSpace = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === "Space") {
      event.preventDefault();
    }
  };

  const signOut = () => {
    auth.signOut();
    navigate("/sign-in");
  };

  const reset = () => {
    setEmail("");

    setIsEmail(false);

    setEmailErrorMessage("");

    document.getElementById("email")?.classList.remove("form-control-invalid");
  };

  useEffect(() => {
    window.localStorage.removeItem("error");
  }, []);

  const signInWithEmail = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (email === "") {
      setEmailErrorMessage("Please enter your email.");
      setIsEmail(false);

      document.getElementById("email")?.classList.add("form-control-invalid");
    }

    if (isLoading || !isEmail) {
      return;
    }

    setError("");

    try {
      setIsLoading(true);

      auth.setPersistence(browserSessionPersistence);

      // Sign-in with email
      if (isSignInWithEmailLink(auth, window.location.href)) {
        await signInWithEmailLink(auth, email, window.location.href);

        window.sessionStorage.setItem("isSignedInWithEmail", "Do not delete");

        navigate("/reset-password");
      } else {
        signOut();
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError(error.code);
        console.log("error : " + error.code);

        window.localStorage.setItem("error", error.code);

        window.sessionStorage.removeItem("isSignedInWithEmail");

        if (
          error.code !== "auth/user-disabled" &&
          error.code !== "auth/user-not-found" &&
          error.code !== "auth/invalid-email" &&
          error.code !== "auth/too-many-requests"
        ) {
          signOut();
        }
      }
      reset();
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
    <div className="h-100">
      <div className="wrap">
        <Wrapper>
          <div className="mb-2">
            <h1 className="fs-2">Sign In With Email Link</h1>
          </div>
          {isSignInWithEmailLink(auth, window.location.href) && (
            <Alert variant="success" className="m-0 mt-3 w-100">
              <p>
                Your email link has been successfully validated. Please
                reconfirm your email address.
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
                {error === "auth/user-disabled" &&
                  "Your account has been disabled. Please contact support for further assistance."}
                {error === "auth/user-not-found" &&
                  "We couldn't find a user corresponding to the provided email link. Make sure the link is correct, or consider signing up if you haven't already."}
                {error === "auth/invalid-email" &&
                  "The provided email does not correspond to the registered sign-in address."}
                {error === "auth/too-many-requests" &&
                  "Due to security reasons, we've temporarily blocked your request. Please wait a moment and try again, or contact support for further assistance."}
                {error === "auth/expired-action-code" &&
                  "The email link has expired. Please request a new link and ensure you use it within the specified time limit."}
                {error === "auth/invalid-action-code" &&
                  "The provided link is either incorrect or has already been utilized. Please obtain a new link."}
                {error === "auth/internal-error" &&
                  "An internal error occurred. Please try again later or contact support for assistance."}
                {error === "auth/unknown" &&
                  "An unexpected error occurred. Please try again or contact support."}
              </p>
            </Alert>
          )}
          <Alert variant="light" className="mt-3 px-4 py-4 w-100">
            <Form
              onSubmit={signInWithEmail}
              className="d-flex flex-column row-gap-3"
            >
              <Form.Group>
                <Form.Label htmlFor="email">
                  Please provide the email address to which the initial link was
                  sent.
                </Form.Label>
                <Form.Control
                  className="border-none mt-1 mb-1"
                  onChange={handleEmail}
                  onKeyDown={noSpace}
                  id="email"
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
                {isLoading ? "Loading..." : "One-time Login"}
              </Button>
            </Form>
            <Switcher className="d-flex justify-content-between">
              <Button onClick={reset} type="button" variant="outline-info">
                Reset
              </Button>
              <Link to="/sign-in" className="btn btn-outline-success">
                Sign In
              </Link>
            </Switcher>
          </Alert>
        </Wrapper>
      </div>
    </div>
  );
}
