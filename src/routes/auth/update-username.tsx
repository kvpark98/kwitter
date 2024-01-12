import { useEffect, useState } from "react";
import { FirebaseError } from "firebase/app";
import { updateProfile } from "firebase/auth";
import { auth } from "../../firebase";
import { Switcher, Wrapper } from "../../components/styles/auth-components";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Header from "../../components/header&footer/header";
import { Link } from "react-router-dom";
import Footer from "../../components/header&footer/footer";

export default function ChangeUsername() {
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

  const changeName = async (event: React.FormEvent<HTMLFormElement>) => {
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
        console.log("error : " + error.code);

        setIsUpdated(false);
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
            <h1 className="fs-2">Change Username</h1>
          </div>
          {isUpdated && (
            <Alert variant="success" className="m-0 mt-3 w-100" dismissible>
              <p>New username successfully configured.</p>
            </Alert>
          )}
          {error && (
            <Alert variant="danger" className="m-0 mt-3 w-100" dismissible>
              <p>
                {error === "auth/invalid-display-name" &&
                  "Invalid display name. Please provide a valid name."}
                {error === "auth/invalid-photo-url" &&
                  "Invalid photo URL. Please provide a valid URL for your profile picture."}
                {error === "auth/user-not-found" &&
                  "User not found. Please verify your account and try again."}
                {error === "auth/user-disabled" &&
                  "Account disabled. Please contact support to re-enable your account."}
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
              onSubmit={changeName}
              className="d-flex flex-column row-gap-3"
            >
              <Form.Group>
                <Form.Label htmlFor="name">New Username</Form.Label>
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
                {isLoading ? "Loading..." : "Change"}
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
