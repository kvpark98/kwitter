import { Form } from "react-bootstrap";

export interface ResetPasswordPasswordConfirmProps {
  passwordConfirmInputRef: React.RefObject<HTMLInputElement>;
  passwordConfirm: string;
  handlePasswordConfirm: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isPassword: boolean;
  isPasswordConfirm: boolean;
  passwordConfirmErrorMessage: string;
  noSpace: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function ResetPasswordPasswordConfirm({
  passwordConfirmInputRef,
  passwordConfirm,
  handlePasswordConfirm,
  isPassword,
  isPasswordConfirm,
  passwordConfirmErrorMessage,
  noSpace,
}: ResetPasswordPasswordConfirmProps) {
  return (
    <Form.Group>
      <Form.Label htmlFor="passwordConfirm">New password confirm</Form.Label>
      <Form.Control
        ref={passwordConfirmInputRef}
        className="border-none mt-1 mb-1 rounded-pill"
        onChange={handlePasswordConfirm}
        onKeyDown={noSpace}
        id="passwordConfirm"
        name="passwordConfirm"
        value={passwordConfirm}
        type="password"
        maxLength={20}
        autoComplete="password"
        {...(!isPassword ? { disabled: true } : { disabled: false })}
      />
      {!isPasswordConfirm && passwordConfirmErrorMessage && (
        <div className="mt-2 text-danger">{passwordConfirmErrorMessage}</div>
      )}
    </Form.Group>
  );
}
