import { useRef, useState } from "react";
import { FirebaseError } from "firebase/app";
import {
  fetchSignInMethodsForEmail,
  sendSignInLinkToEmail,
} from "firebase/auth";
import { auth } from "../../firebase";
import Header from "../../components/header&footer/header/header";
import Footer from "../../components/header&footer/footer/footer";
import SendSignInLinkForm from "../../components/auth/send-sign-in-link/send-sign-in-link-form";

export default function SendSignInLink() {
  const emailInputRef = useRef<HTMLInputElement>(null);

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

  const reset = () => {
    setEmail("");

    setIsEmail(false);

    setEmailErrorMessage("");

    emailInputRef.current?.classList.remove("form-control-invalid");
  };

  const actionCodeSettings = {
    url: "http://127.0.0.1:5173/sign-in-with-email",
    handleCodeInApp: true,
  };

  const checkIfEmailExists = async (email: string) => {
    try {
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      console.log("signInMethods", signInMethods);

      return signInMethods;
    } catch (error) {
      console.error("Error checking email existence", error);
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

        setTimeout(() => {
          setIsPasswordResetLinkSent(false);
        }, 5000);
      } else {
        setIsPasswordResetLinkSent(false);
        throw new Error("auth/no-email");
      }
    } catch (error) {
      setIsPasswordResetLinkSent(false);

      if (error instanceof FirebaseError) {
        setError(error.code);
        console.log("FirebaseError", error.code);
      } else {
        setError("auth/no-email");
        console.log(error);
      }

      setTimeout(() => {
        setError("");
      }, 5000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-100">
      <Header avatar={auth.currentUser?.photoURL} />
      <div className="wrap">
        <SendSignInLinkForm
          emailInputRef={emailInputRef}
          isLoading={isLoading}
          error={error}
          email={email}
          handleEmail={handleEmail}
          isEmail={isEmail}
          emailErrorMessage={emailErrorMessage}
          noSpace={noSpace}
          reset={reset}
          sendSignInLink={sendSignInLink}
          isPasswordResetLinkSent={isPasswordResetLinkSent}
        />
        <Footer />
      </div>
    </div>
  );
}
