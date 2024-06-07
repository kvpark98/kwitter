import { Modal } from "react-bootstrap";
import ChangePasswordHeader from "./change-password-header";
import ChangePasswordForm from "./change-password-form";

export interface ChangePasswordProps {
  showChangePasswordModal: boolean;
  handleCloseChangePasswordModal: () => void;
  newPasswordInputRef: React.RefObject<HTMLInputElement>;
  newPasswordConfirmInputRef: React.RefObject<HTMLInputElement>;
  isLoading: boolean;
  currentPasswordInputType: boolean;
  newPasswordInputType: boolean;
  newPasswordConfirmInputType: boolean;
  changeCurrentPasswordType: () => void;
  changeNewPasswordType: () => void;
  changeNewPasswordConfirmType: () => void;
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

export default function ChangePassword({
  showChangePasswordModal,
  handleCloseChangePasswordModal,
  newPasswordInputRef,
  newPasswordConfirmInputRef,
  isLoading,
  currentPasswordInputType,
  newPasswordInputType,
  newPasswordConfirmInputType,
  changeCurrentPasswordType,
  changeNewPasswordType,
  changeNewPasswordConfirmType,
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
}: ChangePasswordProps) {
  return (
    <Modal
      show={showChangePasswordModal}
      onHide={handleCloseChangePasswordModal}
      backdrop="static"
      keyboard={false}
      className="border-0"
      centered
    >
      <ChangePasswordHeader
        handleCloseChangePasswordModal={handleCloseChangePasswordModal}
      />
      <ChangePasswordForm
        newPasswordInputRef={newPasswordInputRef}
        newPasswordConfirmInputRef={newPasswordConfirmInputRef}
        isLoading={isLoading}
        currentPasswordInputType={currentPasswordInputType}
        newPasswordInputType={newPasswordInputType}
        newPasswordConfirmInputType={newPasswordConfirmInputType}
        changeCurrentPasswordType={changeCurrentPasswordType}
        changeNewPasswordType={changeNewPasswordType}
        changeNewPasswordConfirmType={changeNewPasswordConfirmType}
        currentPassword={currentPassword}
        handleCurrentPassword={handleCurrentPassword}
        isCurrentPassword={isCurrentPassword}
        newPassword={newPassword}
        handleNewPassword={handleNewPassword}
        isNewPassword={isNewPassword}
        newPasswordErrorMessage={newPasswordErrorMessage}
        newPasswordConfirm={newPasswordConfirm}
        handleNewPasswordConfirm={handleNewPasswordConfirm}
        isNewPasswordConfirm={isNewPasswordConfirm}
        newPasswordConfirmErrorMessage={newPasswordConfirmErrorMessage}
        noSpace={noSpace}
        reset={reset}
        changePassword={changePassword}
      />
    </Modal>
  );
}
