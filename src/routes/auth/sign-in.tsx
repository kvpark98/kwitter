import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import {
  browserLocalPersistence,
  browserSessionPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase";
import { Switcher, Wrapper } from "../../components/styles/auth-components";
import GithubButton from "../../components/socialSignIn/github-btn";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import GoogleButton from "../../components/socialSignIn/google-btn";
import Alert from "react-bootstrap/Alert";
import Header from "../../components/header&footer/header";
import Footer from "../../components/header&footer/footer";

export default function SignIn() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);

  const [isRememberMe, setIsRememberMe] = useState(false);

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

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setPassword(value.replace(/\s/gi, ""));

    if (value !== "") {
      setIsPassword(true);

      document
        .getElementById("password")
        ?.classList.remove("form-control-invalid");
    } else {
      setPasswordErrorMessage("");
      setIsPassword(false);

      document
        .getElementById("password")
        ?.classList.remove("form-control-invalid");
    }
  };

  const handleRememberMe = () => {
    setIsRememberMe((current) => !current);
  };
  console.log("isRememberMe : " + isRememberMe);

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

    setIsEmail(false);
    setIsPassword(false);

    setEmailErrorMessage("");
    setPasswordErrorMessage("");

    document.getElementById("email")?.classList.remove("form-control-invalid");

    document
      .getElementById("password")
      ?.classList.remove("form-control-invalid");
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

      document.getElementById("email")?.classList.add("form-control-invalid");
    }
    if (password === "") {
      setPasswordErrorMessage("Please enter your password.");
      setIsPassword(false);

      document
        .getElementById("password")
        ?.classList.add("form-control-invalid");
    }

    if (isLoading || !isEmail || !isPassword) {
      return;
    }

    setError("");

    try {
      setIsLoading(true);

      // Existing and future Auth states are now persisted in the current
      // session only. Closing the window would clear any existing state even
      // if a user forgets to sign out.
      auth.setPersistence(browserSessionPersistence);

      // Remember Me
      if (isRememberMe) {
        auth.setPersistence(browserLocalPersistence);
      }

      // Sign in
      await signInWithEmailAndPassword(auth, email, password);

      setIsVerificationNeeded("");
      setIsPasswordChanged("");

      // Ridirect
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
    <div className="h-100">
      <Header />
      <div className="wrap">
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
                    "The link is malformed or has already been used. Please get a new link."}
                  {error === "auth/user-not-found" &&
                    "There is no user corresponding to the given email."}
                  {error === "auth/too-many-requests" &&
                    "Too many attempts. Please try again after some delay."}
                  {error === "auth/account-exists-with-different-credential" &&
                    "Email is invalid or already taken."}
                  {error === "auth/network-request-failed" &&
                    "A network error has occurred. Please reopen the page."}
                  {error === "auth/requires-recent-login" &&
                    "Your new password was not set because your last sign-in time has passed 5 minutes. Please sign in again."}
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
              dismissible
            >
              <p>
                <span>
                  Your email was not verified. Please go to your email and click
                  on the link for verification.
                </span>
              </p>
            </Alert>
          )}
          <Alert variant="light" className="mt-3 py-4 w-100">
            <Form
              name="signIn"
              onSubmit={signIn}
              className="d-flex"
              style={{
                flexDirection: "column",
                gap: "15px",
              }}
            >
              <Form.Group className="mb-2">
                <Form.Label htmlFor="email">Email address</Form.Label>
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
              <Form.Group>
                <div
                  className="d-flex justify-content-between align-items-center"
                  style={{ height: "24px" }}
                >
                  <Form.Label htmlFor="password">Password</Form.Label>
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
                  id="password"
                  name="password"
                  value={password}
                  type="password"
                  maxLength={20}
                />
                {!isPassword && passwordErrorMessage && (
                  <div className="mt-2 text-danger">{passwordErrorMessage}</div>
                )}
              </Form.Group>
              <div style={{ height: "16px" }}>
                <Form.Check
                  onClick={handleRememberMe}
                  type="checkbox"
                  id="remember-me"
                  label="Remember me"
                  className="min-h-0"
                  style={{ minHeight: "0" }}
                />
              </div>
              <Button type="submit" className="mt-2 fw-bold">
                {isLoading ? "Loading..." : "Sign in"}
              </Button>
            </Form>
            <Switcher className="d-flex justify-content-between">
              <Button onClick={reset} type="button" variant="outline-warning">
                Reset
              </Button>
              <Link to="/sign-up" className="btn btn-outline-success">
                Create an account
              </Link>
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
        <Footer />
      </div>
    </div>
  );
}
