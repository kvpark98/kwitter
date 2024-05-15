import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import {
  browserLocalPersistence,
  browserSessionPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";
import SignIn from "../components/auth/sign-in/sign-in";
import AccountDeleteSuccessModal from "../components/modals/success/sign-in/account-delete-success-modal";
import PasswordChangeSuccessModal from "../components/modals/success/sign-in/password-change-success-modal";
import EmailVerificationNeededWarningModal from "../components/modals/warning/sign-in/email-verification-needed-warning-modal";
import EmailNotVerifiedErrorModal from "../components/modals/error/sign-in/email-not-verified-error-modal";
import SignInErrorModal from "../components/modals/error/sign-in/sign-in-error-modal";

// 미디어 쿼리를 사용하여 스타일 정의
const StyledWelcome = styled.div`
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
const StyledLogoDiv = styled.div`
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
    margin: 30px 0 !important;
  }
`;

// 미디어 쿼리를 사용하여 스타일 정의
const StyledLogoSvg = styled.svg`
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
const StyledTitle = styled.div`
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
const StyledP = styled.p`
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
const StyledButton = styled.div`
  @media screen and (max-width: 900px) {
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
  }
`;

export default function Welcome() {
  const emailInputRef = useRef<HTMLInputElement>(null);

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

  const [showSignInModal, setShowSignInModal] = useState(false);
  const handleShowSignInModal = () => setShowSignInModal(true);
  const handleCloseSignInModal = () => {
    setShowSignInModal(false);
    reset();
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
  const handleShowEmailVerificationNeededWarningModal = () =>
    setShowEmailVerificationNeededWarningModal(true);
  const handleCloseEmailVerificationNeededWarningModal = () =>
    setShowEmailVerificationNeededWarningModal(false);

  const [showEmailNotVerifiedErrorModal, setShowEmailNotVerifiedErrorModal] =
    useState(false);
  const handleShowEmailNotVerifiedErrorModal = () => {
    setShowEmailNotVerifiedErrorModal(true);
    setShowSignInModal(false);
  };
  const handleCloseEmailNotVerifiedErrorModal = () => {
    setShowEmailNotVerifiedErrorModal(false);
    setShowSignInModal(true);
  };

  const [showSignInErrorModal, setShowSignInErrorModal] = useState(false);
  const handleShowSignInErrorModal = () => {
    setShowSignInErrorModal(true);
    setShowSignInModal(false);
  };
  const handleCloseSignInErrorModal = () => {
    setShowSignInErrorModal(false);
    setShowSignInModal(true);
  };

  useEffect(() => {
    if (accountDeleted && !error) {
      handleShowAccountDeleteSuccessModal();
    }
    if (isPasswordChanged && !error) {
      handleShowPassordChangeSuccessModal();
    }
    if (isVerificationNeeded && !error) {
      handleShowEmailVerificationNeededWarningModal();
    }
    if (showEmailNotVerified && !error) {
      handleShowEmailNotVerifiedErrorModal();
    }
    if (error) {
      handleShowSignInErrorModal();
    }
  }, [
    accountDeleted,
    isPasswordChanged,
    isVerificationNeeded,
    showEmailNotVerified,
    error,
  ]);

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
    } else {
      setIsPassword(false);
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

  const reset = () => {
    setEmail("");
    setPassword("");

    setIsEmail(false);
    setIsPassword(false);

    setEmailErrorMessage("");

    emailInputRef.current?.classList.remove("form-control-invalid");
  };

  useEffect(() => {
    window.localStorage.removeItem("verificationNeeded");
    window.localStorage.removeItem("PasswordChanged");
    window.localStorage.removeItem("accountDeleted");
    window.localStorage.removeItem("error");

    setTimeout(() => {
      setIsVerificationNeeded("");
      setIsPasswordChanged("");
      setAccountDeleted("");
      setError("");
    }, 5000);
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

        signOut();

        setTimeout(() => {
          setShowEmailNotVerified(false);
        }, 5000);
      }
    } catch (error) {
      setIsVerificationNeeded("");
      setIsPasswordChanged("");
      setAccountDeleted("");

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

  console.log("user", auth.currentUser);
  console.log("emailVerified", auth.currentUser?.emailVerified);

  return (
    <StyledWelcome>
      <StyledLogoDiv>
        <StyledLogoSvg
          xmlns="http://www.w3.org/2000/svg"
          width="300"
          height="300"
          fill="currentColor"
          className="bi bi-twitter-x"
          viewBox="0 0 16 16"
        >
          <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
        </StyledLogoSvg>
      </StyledLogoDiv>
      <div className="d-flex flex-fill justify-content-center align-items-center">
        <div className="d-flex flex-column row-gap-3">
          <StyledTitle className="fw-bold mb-5">
            Welcome to Kwitter!
          </StyledTitle>
          <div>
            <StyledP>New to Kwitter?</StyledP>
            <StyledButton className="btn btn-primary rounded-pill">
              Create an account
            </StyledButton>
          </div>
          <hr />
          <div>
            <StyledP>Already have an account?</StyledP>
            <StyledButton
              onClick={handleShowSignInModal}
              className="btn btn-outline-primary rounded-pill"
            >
              Sign in
            </StyledButton>
          </div>
        </div>
      </div>
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
        handlePassword={handlePassword}
        isPassword={isPassword}
        handleRememberMe={handleRememberMe}
        noSpace={noSpace}
        reset={reset}
        signIn={signIn}
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
    </StyledWelcome>
  );
}
