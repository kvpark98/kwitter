import { Form } from "react-bootstrap";
import SignUpPasswordConfirmType from "./sign-up-password-confirm-type";

export interface SignUpPasswordConfirmProps {
  passwordConfirmInputRef: React.RefObject<HTMLInputElement>;
  passwordConfirmInputType: boolean;
  changePasswordConfirmType: () => void;
  passwordConfirm: string;
  handleSignUpPasswordConfirm: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  isPassword: boolean;
  isPasswordConfirm: boolean;
  passwordConfirmErrorMessage: string;
  noSpace: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function SignUpPasswordConfirm({
  passwordConfirmInputRef,
  passwordConfirmInputType,
  changePasswordConfirmType,
  passwordConfirm,
  handleSignUpPasswordConfirm,
  isPassword,
  isPasswordConfirm,
  passwordConfirmErrorMessage,
  noSpace,
}: SignUpPasswordConfirmProps) {
  return (
    <Form.Group>
      <div className="d-flex align-items-center mb-2">
        <Form.Label htmlFor="passwordConfirm" className="m-0">
          Password confirm
        </Form.Label>
        <SignUpPasswordConfirmType
          passwordConfirmInputType={passwordConfirmInputType}
          changePasswordConfirmType={changePasswordConfirmType}
        />
      </div>
      <Form.Control
        ref={passwordConfirmInputRef}
        className="border-none mt-1 mb-1 rounded-pill"
        onChange={handleSignUpPasswordConfirm}
        onKeyDown={noSpace}
        id="passwordConfirm"
        name="passwordConfirm"
        value={passwordConfirm}
        type={passwordConfirmInputType ? "text" : "password"}
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
