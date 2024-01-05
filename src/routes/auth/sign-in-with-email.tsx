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

      // Existing and future Auth states are now persisted in the current
      // session only. Closing the window would clear any existing state even
      // if a user forgets to sign out.
      auth.setPersistence(browserSessionPersistence);

      // Sign in with email
      if (isSignInWithEmailLink(auth, window.location.href)) {
        await signInWithEmailLink(auth, email, window.location.href);

        window.localStorage.setItem("isSignedInWithEmail", "true");

        navigate("/reset-password");
      } else {
        signOut();
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError(error.code);
        window.localStorage.setItem("error", error.code);
        console.log("error : " + error.code);

        window.localStorage.removeItem("isSignedInWithEmail");

        if (error.code !== "auth/invalid-email") {
          signOut();
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
    <div className="h-100">
      <div className="wrap">
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
                Your email was verified. Please enter your email one more time.
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
          <Alert variant="light" className="mt-3 py-4 w-100">
            <Form
              onSubmit={signInWithEmail}
              className="d-flex"
              style={{
                flexDirection: "column",
                gap: "15px",
              }}
            >
              <Form.Group>
                <Form.Label htmlFor="email">
                  Please enter the email address to which the sign-in link was
                  originally sent.
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
                {isLoading ? "Loading..." : "Sign in with email"}
              </Button>
            </Form>
            <Switcher className="d-flex justify-content-between">
              <Button onClick={reset} type="button" variant="outline-info">
                Reset
              </Button>
            </Switcher>
          </Alert>
        </Wrapper>
      </div>
    </div>
  );
}
