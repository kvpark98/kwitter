import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { updatePassword } from "firebase/auth";
import { auth } from "../firebase";
import ResetPasswordForm from "../components/auth/reset-password/reset-password-form";

export default function ResetPassword() {
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const passwordConfirmInputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);

  const [error, setError] = useState("");

  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [passwordConfirmErrorMessage, setPasswordConfirmErrorMessage] =
    useState("");

  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const signOut = () => {
    auth.signOut();
    navigate("/welcome");
  };

  const navigateToHome = () => {
    window.sessionStorage.removeItem("isSignedInWithEmail");
    navigate("/");
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    const regPassword =
      /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-]).{8,}$/;

    setPassword(value.replace(/\s/gi, ""));

    if (value !== "") {
      if (!regPassword.test(value)) {
        setPasswordErrorMessage(
          "Please enter at least 8 characters including numbers, English, and special characters."
        );
        setIsPassword(false);
        setIsPasswordConfirm(false);

        passwordInputRef.current?.classList.add("form-control-invalid");
        passwordInputRef.current?.classList.remove("form-control-valid");

        passwordConfirmInputRef.current?.classList.remove("form-control-valid");
        if (passwordConfirm) {
          setPasswordConfirmErrorMessage(
            "Please make your password valid first."
          );

          passwordConfirmInputRef.current?.classList.add(
            "form-control-invalid"
          );
        } else {
          setPasswordConfirmErrorMessage("");

          passwordConfirmInputRef.current?.classList.remove(
            "form-control-invalid"
          );
        }
      } else {
        setIsPassword(true);

        passwordInputRef.current?.classList.remove("form-control-invalid");
        passwordInputRef.current?.classList.add("form-control-valid");
        if (passwordConfirm) {
          if (value !== passwordConfirm) {
            setPasswordConfirmErrorMessage("The password does not match.");
            setIsPasswordConfirm(false);

            passwordConfirmInputRef.current?.classList.add(
              "form-control-invalid"
            );
            passwordConfirmInputRef.current?.classList.remove(
              "form-control-valid"
            );
          } else {
            setPasswordConfirmErrorMessage("");
            setIsPasswordConfirm(true);

            passwordConfirmInputRef.current?.classList.remove(
              "form-control-invalid"
            );
            passwordConfirmInputRef.current?.classList.add(
              "form-control-valid"
            );
          }
        } else {
          setPasswordConfirmErrorMessage("");
          setIsPasswordConfirm(false);

          passwordConfirmInputRef.current?.classList.remove(
            "form-control-invalid"
          );
        }
      }
    } else {
      setPasswordErrorMessage("");
      setIsPassword(false);
      setIsPasswordConfirm(false);

      passwordInputRef.current?.classList.remove("form-control-invalid");
      passwordInputRef.current?.classList.remove("form-control-valid");

      passwordConfirmInputRef.current?.classList.remove("form-control-valid");
      if (passwordConfirm) {
        setPasswordConfirmErrorMessage("Please enter your password first.");

        passwordConfirmInputRef.current?.classList.add("form-control-invalid");
      } else {
        setPasswordConfirmErrorMessage("");

        passwordConfirmInputRef.current?.classList.remove(
          "form-control-invalid"
        );
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

        passwordConfirmInputRef.current?.classList.add("form-control-invalid");
        passwordConfirmInputRef.current?.classList.remove("form-control-valid");
      } else {
        setIsPasswordConfirm(true);

        passwordConfirmInputRef.current?.classList.remove(
          "form-control-invalid"
        );
        passwordConfirmInputRef.current?.classList.add("form-control-valid");
      }
    } else {
      setPasswordConfirmErrorMessage("");
      setIsPasswordConfirm(false);

      passwordConfirmInputRef.current?.classList.remove("form-control-invalid");
      passwordConfirmInputRef.current?.classList.remove("form-control-valid");
    }
  };

  const noSpace = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === "Space") {
      event.preventDefault();
    }
  };

  const reset = () => {
    setPassword("");
    setPasswordConfirm("");

    setIsPassword(false);
    setIsPasswordConfirm(false);

    setPasswordErrorMessage("");
    setPasswordConfirmErrorMessage("");

    passwordInputRef.current?.classList.remove("form-control-invalid");
    passwordInputRef.current?.classList.remove("form-control-valid");

    passwordConfirmInputRef.current?.classList.remove("form-control-invalid");
    passwordConfirmInputRef.current?.classList.remove("form-control-valid");
  };

  useEffect(() => {
    window.localStorage.removeItem("error");
  }, []);

  const resetPassword = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      isLoading ||
      !isPassword ||
      !isPasswordConfirm ||
      password !== passwordConfirm
    ) {
      return;
    }

    setError("");

    try {
      setIsLoading(true);

      await updatePassword(auth.currentUser!, password);

      window.sessionStorage.removeItem("isSignedInWithEmail");

      window.localStorage.setItem("PasswordChanged", "true");

      signOut();
    } catch (error) {
      window.localStorage.removeItem("PasswordChanged");

      if (error instanceof FirebaseError) {
        setError(error.code);
        console.log("FirebaseError", error.code);

        window.localStorage.setItem("error", error.code);

        if (error.code === "auth/requires-recent-login") {
          signOut();
        }
      }

      reset();

      setTimeout(() => {
        setError("");
      }, 5000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-100">
      <div className="wrap">
        <ResetPasswordForm
          passwordInputRef={passwordInputRef}
          passwordConfirmInputRef={passwordConfirmInputRef}
          isLoading={isLoading}
          error={error}
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
          resetPassword={resetPassword}
          showModal={showModal}
          handleShowModal={handleShowModal}
          handleCloseModal={handleCloseModal}
          navigateToHome={navigateToHome}
        />
      </div>
    </div>
  );
}
