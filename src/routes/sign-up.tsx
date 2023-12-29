import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { Switcher, Wrapper } from "../components/auth-components";
import GithubButton from "../components/github-btn";
import GoogleButton from "../components/google-btn";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Header from "../components/header";
import Footer from "../components/footer";

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

  const logOut = () => {
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

  const signIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (name === "") {
      setNameErrorMessage("Please enter your name.");
      setIsName(false);

      document.getElementById("name")?.classList.add("form-control-invalid");
    }
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
    if (passwordConfirm === "" && isPassword) {
      setPasswordConfirmErrorMessage("Please confirm your password.");
      setIsPasswordConfirm(false);

      document
        .getElementById("passwordConfirm")
        ?.classList.add("form-control-invalid");
    }

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

      // Create an account
      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      window.localStorage.setItem("verificationNeeded", "true");

      // Verify email
      await sendEmailVerification(credentials.user, actionCodeSettings);

      // Update the profile
      await updateProfile(credentials.user, {
        displayName: name,
      });

      logOut();
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-100">
      <Header />
      <div className="wrap">
        <Wrapper>
          <div className="w-100 mb-1 d-flex justify-content-center">
            <h1 className="fs-2">Sign up</h1>
          </div>
          {error && (
            <Alert
              variant="danger"
              className="d-flex align-itmes-center m-0 mt-3 w-100"
              dismissible
            >
              <p>
                <span>
                  {error === "auth/email-already-in-use" &&
                    "This email is already in use."}
                  {error === "auth/account-exists-with-different-credential" &&
                    "Email is invalid or already taken."}
                  {error === "auth/invalid-email" &&
                    "The email address is not valid."}
                  {error === "auth/too-many-requests" &&
                    "Too many attempts. Please try again after some delay."}
                  {error === "auth/network-request-failed" &&
                    "A network error has occurred. Please reopen the page."}
                  {error === "auth/web-storage-unsupported" &&
                    "Your browser does not support web storage. Please try again."}
                </span>
              </p>
            </Alert>
          )}
          <Alert variant="light" className="mt-3 py-4 w-100">
            <Form
              onSubmit={signIn}
              className="d-flex"
              style={{
                flexDirection: "column",
                gap: "15px",
              }}
            >
              <Form.Group className="mb-2">
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
                <Form.Label htmlFor="password">Password</Form.Label>
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
                  maxLength={20}
                  {...(!isPassword ? { disabled: true } : { disabled: false })}
                />
                {!isPasswordConfirm && passwordConfirmErrorMessage && (
                  <div className="mt-2 text-danger">
                    {passwordConfirmErrorMessage}
                  </div>
                )}
              </Form.Group>
              <Button type="submit" className="mt-2 fw-bold">
                {isLoading ? "Loading..." : "Sign up"}
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
