import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { useRef, useState } from "react";
import { auth, storage } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import Header from "../../components/header&footer/header/header";
import Footer from "../../components/header&footer/footer/footer";
import SignUpForm from "../../components/auth/sign-up/sign-up-form";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export default function SignUp() {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const passwordConfirmInputRef = useRef<HTMLInputElement>(null);

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

  const defaultImageURL = "/person-circle.svg";

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

        nameInputRef.current?.classList.add("form-control-invalid");
      } else {
        setIsName(true);

        nameInputRef.current?.classList.remove("form-control-invalid");
      }
    } else {
      setNameErrorMessage("");
      setIsName(false);

      nameInputRef.current?.classList.remove("form-control-invalid");
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

    nameInputRef.current?.classList.remove("form-control-invalid");

    emailInputRef.current?.classList.remove("form-control-invalid");

    passwordInputRef.current?.classList.remove("form-control-invalid");
    passwordInputRef.current?.classList.remove("form-control-valid");

    passwordConfirmInputRef.current?.classList.remove("form-control-invalid");
    passwordConfirmInputRef.current?.classList.remove("form-control-valid");
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

      const defaultImageResponse = await fetch(defaultImageURL);

      const defaultImageBlob = await defaultImageResponse.blob();

      const locationRef = ref(storage, `avatars/${credentials.user.uid}`);

      const result = await uploadBytes(locationRef, defaultImageBlob);

      const url = await getDownloadURL(result.ref);

      await updateProfile(credentials.user, {
        displayName: name,
        photoURL: url,
      });

      signOut();
    } catch (error) {
      window.localStorage.removeItem("verificationNeeded");

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
      <Header avatar={auth.currentUser?.photoURL} />
      <div className="wrap">
        <SignUpForm
          isLoading={isLoading}
          error={error}
          nameInputRef={nameInputRef}
          name={name}
          handleName={handleName}
          isName={isName}
          nameErrorMessage={nameErrorMessage}
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
          passwordConfirmInputRef={passwordConfirmInputRef}
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
