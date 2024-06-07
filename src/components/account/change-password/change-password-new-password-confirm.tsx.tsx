import { Form } from "react-bootstrap";
import ChangePasswordNewConfirmType from "./change-password-new-confirm-type";

export interface ChangePasswordNewPasswordConfirmProps {
  newPasswordConfirmInputRef: React.RefObject<HTMLInputElement>;
  newPasswordConfirmInputType: boolean;
  changeNewPasswordConfirmType: () => void;
  newPasswordConfirm: string;
  handleNewPasswordConfirm: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  isNewPassword: boolean;
  isNewPasswordConfirm: boolean;
  newPasswordConfirmErrorMessage: string;
  noSpace: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function ChangePasswordNewPasswordConfirm({
  newPasswordConfirmInputRef,
  newPasswordConfirmInputType,
  changeNewPasswordConfirmType,
  newPasswordConfirm,
  handleNewPasswordConfirm,
  isNewPassword,
  isNewPasswordConfirm,
  newPasswordConfirmErrorMessage,
  noSpace,
}: ChangePasswordNewPasswordConfirmProps) {
  return (
    <Form.Group>
      <div className="d-flex align-items-center mb-2">
        <Form.Label htmlFor="newPasswordConfirm" className="m-0">
          New password confirm
        </Form.Label>
        <ChangePasswordNewConfirmType
          newPasswordConfirmInputType={newPasswordConfirmInputType}
          changeNewPasswordConfirmType={changeNewPasswordConfirmType}
        />
      </div>
      <Form.Control
        ref={newPasswordConfirmInputRef}
        className="border-none mt-1 mb-1 rounded-pill"
        onChange={handleNewPasswordConfirm}
        onKeyDown={noSpace}
        id="newPasswordConfirm"
        name="newPasswordConfirm"
        value={newPasswordConfirm}
        type={newPasswordConfirmInputType ? "text" : "password"}
        maxLength={20}
        autoComplete="password"
        {...(!isNewPassword ? { disabled: true } : { disabled: false })}
      />
      {!isNewPasswordConfirm && newPasswordConfirmErrorMessage && (
        <div className="mt-2 text-danger">{newPasswordConfirmErrorMessage}</div>
      )}
    </Form.Group>
  );
}
