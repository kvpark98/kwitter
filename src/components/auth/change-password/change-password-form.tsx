import { Alert, Form } from "react-bootstrap";
import ChangePasswordErrors from "../../alert/error/auth/change-password/change-password-errors";
import { Wrapper } from "../../styles/auth-components";
import ChangePasswordSwitcher from "./change-password-switcher";
import ChangePasswordButton from "./change-password-button";
import ChangePasswordCurrentPassword from "./change-password-current-password";
import ChangePasswordNewPassword from "./change-password-new-password";
import ChangePasswordNewPasswordConfirm from "./change-password-new-password-confirm.tsx";

export interface ChangePasswordFormProps {
  newPasswordInputRef: React.RefObject<HTMLInputElement>;
  newPasswordConfirmInputRef: React.RefObject<HTMLInputElement>;
  isLoading: boolean;
  error: string;
  currentPassword: string;
  handleCurrentPassword: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isCurrentPassword: boolean;
  newPassword: string;
  handleNewPassword: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isNewPassword: boolean;
  newPasswordErrorMessage: string;
  newPasswordConfirm: string;
  handleNewPasswordConfirm: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  isNewPasswordConfirm: boolean;
  newPasswordConfirmErrorMessage: string;
  noSpace: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  reset: () => void;
  goBack: () => void;
  changePassword: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

export default function ChangePasswordForm({
  newPasswordInputRef,
  newPasswordConfirmInputRef,
  isLoading,
  error,
  currentPassword,
  handleCurrentPassword,
  isCurrentPassword,
  newPassword,
  handleNewPassword,
  isNewPassword,
  newPasswordErrorMessage,
  newPasswordConfirm,
  handleNewPasswordConfirm,
  isNewPasswordConfirm,
  newPasswordConfirmErrorMessage,
  noSpace,
  reset,
  goBack,
  changePassword,
}: ChangePasswordFormProps) {
  return (
    <Wrapper>
      <h1 className="fs-2 mb-2">Change Password</h1>
      {error && <ChangePasswordErrors error={error} />}
      <Alert variant="light" className="mt-3 px-4 py-4 w-100">
        <Form
          onSubmit={changePassword}
          className="d-flex flex-column row-gap-3"
        >
          <ChangePasswordCurrentPassword
            currentPassword={currentPassword}
            handleCurrentPassword={handleCurrentPassword}
            noSpace={noSpace}
          />
          <ChangePasswordNewPassword
            newPasswordInputRef={newPasswordInputRef}
            newPassword={newPassword}
            handleNewPassword={handleNewPassword}
            isNewPassword={isNewPassword}
            newPasswordErrorMessage={newPasswordErrorMessage}
            noSpace={noSpace}
          />
          <ChangePasswordNewPasswordConfirm
            newPasswordConfirmInputRef={newPasswordConfirmInputRef}
            newPasswordConfirm={newPasswordConfirm}
            handleNewPasswordConfirm={handleNewPasswordConfirm}
            isNewPassword={isNewPassword}
            isNewPasswordConfirm={isNewPasswordConfirm}
            newPasswordConfirmErrorMessage={newPasswordConfirmErrorMessage}
            noSpace={noSpace}
          />
          <ChangePasswordButton
            isLoading={isLoading}
            isCurrentPassword={isCurrentPassword}
            isNewPassword={isNewPassword}
            isNewPasswordConfirm={isNewPasswordConfirm}
          />
        </Form>
        <ChangePasswordSwitcher reset={reset} goBack={goBack} />
      </Alert>
    </Wrapper>
  );
}
