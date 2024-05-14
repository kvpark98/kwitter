import { Form } from "react-bootstrap";

export interface ChangePasswordNewPasswordConfirmProps {
  newPasswordConfirmInputRef: React.RefObject<HTMLInputElement>;
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
  newPasswordConfirm,
  handleNewPasswordConfirm,
  isNewPassword,
  isNewPasswordConfirm,
  newPasswordConfirmErrorMessage,
  noSpace,
}: ChangePasswordNewPasswordConfirmProps) {
  return (
    <Form.Group>
      <Form.Label htmlFor="newPasswordConfirm">New Password Confirm</Form.Label>
      <Form.Control
        ref={newPasswordConfirmInputRef}
        className="border-none mt-1 mb-1 rounded-pill"
        onChange={handleNewPasswordConfirm}
        onKeyDown={noSpace}
        id="newPasswordConfirm"
        name="newPasswordConfirm"
        value={newPasswordConfirm}
        type="password"
        autoComplete="new-password"
        maxLength={20}
        {...(!isNewPassword ? { disabled: true } : { disabled: false })}
      />
      {!isNewPasswordConfirm && newPasswordConfirmErrorMessage && (
        <div className="mt-2 text-danger">{newPasswordConfirmErrorMessage}</div>
      )}
    </Form.Group>
  );
}
