import { useState } from "react";
import { FirebaseError } from "firebase/app";
import {
  fetchSignInMethodsForEmail,
  sendSignInLinkToEmail,
} from "firebase/auth";
import { auth } from "../../firebase";
import { Switcher, Wrapper } from "../../components/styles/auth-components";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { Link } from "react-router-dom";
import Header from "../../components/header&footer/header";
import Footer from "../../components/header&footer/footer";

export default function SendSignInLink() {
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

  const reset = () => {
    setEmail("");

    setIsEmail(false);

    setEmailErrorMessage("");

    document.getElementById("email")?.classList.remove("form-control-invalid");
  };

  const actionCodeSettings = {
    url: "http://127.0.0.1:5173/sign-in-with-email",
    handleCodeInApp: true,
  };

  const checkIfEmailExists = async (email: string) => {
    try {
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      console.log("signInMethods:", signInMethods);

      return signInMethods;
    } catch (error) {
      console.error("Error checking email existence:", error);
      throw error;
    }
  };

  const sendSignInLink = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isLoading || !isEmail) {
      return;
    }

    setError("");

    try {
      setIsLoading(true);

      const signInMethods = await checkIfEmailExists(email);

      if (signInMethods.length > 0) {
        await sendSignInLinkToEmail(auth, email, actionCodeSettings);

        setIsPasswordResetLinkSent(true);
      } else {
        setIsPasswordResetLinkSent(false);
        throw new Error("auth/no-email");
      }
    } catch (error) {
      setIsPasswordResetLinkSent(false);

      if (error instanceof FirebaseError) {
        setError(error.code);
        console.log("error : " + error.code);
      } else {
        setError("auth/no-email");
        console.log(error);
      }
      reset();
    } finally {
      setIsLoading(false);
    }
  };

  console.log("user : " + auth.currentUser);
  console.log("emailVerified : " + auth.currentUser?.emailVerified);

  return (
    <div className="h-100">
      <Header />
      <div className="wrap">
        <Wrapper>
          <div className="mb-2">
            <h1 className="fs-2">Request Sign-in Link</h1>
          </div>
          {isPasswordResetLinkSent && (
            <Alert variant="warning" className="m-0 mt-3 w-100" dismissible>
              <p>
                Please review your email for a sign-in link. In case it doesn't
                show up within a couple of minutes, kindly inspect your spam
                folder.
              </p>
            </Alert>
          )}
          {error && (
            <Alert variant="danger" className="m-0 mt-3 w-100" dismissible>
              <p>
                {error === "auth/no-email" && "This email is not registered."}
                {error === "auth/invalid-action-code" &&
                  "The provided link is either incorrect or has already been utilized. Please obtain a new link."}
                {error === "auth/user-disabled" &&
                  "The user associated with the provided email has been disabled."}
                {error === "auth/user-not-found" &&
                  "No user exists for the provided email."}
                {error === "auth/requires-recent-login" &&
                  "Security concern. For this action, recent sign-in is required. Please sign in again."}
                {error === "auth/too-many-requests" &&
                  "Excessive attempts. Please retry after a brief delay."}
                {error === "auth/network-request-failed" &&
                  "An unexpected network error has occurred. Kindly reopen the page."}
                {error === "auth/invalid-user-token" &&
                  "Invalid user token. Please sign in again to obtain a valid token."}
                {error === "auth/user-token-expired" &&
                  "Your credentials have expired. Please try again."}
                {error === "auth/web-storage-unsupported" &&
                  "Your browser does not support web storage."}
                {error === "auth/internal-error" &&
                  "An internal error occurred. Please try again later or contact support for assistance."}
                {error === "auth/unknown" &&
                  "An unexpected error occurred. Please try again or contact support."}
              </p>
            </Alert>
          )}
          <Alert variant="light" className="mt-3 px-4 py-4 w-100">
            <Form
              onSubmit={sendSignInLink}
              className="d-flex flex-column row-gap-3"
            >
              <Form.Group>
                <Form.Label htmlFor="email">
                  Provide your registered email address, and we'll send you a
                  link for signing in.
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
              <Button
                type="submit"
                className="mt-2 fw-bold"
                {...(!isEmail ? { disabled: true } : { disabled: false })}
              >
                {isLoading ? "Loading..." : "Send Sign-in Link"}
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
        <Footer />
      </div>
    </div>
  );
}
