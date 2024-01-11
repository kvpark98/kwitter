import { useEffect, useState } from "react";
import { FirebaseError } from "firebase/app";
import { isSignInWithEmailLink, updateProfile } from "firebase/auth";
import { auth } from "../../firebase";
import { Switcher, Wrapper } from "../../components/styles/auth-components";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Header from "../../components/header&footer/header";
import { Link } from "react-router-dom";
import Footer from "../../components/header&footer/footer";

export default function UpdateUsername() {
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState("");

  const [isName, setIsName] = useState(false);

  const [isUpdated, setIsUpdated] = useState(false);

  const [error, setError] = useState("");

  const [nameErrorMessage, setNameErrorMessage] = useState("");

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

  const noSpace = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === "Space") {
      event.preventDefault();
    }
  };

  const reset = () => {
    setName("");

    setIsName(false);

    setNameErrorMessage("");

    document.getElementById("name")?.classList.remove("form-control-invalid");
    document.getElementById("name")?.classList.remove("form-control-valid");
  };

  useEffect(() => {
    window.localStorage.removeItem("error");
  }, []);

  const updateName = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (name === "") {
      setNameErrorMessage("Please enter your name.");
      setIsName(false);

      document.getElementById("name")?.classList.add("form-control-invalid");
    }

    if (isLoading || !isName) {
      return;
    }

    setError("");

    try {
      setIsLoading(true);

      await updateProfile(auth.currentUser!, {
        displayName: name,
      });

      setIsUpdated(true);

      reset();
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError(error.code);
        window.localStorage.setItem("error", error.code);
        console.log("error : " + error.code);
        setIsUpdated(false);
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
      <Header />
      <div className="wrap">
        <Wrapper>
          <div className="w-100 mb-1 d-flex justify-content-center">
            <h1 className="fs-2">Update username</h1>
          </div>
          {isUpdated && (
            <Alert
              variant="success"
              className="d-flex align-itmes-center m-0 mt-3 w-100"
              dismissible
            >
              <p>
                <span>Username set successfully.</span>
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
                    "This requires recent sign-in. Please sign in again."}
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
          <Alert variant="light" className="mt-3 px-5 py-4 w-100">
            <Form
              onSubmit={updateName}
              className="d-flex"
              style={{
                flexDirection: "column",
                gap: "15px",
              }}
            >
              <Form.Group>
                <Form.Label htmlFor="name">New username</Form.Label>
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
              <Button type="submit" className="mt-2 fw-bold">
                {isLoading ? "Loading..." : "Update"}
              </Button>
            </Form>
            <Switcher className="d-flex justify-content-between">
              <Button onClick={reset} type="button" variant="outline-info">
                Reset
              </Button>
              <Link to="/" className="btn btn-outline-success">
                Home
              </Link>
            </Switcher>
          </Alert>
        </Wrapper>
        <Footer />
      </div>
    </div>
  );
}
