import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { useState } from "react";
import { auth } from "../../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { Switcher, Wrapper } from "../../components/styles/auth-components";
import GithubButton from "../../components/socialSignIn/github-btn";
import GoogleButton from "../../components/socialSignIn/google-btn";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Header from "../../components/header&footer/header";
import Footer from "../../components/header&footer/footer";

export default function SignUp() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [isName, setIsName] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);

  const [error, setError] = useState("");

  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [passwordConfirmErrorMessage, setPasswordConfirmErrorMessage] =
    useState("");

  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    const regName = /^[가-힣a-zA-Z]{2,20}$/;

    setName(value.replace(/\s/gi, ""));

    if (value !== "") {
      if (!regName.test(value)) {
        setNameErrorMessage(
          "Please enter at least 2 characters either in English or Korean."
        );
        setIsName(false);

        document.getElementById("name")?.classList.add("form-control-invalid");
        document.getElementById("name")?.classList.remove("form-control-valid");
      } else {
        setIsName(true);

        document
          .getElementById("name")
          ?.classList.remove("form-control-invalid");
        document.getElementById("name")?.classList.add("form-control-valid");
      }
    } else {
      setNameErrorMessage("");
      setIsName(false);

      document.getElementById("name")?.classList.remove("form-control-invalid");
      document.getElementById("name")?.classList.remove("form-control-valid");
    }
  };

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
        document
          .getElementById("email")
          ?.classList.remove("form-control-valid");
      } else {
        setIsEmail(true);

        document
          .getElementById("email")
          ?.classList.remove("form-control-invalid");
        document.getElementById("email")?.classList.add("form-control-valid");
      }
    } else {
      setEmailErrorMessage("");
      setIsEmail(false);

      document
        .getElementById("email")
        ?.classList.remove("form-control-invalid");
      document.getElementById("email")?.classList.remove("form-control-valid");
    }
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    const regPassword = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{8,}$/;

    setPassword(value.replace(/\s/gi, ""));

    if (value !== "") {
      if (!regPassword.test(value)) {
        if (passwordConfirm) {
          setPasswordErrorMessage(
            "Please enter at least 8 characters including numbers, English, and special characters."
          );
          setPasswordConfirmErrorMessage(
            "Please make your password valid first."
          );
          setIsPassword(false);
          setIsPasswordConfirm(false);

          document
            .getElementById("password")
            ?.classList.add("form-control-invalid");
          document
            .getElementById("password")
            ?.classList.remove("form-control-valid");

          document
            .getElementById("passwordConfirm")
            ?.classList.add("form-control-invalid");
          document
            .getElementById("passwordConfirm")
            ?.classList.remove("form-control-valid");
        } else {
          setPasswordErrorMessage(
            "Please enter at least 8 characters including numbers, English, and special characters."
          );
          setPasswordConfirmErrorMessage("");
          setIsPassword(false);
          setIsPasswordConfirm(false);

          document
            .getElementById("password")
            ?.classList.add("form-control-invalid");
          document
            .getElementById("password")
            ?.classList.remove("form-control-valid");

          document
            .getElementById("passwordConfirm")
            ?.classList.remove("form-control-invalid");
          document
            .getElementById("passwordConfirm")
            ?.classList.remove("form-control-valid");
        }
      } else {
        if (passwordConfirm) {
          if (value !== passwordConfirm) {
            setPasswordConfirmErrorMessage("The password does not match.");
            setIsPassword(true);
            setIsPasswordConfirm(false);

            document
              .getElementById("password")
              ?.classList.remove("form-control-invalid");
            document
              .getElementById("password")
              ?.classList.add("form-control-valid");

            document
              .getElementById("passwordConfirm")
              ?.classList.add("form-control-invalid");
            document
              .getElementById("passwordConfirm")
              ?.classList.remove("form-control-valid");
          } else {
            setPasswordConfirmErrorMessage("");
            setIsPassword(true);
            setIsPasswordConfirm(true);

            document
              .getElementById("password")
              ?.classList.remove("form-control-invalid");
            document
              .getElementById("password")
              ?.classList.add("form-control-valid");

            document
              .getElementById("passwordConfirm")
              ?.classList.remove("form-control-invalid");
            document
              .getElementById("passwordConfirm")
              ?.classList.add("form-control-valid");
          }
        } else {
          setPasswordConfirmErrorMessage("");
          setIsPassword(true);
          setIsPasswordConfirm(false);

          document
            .getElementById("password")
            ?.classList.remove("form-control-invalid");
          document
            .getElementById("password")
            ?.classList.add("form-control-valid");

          document
            .getElementById("passwordConfirm")
            ?.classList.remove("form-control-invalid");
        }
      }
    } else {
      if (passwordConfirm) {
        setPasswordErrorMessage("");
        setPasswordConfirmErrorMessage("Please enter your password first.");
        setIsPassword(false);
        setIsPasswordConfirm(false);

        document
          .getElementById("password")
          ?.classList.remove("form-control-invalid");
        document
          .getElementById("password")
          ?.classList.remove("form-control-valid");

        document
          .getElementById("passwordConfirm")
          ?.classList.add("form-control-invalid");
        document
          .getElementById("passwordConfirm")
          ?.classList.remove("form-control-valid");
      } else {
        setPasswordErrorMessage("");
        setPasswordConfirmErrorMessage("");
        setIsPassword(false);
        setIsPasswordConfirm(false);

        document
          .getElementById("password")
          ?.classList.remove("form-control-invalid");
        document
          .getElementById("password")
          ?.classList.remove("form-control-valid");

        document
          .getElementById("passwordConfirm")
          ?.classList.remove("form-control-invalid");
        document
          .getElementById("passwordConfirm")
          ?.classList.remove("form-control-valid");
      }
    }
  };

  const handlePasswordConfirm = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;

    setPasswordConfirm(value.replace(/\s/gi, ""));

    if (value !== "") {
      if (value !== password) {
        setPasswordConfirmErrorMessage("The password does not match.");
        setIsPasswordConfirm(false);

        document
          .getElementById("passwordConfirm")
          ?.classList.add("form-control-invalid");
        document
          .getElementById("passwordConfirm")
          ?.classList.remove("form-control-valid");
      } else {
        setIsPasswordConfirm(true);

        document
          .getElementById("passwordConfirm")
          ?.classList.remove("form-control-invalid");
        document
          .getElementById("passwordConfirm")
          ?.classList.add("form-control-valid");
      }
    } else {
      setPasswordConfirmErrorMessage("");
      setIsPasswordConfirm(false);

      document
        .getElementById("passwordConfirm")
        ?.classList.remove("form-control-invalid");
      document
        .getElementById("passwordConfirm")
        ?.classList.remove("form-control-valid");
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
    setName("");
    setEmail("");
    setPassword("");
    setPasswordConfirm("");

    setIsName(false);
    setIsEmail(false);
    setIsPassword(false);
    setIsPasswordConfirm(false);

    setNameErrorMessage("");
    setEmailErrorMessage("");
    setPasswordErrorMessage("");
    setPasswordConfirmErrorMessage("");

    document.getElementById("name")?.classList.remove("form-control-invalid");
    document.getElementById("name")?.classList.remove("form-control-valid");

    document.getElementById("email")?.classList.remove("form-control-invalid");
    document.getElementById("email")?.classList.remove("form-control-valid");

    document
      .getElementById("password")
      ?.classList.remove("form-control-invalid");
    document.getElementById("password")?.classList.remove("form-control-valid");

    document
      .getElementById("passwordConfirm")
      ?.classList.remove("form-control-invalid");
    document
      .getElementById("passwordConfirm")
      ?.classList.remove("form-control-valid");
  };

  const actionCodeSettings = {
    url: "http://127.0.0.1:5173/sign-in",
    handleCodeInApp: true,
  };

  const signUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      isLoading ||
      !isName ||
      !isEmail ||
      !isPassword ||
      !isPasswordConfirm ||
      password !== passwordConfirm
    ) {
      return;
    }

    setError("");

    try {
      setIsLoading(true);

      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      window.localStorage.setItem("verificationNeeded", "true");

      await sendEmailVerification(credentials.user, actionCodeSettings);

      await updateProfile(credentials.user, {
        displayName: name,
      });

      signOut();
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError(error.code);
        console.log("error : " + error.code);

        if (error.code === "auth/email-already-in-use") {
          setIsEmail(false);
          setEmail("");
          setEmailErrorMessage("");

          document
            .getElementById("email")
            ?.classList.remove("form-control-valid");
        }
      }
      reset();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-100">
      <Header />
      <div className="wrap">
        <Wrapper>
          <div className="mb-2">
            <h1 className="fs-2">Sign Up</h1>
          </div>
          {error && (
            <Alert variant="danger" className="m-0 mt-3 w-100" dismissible>
              <p>
                {error === "auth/invalid-credential" &&
                  "The email or password entered is incorrect."}
                {error === "auth/user-not-found" &&
                  "No user exists for the provided email."}
                {error === "auth/email-already-in-use" &&
                  "This email is already in use."}
                {error === "auth/account-exists-with-different-credential" &&
                  "The email is either invalid or already in use."}
                {error === "auth/invalid-email" &&
                  "The provided email address is not valid."}
                {error === "auth/user-disabled" &&
                  "The user associated with the provided email has been disabled."}
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
            <Form onSubmit={signUp} className="d-flex flex-column row-gap-3">
              <Form.Group>
                <Form.Label htmlFor="name">Username</Form.Label>
                <Form.Control
                  className="border-none mt-1 mb-1"
                  onChange={handleName}
                  onKeyDown={noSpace}
                  id="name"
                  name="name"
                  value={name}
                  type="text"
                  maxLength={20}
                />
                {!isName && nameErrorMessage && (
                  <div className="mt-2 text-danger">{nameErrorMessage}</div>
                )}
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="email">Email Address</Form.Label>
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
                <Form.Label htmlFor="password">Password</Form.Label>
                <Form.Control
                  className="border-none mt-1 mb-1"
                  onChange={handlePassword}
                  onKeyDown={noSpace}
                  id="password"
                  name="password"
                  value={password}
                  type="password"
                  autoComplete="new-password"
                  maxLength={20}
                />
                {!isPassword && passwordErrorMessage && (
                  <div className="mt-2 text-danger">{passwordErrorMessage}</div>
                )}
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="passwordConfirm">
                  Password Confirm
                </Form.Label>
                <Form.Control
                  className="border-none mt-1 mb-1"
                  onChange={handlePasswordConfirm}
                  onKeyDown={noSpace}
                  id="passwordConfirm"
                  name="passwordConfirm"
                  value={passwordConfirm}
                  type="password"
                  autoComplete="new-password"
                  maxLength={20}
                  {...(!isPassword ? { disabled: true } : { disabled: false })}
                />
                {!isPasswordConfirm && passwordConfirmErrorMessage && (
                  <div className="mt-2 text-danger">
                    {passwordConfirmErrorMessage}
                  </div>
                )}
              </Form.Group>
              <Button
                type="submit"
                className="mt-2 fw-bold"
                {...(!isName || !isEmail || !isPassword || !isPasswordConfirm
                  ? { disabled: true }
                  : { disabled: false })}
              >
                {isLoading ? "Loading..." : "Sign Up"}
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
