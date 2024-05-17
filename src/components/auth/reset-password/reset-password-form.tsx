import { Alert, Form } from "react-bootstrap";
import ResetPasswordErrors from "../../alert/error/auth/reset-password/reset-password-errors";
import SignInWithEmailSuccess from "../../alert/success/auth/reset-password/sign-in-with-email-success";
import { Wrapper } from "../../styles/auth-components";
import ResetPasswordSwitcher from "./reset-password-switcher";
import ResetPasswordButton from "./reset-password-button";
import ResetPasswordPassword from "./reset-password-password";
import ResetPasswordPasswordConfirm from "./reset-password-password-confirm.tsx";
import ResetPasswordWarningModal from "../../modals/warning/reset-password-warning-modal.tsx";

export interface ResetPasswordFormProps {
  passwordInputRef: React.RefObject<HTMLInputElement>;
  passwordConfirmInputRef: React.RefObject<HTMLInputElement>;
  isLoading: boolean;
  error: string;
  password: string;
  handlePassword: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isPassword: boolean;
  passwordErrorMessage: string;
  passwordConfirm: string;
  handlePasswordConfirm: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isPasswordConfirm: boolean;
  passwordConfirmErrorMessage: string;
  noSpace: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  reset: () => void;
  resetPassword: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  showModal: boolean;
  handleShowModal: () => void;
  handleCloseModal: () => void;
  navigateToHome: () => void;
}

export default function ResetPasswordForm({
  passwordInputRef,
  passwordConfirmInputRef,
  isLoading,
  error,
  password,
  handlePassword,
  isPassword,
  passwordErrorMessage,
  passwordConfirm,
  handlePasswordConfirm,
  isPasswordConfirm,
  passwordConfirmErrorMessage,
  noSpace,
  reset,
  resetPassword,
  showModal,
  handleShowModal,
  handleCloseModal,
  navigateToHome,
}: ResetPasswordFormProps) {
  return (
    <Wrapper>
      <h1 className="fs-2 mb-2">Reset Password</h1>
      {window.sessionStorage.getItem("isSignedInWithEmail") && (
        <SignInWithEmailSuccess />
      )}
      {error && <ResetPasswordErrors error={error} />}
      <Alert variant="light" className="mt-3 px-4 py-4 w-100">
        <Form onSubmit={resetPassword} className="d-flex flex-column row-gap-3">
          <ResetPasswordPassword
            passwordInputRef={passwordInputRef}
            password={password}
            handlePassword={handlePassword}
            isPassword={isPassword}
            passwordErrorMessage={passwordErrorMessage}
            noSpace={noSpace}
          />
          <ResetPasswordPasswordConfirm
            passwordConfirmInputRef={passwordConfirmInputRef}
            passwordConfirm={passwordConfirm}
            handlePasswordConfirm={handlePasswordConfirm}
            isPassword={isPassword}
            isPasswordConfirm={isPasswordConfirm}
            passwordConfirmErrorMessage={passwordConfirmErrorMessage}
            noSpace={noSpace}
          />
          <ResetPasswordButton
            isLoading={isLoading}
            isPassword={isPassword}
            isPasswordConfirm={isPasswordConfirm}
          />
        </Form>
        <ResetPasswordSwitcher
          reset={reset}
          handleShowModal={handleShowModal}
        />
      </Alert>
      <ResetPasswordWarningModal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        navigateToHome={navigateToHome}
      />
    </Wrapper>
  );
}
