import { useEffect, useRef, useState } from "react";
import { FirebaseError } from "firebase/app";
import {
  browserSessionPersistence,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import SignInWithEmailForm from "../../components/auth/sign-in-with-email/sign-in-with-email-form";
import { Modal } from "react-bootstrap";
import SignInWithEmailHeader from "../../components/auth/sign-in-with-email/sign-in-with-email-header";

export default function SignInWithEmail() {
  const emailInputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState("");

  const [isEmail, setIsEmail] = useState(false);

  const [error, setError] = useState("");

  const [emailErrorMessage, setEmailErrorMessage] = useState("");

  const [showSignInWithEmailModal, setShowSignInWithEmailModal] =
    useState(false);
  const handleShowSignInWithEmailModal = () => {
    setShowSignInWithEmailModal(true);
  };
  const handleCloseSignInWithEmailModal = () => {
    setShowSignInWithEmailModal(false);
  };

  useEffect(() => {
    handleShowSignInWithEmailModal();
  }, []);

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    const regEmail =
      /^[A-Za-z0-9]{3,}([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]{3,}([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;

    setEmail(value.replace(/\s/gi, ""));

    if (value !== "") {
      if (!regEmail.test(value)) {
        setEmailErrorMessage("Email format is not valid.");
        setIsEmail(false);

        emailInputRef.current?.classList.add("form-control-invalid");
      } else {
        setIsEmail(true);

        emailInputRef.current?.classList.remove("form-control-invalid");
      }
    } else {
      setEmailErrorMessage("");
      setIsEmail(false);

      emailInputRef.current?.classList.remove("form-control-invalid");
    }
  };

  const noSpace = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === "Space") {
      event.preventDefault();
    }
  };

  const signOut = () => {
    auth.signOut();
    navigate("/welcome");
  };

  const reset = () => {
    setEmail("");

    setIsEmail(false);

    setEmailErrorMessage("");

    emailInputRef.current?.classList.remove("form-control-invalid");
  };

  const signInWithEmail = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isLoading || !isEmail) {
      return;
    }

    setError("");

    try {
      setIsLoading(true);

      auth.setPersistence(browserSessionPersistence);

      if (isSignInWithEmailLink(auth, window.location.href)) {
        await signInWithEmailLink(auth, email, window.location.href);

        window.sessionStorage.setItem("isSignedInWithEmail", "Do not delete");

        navigate("/reset-password");
      } else {
        signOut();
      }
    } catch (error) {
      window.sessionStorage.removeItem("isSignedInWithEmail");

      if (error instanceof FirebaseError) {
        setError(error.code);
        console.log("FirebaseError", error.code);

        window.localStorage.setItem("error", error.code);

        if (
          error.code !== "auth/user-disabled" &&
          error.code !== "auth/user-not-found" &&
          error.code !== "auth/invalid-email" &&
          error.code !== "auth/too-many-requests"
        ) {
          signOut();
        }
      }

      setTimeout(() => {
        setError("");
      }, 5000);
    } finally {
      setIsLoading(false);
    }
  };

  console.log("user", auth.currentUser);
  console.log("emailVerified", auth.currentUser?.emailVerified);
  console.log(
    "isSignInWithEmailLink",
    isSignInWithEmailLink(auth, window.location.href)
  );

  return (
    <Modal
      show={showSignInWithEmailModal}
      onHide={handleCloseSignInWithEmailModal}
      backdrop="static"
      keyboard={false}
      className="border-0"
      centered
    >
      <SignInWithEmailHeader />
      <SignInWithEmailForm
        emailInputRef={emailInputRef}
        isLoading={isLoading}
        email={email}
        handleEmail={handleEmail}
        isEmail={isEmail}
        emailErrorMessage={emailErrorMessage}
        noSpace={noSpace}
        reset={reset}
        signInWithEmail={signInWithEmail}
      />
    </Modal>
  );
}
