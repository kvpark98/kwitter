import { Form } from "react-bootstrap";
import ChangePasswordNewType from "./change-password-new-type";

export interface ChangePasswordNewPasswordProps {
  newPasswordInputRef: React.RefObject<HTMLInputElement>;
  newPasswordInputType: boolean;
  changeNewPasswordType: () => void;
  newPassword: string;
  handleNewPassword: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isNewPassword: boolean;
  newPasswordErrorMessage: string;
  noSpace: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function ChangePasswordNewPassword({
  newPasswordInputRef,
  newPasswordInputType,
  changeNewPasswordType,
  newPassword,
  handleNewPassword,
  isNewPassword,
  newPasswordErrorMessage,
  noSpace,
}: ChangePasswordNewPasswordProps) {
  return (
    <Form.Group>
      <div className="d-flex align-items-center mb-2">
        <Form.Label htmlFor="newPassword" className="m-0">
          New password
        </Form.Label>
        <ChangePasswordNewType
          newPasswordInputType={newPasswordInputType}
          changeNewPasswordType={changeNewPasswordType}
        />
      </div>
      <Form.Control
        ref={newPasswordInputRef}
        className="border-none mt-1 mb-1 rounded-pill"
        onChange={handleNewPassword}
        onKeyDown={noSpace}
        id="newPassword"
        name="newPassword"
        value={newPassword}
        type={newPasswordInputType ? "text" : "password"}
        maxLength={20}
        autoComplete="password"
      />
      {!isNewPassword && newPasswordErrorMessage && (
        <div className="mt-2 text-danger">{newPasswordErrorMessage}</div>
      )}
    </Form.Group>
  );
}
