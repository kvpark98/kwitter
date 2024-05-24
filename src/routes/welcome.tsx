import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import {
  browserLocalPersistence,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  sendEmailVerification,
  sendSignInLinkToEmail,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase";
import SignIn from "../components/auth/sign-in/sign-in";
import AccountDeleteSuccessModal from "../components/modals/success/sign-in/account-delete-success-modal";
import PasswordChangeSuccessModal from "../components/modals/success/sign-in/password-change-success-modal";
import EmailVerificationNeededWarningModal from "../components/modals/warning/sign-in/email-verification-needed-warning-modal";
import EmailNotVerifiedErrorModal from "../components/modals/error/sign-in/email-not-verified-error-modal";
import SignInErrorModal from "../components/modals/error/sign-in/sign-in-error-modal";
import SignUp from "../components/auth/sign-up/sign-up";
import SignUpErrorModal from "../components/modals/error/sign-up/sign-up-error-modal";
import SendSignInLink from "../components/auth/send-sign-in-link/send-sign-in-link";
import SignInLinkWarningModal from "../components/modals/warning/send-sign-in-link/sign-in-link-warning-modal";
import SendSignInLinkErrorModal from "../components/modals/error/send-sign-in-link/send-sign-in-link-error-modal";
import MainLogo from "../components/welcome/main-logo";
import MainContent from "../components/welcome/main-content";

// 미디어 쿼리를 사용하여 스타일 정의
export const StyledWelcome = styled.div`
  @media screen and (min-width: 900px) {
    display: flex !important;
    height: 100% !important;
    overflow-y: auto !important;
  }
  @media screen and (max-width: 900px) {
    display: block !important;
    height: 100% !important;
    overflow-y: auto !important;
    padding: 0 20px 50px;
  }
  @media screen and (max-width: 500px) {
    display: block !important;
    height: 100% !important;
    overflow-y: auto !important;
    padding: 0 20px 50px;
  }
`;

// 미디어 쿼리를 사용하여 스타일 정의
export const StyledLogoDiv = styled.div`
  @media screen and (min-width: 900px) {
    display: flex !important;
    flex: 1 1 auto !important;
    justify-content: center !important;
    align-items: center !important;
  }
  @media screen and (max-width: 900px) {
    display: flex !important;
    flex: 1 1 auto !important;
    justify-content: center !important;
    align-items: center !important;
    margin: 50px 0 !important;
  }
`;

// 미디어 쿼리를 사용하여 스타일 정의
export const StyledLogoSvg = styled.svg`
  @media screen and (min-width: 900px) {
    width: 300px !important;
    height: 300px !important;
  }
  @media screen and (max-width: 900px) {
    width: 130px !important;
    height: 130px !important;
  }
  @media screen and (max-width: 500px) {
    width: 80px !important;
    height: 80px !important;
  }
`;

// 미디어 쿼리를 사용하여 스타일 정의
export const StyledTitle = styled.div`
  @media screen and (min-width: 900px) {
    text-align: center;
    font-size: 3rem !important;
  }
  @media screen and (max-width: 900px) {
    text-align: center;
    font-size: 2.5rem !important;
  }
  @media screen and (max-width: 500px) {
    text-align: center;
    font-size: 2rem !important;
  }
`;

// 미디어 쿼리를 사용하여 스타일 정의
export const StyledP = styled.p`
  @media screen and (min-width: 900px) {
    font-size: 1.6rem !important;
    margin-bottom: 16px !important;
  }
  @media screen and (max-width: 900px) {
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    font-size: 1.5rem !important;
    margin-bottom: 16px !important;
  }
  @media screen and (max-width: 500px) {
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    font-size: 1.4rem !important;
    margin-bottom: 16px !important;
  }
`;

// 미디어 쿼리를 사용하여 스타일 정의
export const StyledButton = styled.div`
  @media screen and (max-width: 900px) {
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
  }
`;

export default function Welcome() {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const signInLinkEmailInputRef = useRef<HTMLInputElement>(null);
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

  const [isRememberMe, setIsRememberMe] = useState(false);

  const [isPasswordChanged, setIsPasswordChanged] = useState(
    window.localStorage.getItem("PasswordChanged") || ""
  );

  const [accountDeleted, setAccountDeleted] = useState(
    window.localStorage.getItem("accountDeleted") || ""
  );

  const [error, setError] = useState(
    window.localStorage.getItem("error") || ""
  );

  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [passwordConfirmErrorMessage, setPasswordConfirmErrorMessage] =
    useState("");

  const [showSignInModal, setShowSignInModal] = useState(false);
  const handleShowSignInModal = () => {
    setShowSignInModal(true);
  };
  const handleCloseSignInModal = () => {
    setShowSignInModal(false);
    resetSignIn();
  };

  const [showAccountDeleteSuccessModal, setShowAccountDeleteSuccessModal] =
    useState(false);
  const handleShowAccountDeleteSuccessModal = () =>
    setShowAccountDeleteSuccessModal(true);
  const handleCloseAccountDeleteSuccessModal = () =>
    setShowAccountDeleteSuccessModal(false);

  const [showPassordChangeSuccessModal, setShowPassordChangeSuccessModal] =
    useState(false);
  const handleShowPassordChangeSuccessModal = () =>
    setShowPassordChangeSuccessModal(true);
  const handleClosePassordChangeSuccessModal = () =>
    setShowPassordChangeSuccessModal(false);

  const [
    showEmailVerificationNeededWarningModal,
    setShowEmailVerificationNeededWarningModal,
  ] = useState(false);
  const handleShowEmailVerificationNeededWarningModal = () => {
    handleCloseSignUpModal();
    setShowEmailVerificationNeededWarningModal(true);
  };
  const handleCloseEmailVerificationNeededWarningModal = () =>
    setShowEmailVerificationNeededWarningModal(false);

  const [showEmailNotVerifiedErrorModal, setShowEmailNotVerifiedErrorModal] =
    useState(false);
  const handleShowEmailNotVerifiedErrorModal = () => {
    setShowSignInModal(false);
    setShowEmailNotVerifiedErrorModal(true);
  };
  const handleCloseEmailNotVerifiedErrorModal = () => {
    setShowEmailNotVerifiedErrorModal(false);
    setShowSignInModal(true);
  };

  const [showSignInErrorModal, setShowSignInErrorModal] = useState(false);
  const handleShowSignInErrorModal = () => {
    setShowSignInModal(false);
    setShowSignInErrorModal(true);
  };
  const handleCloseSignInErrorModal = () => {
    setShowSignInErrorModal(false);
    setShowSignInModal(true);
  };

  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const handleShowSignUpModal = () => setShowSignUpModal(true);
  const handleCloseSignUpModal = () => {
    setShowSignUpModal(false);
    resetSignUp();
  };

  const [showSignUpErrorModal, setShowSignUpErrorModal] = useState(false);
  const handleShowSignUpErrorModal = () => {
    setShowSignUpModal(false);
    setShowSignUpErrorModal(true);
  };
  const handleCloseSignUpErrorModal = () => {
    setShowSignUpErrorModal(false);
    setShowSignUpModal(true);
  };

  const [showSendSignInLinkModal, setShowSendSignInLinkModal] = useState(false);
  const handleShowSendSignInLinkModal = () => {
    handleCloseSignInModal();
    setShowSendSignInLinkModal(true);
  };
  const handleCloseSendSignInLinkModal = () => {
    setShowSendSignInLinkModal(false);
    resetSendSignInLink();
    handleShowSignInModal();
  };

  const [showSignInLinkWarningModal, setShowSignInLinkWarningModal] =
    useState(false);
  const handleShowSignInLinkWarningModal = () => {
    setShowSendSignInLinkModal(false);
    resetSendSignInLink();
    setShowSignInLinkWarningModal(true);
  };
  const handleCloseSignInLinkWarningModal = () =>
    setShowSignInLinkWarningModal(false);

  const [showSendSignInLinkErrorModal, setShowSendSignInLinkErrorModal] =
    useState(false);
  const handleShowSendSignInLinkErrorModal = () => {
    setShowSendSignInLinkModal(false);
    setShowSendSignInLinkErrorModal(true);
  };
  const handleCloseSendSignInLinkErrorModal = () => {
    setShowSendSignInLinkErrorModal(false);
    setShowSendSignInLinkModal(true);
  };

  useEffect(() => {
    if (isPasswordChanged) {
      handleShowPassordChangeSuccessModal();
    }
    if (accountDeleted) {
      handleShowAccountDeleteSuccessModal();
    }
    window.localStorage.removeItem("error");
    window.localStorage.removeItem("verificationNeeded");
    window.localStorage.removeItem("PasswordChanged");
    window.localStorage.removeItem("accountDeleted");
  }, [isPasswordChanged, accountDeleted]);

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

        if (showSendSignInLinkModal) {
          signInLinkEmailInputRef.current?.classList.add(
            "form-control-invalid"
          );
        } else {
          emailInputRef.current?.classList.add("form-control-invalid");
        }
      } else {
        setIsEmail(true);

        if (showSendSignInLinkModal) {
          signInLinkEmailInputRef.current?.classList.remove(
            "form-control-invalid"
          );
        } else {
          emailInputRef.current?.classList.remove("form-control-invalid");
        }
      }
    } else {
      setEmailErrorMessage("");
      setIsEmail(false);

      if (showSendSignInLinkModal) {
        signInLinkEmailInputRef.current?.classList.remove(
          "form-control-invalid"
        );
      } else {
        emailInputRef.current?.classList.remove("form-control-invalid");
      }
    }
  };

  const handleSignInPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setPassword(value.replace(/\s/gi, ""));

    if (value !== "") {
      setIsPassword(true);
    } else {
      setIsPassword(false);
    }
  };

  const handleSignUpPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleSignUpPasswordConfirm = (
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
    navigate("/welcome");
  };

  const resetSignIn = () => {
    setEmail("");
    setPassword("");

    setIsEmail(false);
    setIsPassword(false);

    setEmailErrorMessage("");

    emailInputRef.current?.classList.remove("form-control-invalid");
  };

  const resetSignUp = () => {
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

  const resetSendSignInLink = () => {
    setEmail("");

    setIsEmail(false);

    setEmailErrorMessage("");

    signInLinkEmailInputRef.current?.classList.remove("form-control-invalid");
  };

  const actionCodeSettings = {
    url: "http://127.0.0.1:5173/welcome",
    handleCodeInApp: true,
  };

  const actionCodeSettingsSendSignInLink = {
    url: "http://127.0.0.1:5173/sign-in-with-email",
    handleCodeInApp: true,
  };

  const checkIfEmailExists = async (email: string) => {
    try {
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      return signInMethods;
    } catch (error) {
      throw error;
    }
  };

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
        navigate("/");
      } else {
        handleShowEmailNotVerifiedErrorModal();
        signOut();
      }
    } catch (error) {
      setIsPasswordChanged("");
      setAccountDeleted("");

      if (error instanceof FirebaseError) {
        setError(error.code);
      }

      handleShowSignInErrorModal();
    } finally {
      setIsLoading(false);
    }
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

      handleShowEmailVerificationNeededWarningModal();

      await updateProfile(credentials.user, {
        displayName: name,
      });

      signOut();
    } catch (error) {
      window.localStorage.removeItem("verificationNeeded");

      if (error instanceof FirebaseError) {
        setError(error.code);
      }

      handleShowSignUpErrorModal();
    } finally {
      setIsLoading(false);
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
        await sendSignInLinkToEmail(
          auth,
          email,
          actionCodeSettingsSendSignInLink
        );
        handleShowSignInLinkWarningModal();
      } else {
        throw new Error("auth/no-email");
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError(error.code);
      } else {
        setError("auth/no-email");
      }

      handleShowSendSignInLinkErrorModal();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <StyledWelcome>
      <MainLogo />
      <MainContent
        handleShowSignUpModal={handleShowSignUpModal}
        handleShowSignInModal={handleShowSignInModal}
      />
      <SignIn
        showSignInModal={showSignInModal}
        handleCloseSignInModal={handleCloseSignInModal}
        emailInputRef={emailInputRef}
        isLoading={isLoading}
        email={email}
        handleEmail={handleEmail}
        isEmail={isEmail}
        emailErrorMessage={emailErrorMessage}
        password={password}
        handleSignInPassword={handleSignInPassword}
        isPassword={isPassword}
        handleRememberMe={handleRememberMe}
        noSpace={noSpace}
        resetSignIn={resetSignIn}
        signIn={signIn}
        handleShowSendSignInLinkModal={handleShowSendSignInLinkModal}
      />
      <AccountDeleteSuccessModal
        showAccountDeleteSuccessModal={showAccountDeleteSuccessModal}
        handleCloseAccountDeleteSuccessModal={
          handleCloseAccountDeleteSuccessModal
        }
      />
      <PasswordChangeSuccessModal
        showPassordChangeSuccessModal={showPassordChangeSuccessModal}
        handleClosePassordChangeSuccessModal={
          handleClosePassordChangeSuccessModal
        }
      />
      <EmailVerificationNeededWarningModal
        showEmailVerificationNeededWarningModal={
          showEmailVerificationNeededWarningModal
        }
        handleCloseEmailVerificationNeededWarningModal={
          handleCloseEmailVerificationNeededWarningModal
        }
      />
      <EmailNotVerifiedErrorModal
        showEmailNotVerifiedErrorModal={showEmailNotVerifiedErrorModal}
        handleCloseEmailNotVerifiedErrorModal={
          handleCloseEmailNotVerifiedErrorModal
        }
      />
      <SignInErrorModal
        error={error}
        showSignInErrorModal={showSignInErrorModal}
        handleCloseSignInErrorModal={handleCloseSignInErrorModal}
      />
      <SignUp
        showSignUpModal={showSignUpModal}
        handleCloseSignUpModal={handleCloseSignUpModal}
        isLoading={isLoading}
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
        handleSignUpPassword={handleSignUpPassword}
        isPassword={isPassword}
        passwordErrorMessage={passwordErrorMessage}
        passwordConfirmInputRef={passwordConfirmInputRef}
        passwordConfirm={passwordConfirm}
        handleSignUpPasswordConfirm={handleSignUpPasswordConfirm}
        isPasswordConfirm={isPasswordConfirm}
        passwordConfirmErrorMessage={passwordConfirmErrorMessage}
        noSpace={noSpace}
        resetSignUp={resetSignUp}
        signUp={signUp}
      />
      <SignUpErrorModal
        error={error}
        showSignUpErrorModal={showSignUpErrorModal}
        handleCloseSignUpErrorModal={handleCloseSignUpErrorModal}
      />
      <SendSignInLink
        signInLinkEmailInputRef={signInLinkEmailInputRef}
        showSendSignInLinkModal={showSendSignInLinkModal}
        handleCloseSendSignInLinkModal={handleCloseSendSignInLinkModal}
        isLoading={isLoading}
        email={email}
        handleEmail={handleEmail}
        isEmail={isEmail}
        emailErrorMessage={emailErrorMessage}
        noSpace={noSpace}
        resetSendSignInLink={resetSendSignInLink}
        sendSignInLink={sendSignInLink}
      />
      <SignInLinkWarningModal
        showSignInLinkWarningModal={showSignInLinkWarningModal}
        handleCloseSignInLinkWarningModal={handleCloseSignInLinkWarningModal}
      />
      <SendSignInLinkErrorModal
        showSendSignInLinkErrorModal={showSendSignInLinkErrorModal}
        handleCloseSendSignInLinkErrorModal={
          handleCloseSendSignInLinkErrorModal
        }
        error={error}
      />
    </StyledWelcome>
  );
}
