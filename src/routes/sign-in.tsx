import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Switcher, Wrapper } from "../components/auth-components";
import GithubButton from "../components/github-btn";
import { Button, Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import GoogleButton from "../components/google-btn";
import Alert from "react-bootstrap/Alert";

export default function SignIn() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);

  const [isPasswordChanged, setIsPasswordChanged] = useState(
    window.localStorage.getItem("PasswordChanged")
  );

  const [isVerificationNeeded, setIsVerificationNeeded] = useState(
    window.localStorage.getItem("verificationNeeded")
  );

  const [isVerified, setIsverified] = useState("");

  const [error, setError] = useState(
    window.localStorage.getItem("error") || ""
  );

  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

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

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setPassword(value.replace(/\s/gi, ""));
    if (value !== "") {
      setIsPassword(true);
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

  const logOut = () => {
    auth.signOut();
    navigate("/sign-in");
  };

  const reset = () => {
    setEmail("");
    setPassword("");

    setEmailErrorMessage("");
    setPasswordErrorMessage("");
  };

  useEffect(() => {
    window.localStorage.removeItem("verificationNeeded");
    window.localStorage.removeItem("PasswordChanged");
    window.localStorage.removeItem("error");
  }, []);

  const signIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (email === "") {
      setEmailErrorMessage("Please enter your email.");
      setIsEmail(false);
    }
    if (password === "") {
      setPasswordErrorMessage("Please enter your password.");
      setIsPassword(false);
    }

    if (isLoading || !isEmail || !isPassword) {
      return;
    }

    setError("");

    try {
      setIsLoading(true);

      // Log in
      await signInWithEmailAndPassword(auth, email, password);

      setIsVerificationNeeded("");
      setIsPasswordChanged("");

      // Ridirect to the home page
      if (auth.currentUser?.emailVerified === true) {
        setIsverified("yes");
        navigate("/");
      } else {
        setIsverified("no");
        logOut();
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError(error.code);
        console.log("error : " + error.code);
        setIsVerificationNeeded("");
        setIsPasswordChanged("");
      }
    } finally {
      setIsLoading(false);
    }
  };

  console.log("user : " + auth.currentUser);
  console.log("emailVerified : " + auth.currentUser?.emailVerified);

  return (
    <Container>
      <div className="d-flex justify-content-center">
        <Wrapper>
          <div className="w-100 mb-1 d-flex justify-content-center">
            <h1 className="fs-2">Sign in</h1>
          </div>
          {isVerificationNeeded && (
            <Alert
              variant="warning"
              className="d-flex align-itmes-center m-0 mt-3 w-100"
              dismissible
            >
              <p>
                Please go to your email and click on the link for verification.
                If you verified it, you can ignore this message.
              </p>
            </Alert>
          )}
          {isPasswordChanged && (
            <Alert
              variant="success"
              className="d-flex align-itmes-center m-0 mt-3 w-100"
              dismissible
            >
              <p>New password set successfully.</p>
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
                    "Incorrect email or password."}
                  {error === "auth/user-disabled" &&
                    "The user corresponding to the given email has been disabled."}
                  {error === "auth/invalid-action-code" &&
                    "The link is malformed or has already been used. Please try again."}
                  {error === "auth/user-not-found" &&
                    "There is no user corresponding to the given email."}
                  {error === "auth/too-many-requests" &&
                    "Too many attempts. Please try again after some delay."}
                  {error === "auth/account-exists-with-different-credential" &&
                    "Email is invalid or already taken."}
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
            </Alert>
          )}
          {isVerified === "no" && (
            <Alert
              variant="danger"
              className="d-flex align-itmes-center m-0 mt-3 w-100"
            >
              <p>
                <span>
                  Your email was not verified. Please go to your email and click
                  on the link for verification.
                </span>
              </p>
            </Alert>
          )}
          <Alert variant="light" className="mt-3 py-4">
            <Form
              onSubmit={signIn}
              className="d-flex"
              style={{
                width: "340px",
                flexDirection: "column",
                gap: "15px",
              }}
            >
              <Form.Group controlId="email" className="mb-2">
                <Form.Label>Email address</Form.Label>
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
              <Form.Group controlId="password">
                <div
                  className="d-flex justify-content-between align-items-center"
                  style={{ height: "24px" }}
                >
                  <Form.Label>Password</Form.Label>
                  <Link
                    to="/send-sign-in-link"
                    className="p-0 mb-2 text-decoration-none"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Form.Control
                  className="border-none mt-1 mb-1"
                  onChange={handlePassword}
                  onKeyDown={noSpace}
                  name="password"
                  value={password}
                  type="password"
                  maxLength={20}
                />
                {!isPassword && (
                  <div className="mt-2 text-danger">{passwordErrorMessage}</div>
                )}
              </Form.Group>
              <Button type="submit" className="fw-bold">
                {isLoading ? "Loading..." : "Sign in"}
              </Button>
            </Form>
            <Switcher className="d-flex justify-content-between">
              <Button onClick={reset} type="button" variant="outline-warning">
                Reset
              </Button>
              <Link to="/sign-up">Create an account</Link>
            </Switcher>
          </Alert>
          <div className="w-100 d-flex justify-content-between align-items-center">
            <span
              className="w-50 border border-secondary"
              style={{ height: 0 }}
            ></span>
            <span className="mx-3">OR</span>
            <span
              className="w-50 border border-secondary"
              style={{ height: 0 }}
            ></span>
          </div>
          <Alert variant="light" className="w-100 mt-3 py-4">
            <GoogleButton />
            <GithubButton />
          </Alert>
        </Wrapper>
      </div>
    </Container>
  );
}
