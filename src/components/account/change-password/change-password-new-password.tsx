import { Form } from "react-bootstrap";

export interface ChangePasswordNewPasswordProps {
  newPasswordInputRef: React.RefObject<HTMLInputElement>;
  newPassword: string;
  handleNewPassword: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isNewPassword: boolean;
  newPasswordErrorMessage: string;
  noSpace: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function ChangePasswordNewPassword({
  newPasswordInputRef,
  newPassword,
  handleNewPassword,
  isNewPassword,
  newPasswordErrorMessage,
  noSpace,
}: ChangePasswordNewPasswordProps) {
  return (
    <Form.Group>
      <Form.Label htmlFor="newPassword">New Password</Form.Label>
      <Form.Control
        ref={newPasswordInputRef}
        className="border-none mt-1 mb-1 rounded-pill"
        onChange={handleNewPassword}
        onKeyDown={noSpace}
        id="newPassword"
        name="newPassword"
        value={newPassword}
        type="password"
        autoComplete="new-password"
        maxLength={20}
      />
      {!isNewPassword && newPasswordErrorMessage && (
        <div className="mt-2 text-danger">{newPasswordErrorMessage}</div>
      )}
    </Form.Group>
  );
}
