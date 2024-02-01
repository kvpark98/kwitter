import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { useState } from "react";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import Header from "../../components/header&footer/header";
import Footer from "../../components/header&footer/footer";
import SignUpForm from "../../components/auth/sign-up/sign-up-form";

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
      } else {
        setIsName(true);

        document
          .getElementById("name")
          ?.classList.remove("form-control-invalid");
      }
    } else {
      setNameErrorMessage("");
      setIsName(false);

      document.getElementById("name")?.classList.remove("form-control-invalid");
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

    const regPassword =
      /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-]).{8,}$/;

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

    document.getElementById("email")?.classList.remove("form-control-invalid");

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
        console.log("FirebaseError", error.code);
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
      <Header />
      <div className="wrap">
        <SignUpForm
          isLoading={isLoading}
          error={error}
          name={name}
          handleName={handleName}
          isName={isName}
          nameErrorMessage={nameErrorMessage}
          email={email}
          handleEmail={handleEmail}
          isEmail={isEmail}
          emailErrorMessage={emailErrorMessage}
          password={password}
          handlePassword={handlePassword}
          isPassword={isPassword}
          passwordErrorMessage={passwordErrorMessage}
          passwordConfirm={passwordConfirm}
          handlePasswordConfirm={handlePasswordConfirm}
          isPasswordConfirm={isPasswordConfirm}
          passwordConfirmErrorMessage={passwordConfirmErrorMessage}
          noSpace={noSpace}
          reset={reset}
          signUp={signUp}
        />
        <Footer />
      </div>
    </div>
  );
}
