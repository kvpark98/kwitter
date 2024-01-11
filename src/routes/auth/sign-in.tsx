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
    window.localStorage.getItem("PasswordChanged") || ""
  );

  const [isVerificationNeeded, setIsVerificationNeeded] = useState(
    window.localStorage.getItem("verificationNeeded") || ""
  );

  const [isVerified, setIsVerified] = useState("");

  const [accountDeleted, setAccountDeleted] = useState(
    window.localStorage.getItem("accountDeleted") || ""
  );

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
    window.localStorage.removeItem("accountDeleted");
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

      // Session sign-in
      auth.setPersistence(browserSessionPersistence);

      // Remember Me
      if (isRememberMe) {
        // Local sign-in
        auth.setPersistence(browserLocalPersistence);
      }

      // Sign in
      await signInWithEmailAndPassword(auth, email, password);

      // Result
      if (auth.currentUser?.emailVerified === true) {
        setIsVerified("true");
        navigate("/");
      } else {
        setIsVerified("false");
        signOut();
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError(error.code);
        console.log("error : " + error.code);

        setIsVerificationNeeded("");
        setIsPasswordChanged("");
        setAccountDeleted("");
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
          <div className="mb-2">
            <h1 className="fs-2">Sign-In</h1>
          </div>
          {isVerificationNeeded && (
            <Alert variant="warning" className="m-0 mt-3 w-100" dismissible>
              <p>
                Kindly navigate to your email and click on the provided link for
                verification.
              </p>
            </Alert>
          )}
          {isPasswordChanged && (
            <Alert variant="success" className="m-0 mt-3 w-100" dismissible>
              <p>
                Your new password has been set successfully. Please sign in
                using your updated password.
              </p>
            </Alert>
          )}
          {accountDeleted && (
            <Alert variant="success" className="m-0 mt-3 w-100" dismissible>
              <p>Your account has been successfully deleted.</p>
            </Alert>
          )}
          {isVerified === "false" && (
            <Alert variant="danger" className="m-0 mt-3 w-100" dismissible>
              <p>
                <span>
                  Your email has not been verified. Please check your email and
                  click on the verification link.
                </span>
              </p>
            </Alert>
          )}
          {error && (
            <Alert variant="danger" className="m-0 mt-3 w-100" dismissible>
              <p>
                <span>
                  {error === "auth/invalid-credential" &&
                    "The email or password entered is incorrect."}
                  {error === "auth/wrong-password" &&
                    "The entered password is incorrect."}
                  {error === "auth/user-disabled" &&
                    "The user associated with the provided email has been disabled."}
                  {error === "auth/invalid-action-code" &&
                    "The provided link is either incorrect or has already been utilized. Please obtain a new link."}
                  {error === "auth/user-not-found" &&
                    "No user exists for the provided email."}
                  {error === "auth/too-many-requests" &&
                    "Excessive attempts. Please retry after a brief delay."}
                  {error === "auth/account-exists-with-different-credential" &&
                    "The email is either invalid or already in use."}
                  {error === "auth/network-request-failed" &&
                    "An unexpected network error has occurred. Kindly reopen the page."}
                  {error === "auth/requires-recent-login" &&
                    "Recent sign-in is required. Kindly sign in again."}
                  {error === "auth/invalid-user-token" &&
                    "Your credentials are not valid."}
                  {error === "auth/user-token-expired" &&
                    "Your credentials have expired. Please try again."}
                  {error === "auth/invalid-user-token" &&
                    "Your credentials are not valid."}
                  {error === "auth/web-storage-unsupported" &&
                    "Your browser does not support web storage."}
                  {error === "auth/internal-error" &&
                    "An internal error occurred. Please try again later or contact support for assistance."}
                </span>
              </p>
            </Alert>
          )}
          <Alert variant="light" className="mt-3 px-5 py-4 w-100">
            <Form onSubmit={signIn} className="d-flex flex-column row-gap-3">
              <Form.Group>
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
                <div className="d-flex justify-content-between align-items-center">
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
              <div>
                <Form.Check
                  onClick={handleRememberMe}
                  type="checkbox"
                  id="remember-me"
                  label="Remember me"
                  className="m-0"
                />
              </div>
              <Button type="submit" className="fw-bold">
                {isLoading ? "Loading..." : "Sign in"}
              </Button>
            </Form>
            <Switcher className="d-flex justify-content-between">
              <Button onClick={reset} type="button" variant="outline-info">
                Reset
              </Button>
              <Link to="/sign-up" className="btn btn-outline-success">
                Create an account
              </Link>
            </Switcher>
          </Alert>
          <div className="w-100 d-flex justify-content-between align-items-center">
            <span className="w-50 border border-secondary"></span>
            <span className="mx-3">OR</span>
            <span className="w-50 border border-secondary"></span>
          </div>
          <Alert variant="light" className="w-100 mt-3 px-5 py-4">
            <GoogleButton />
            <GithubButton />
          </Alert>
        </Wrapper>
        <Footer />
      </div>
    </div>
  );
}
