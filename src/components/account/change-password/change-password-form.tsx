import { Alert, Form } from "react-bootstrap";
import ChangePasswordCurrentPassword from "./change-password-current-password.tsx";
import ChangePasswordNewPassword from "./change-password-new-password.tsx";
import ChangePasswordNewPasswordConfirm from "./change-password-new-password-confirm.tsx.tsx";
import ChangePasswordFooter from "./change-password-footer.tsx";

export interface ChangePasswordFormProps {
  newPasswordInputRef: React.RefObject<HTMLInputElement>;
  newPasswordConfirmInputRef: React.RefObject<HTMLInputElement>;
  isLoading: boolean;
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
  changePassword: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

export default function ChangePasswordForm({
  newPasswordInputRef,
  newPasswordConfirmInputRef,
  isLoading,
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
  changePassword,
}: ChangePasswordFormProps) {
  return (
    <Form onSubmit={changePassword}>
      <Alert
        variant="light"
        className="d-flex flex-column row-gap-3 border-0 m-0 p-4 w-100"
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
      </Alert>
      <ChangePasswordFooter
        isLoading={isLoading}
        isCurrentPassword={isCurrentPassword}
        isNewPassword={isNewPassword}
        isNewPasswordConfirm={isNewPasswordConfirm}
        reset={reset}
      />
    </Form>
  );
}
