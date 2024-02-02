import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import {
  browserLocalPersistence,
  browserSessionPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase";
import Header from "../../components/header&footer/header";
import Footer from "../../components/header&footer/footer";
import SignInForm from "../../components/auth/sign-in/sign-in-form";

export default function SignIn() {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);

  const [isRememberMe, setIsRememberMe] = useState(false);

  const [isVerificationNeeded, setIsVerificationNeeded] = useState(
    window.localStorage.getItem("verificationNeeded") || ""
  );

  const [isPasswordChanged, setIsPasswordChanged] = useState(
    window.localStorage.getItem("PasswordChanged") || ""
  );

  const [accountDeleted, setAccountDeleted] = useState(
    window.localStorage.getItem("accountDeleted") || ""
  );

  const [showEmailNotVerified, setShowEmailNotVerified] = useState(false);

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

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setPassword(value.replace(/\s/gi, ""));

    if (value !== "") {
      setIsPassword(true);

      passwordInputRef.current?.classList.remove("form-control-invalid");
    } else {
      setPasswordErrorMessage("");
      setIsPassword(false);

      passwordInputRef.current?.classList.remove("form-control-invalid");
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

    emailInputRef.current?.classList.remove("form-control-invalid");

    passwordInputRef.current?.classList.remove("form-control-invalid");
  };

  useEffect(() => {
    window.localStorage.removeItem("verificationNeeded");
    window.localStorage.removeItem("PasswordChanged");
    window.localStorage.removeItem("accountDeleted");
    window.localStorage.removeItem("error");
  }, []);

  const signIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isLoading || !isEmail || !isPassword) {
      return;
    }

    setError("");

    try {
      setIsLoading(true);

      auth.setPersistence(browserSessionPersistence);

      if (isRememberMe) {
        auth.setPersistence(browserLocalPersistence);
      }

      await signInWithEmailAndPassword(auth, email, password);

      if (auth.currentUser?.emailVerified === true) {
        setShowEmailNotVerified(false);
        navigate("/");
      } else {
        setShowEmailNotVerified(true);

        setTimeout(() => {
          setShowEmailNotVerified(false);
        }, 5000);

        signOut();
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError(error.code);
        console.log("FirebaseError", error.code);
      }

      setIsVerificationNeeded("");
      setIsPasswordChanged("");
      setAccountDeleted("");

      setTimeout(() => {
        setError("");
      }, 5000);
    } finally {
      setIsLoading(false);
    }
  };

  console.log("user", auth.currentUser);
  console.log("emailVerified", auth.currentUser?.emailVerified);

  return (
    <div className="h-100">
      <Header />
      <div className="wrap">
        <SignInForm
          isLoading={isLoading}
          error={error}
          isVerificationNeeded={isVerificationNeeded}
          isPasswordChanged={isPasswordChanged}
          accountDeleted={accountDeleted}
          showEmailNotVerified={showEmailNotVerified}
          emailInputRef={emailInputRef}
          email={email}
          handleEmail={handleEmail}
          isEmail={isEmail}
          emailErrorMessage={emailErrorMessage}
          passwordInputRef={passwordInputRef}
          password={password}
          handlePassword={handlePassword}
          isPassword={isPassword}
          passwordErrorMessage={passwordErrorMessage}
          handleRememberMe={handleRememberMe}
          noSpace={noSpace}
          reset={reset}
          signIn={signIn}
        />
        <Footer />
      </div>
    </div>
  );
}
