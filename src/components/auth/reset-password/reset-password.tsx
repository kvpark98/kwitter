import ResetPasswordForm from "./reset-password-form";
import { Modal } from "react-bootstrap";
import ResetPasswordHeader from "./reset-password-header";

export interface ResetPasswordProps {
  showResetPasswordModal: boolean;
  handleCloseResetPasswordModal: () => void;
  passwordInputRef: React.RefObject<HTMLInputElement>;
  passwordConfirmInputRef: React.RefObject<HTMLInputElement>;
  isLoading: boolean;
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
}

export default function ResetPassword({
  showResetPasswordModal,
  handleCloseResetPasswordModal,
  passwordInputRef,
  passwordConfirmInputRef,
  isLoading,
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
}: ResetPasswordProps) {
  return (
    <Modal
      show={showResetPasswordModal}
      onHide={handleCloseResetPasswordModal}
      backdrop="static"
      keyboard={false}
      className="border-0"
      centered
    >
      <ResetPasswordHeader />
      <ResetPasswordForm
        passwordInputRef={passwordInputRef}
        passwordConfirmInputRef={passwordConfirmInputRef}
        isLoading={isLoading}
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
      />
    </Modal>
  );
}
