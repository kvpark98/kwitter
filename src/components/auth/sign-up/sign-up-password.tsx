import { Form } from "react-bootstrap";
import SignUpPasswordType from "./sign-up-password-type";

export interface SignUpPasswordProps {
  passwordInputRef: React.RefObject<HTMLInputElement>;
  passwordInputType: boolean;
  changePasswordType: () => void;
  password: string;
  handleSignUpPassword: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isPassword: boolean;
  passwordErrorMessage: string;
  noSpace: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function SignUpPassword({
  passwordInputRef,
  passwordInputType,
  changePasswordType,
  password,
  handleSignUpPassword,
  isPassword,
  passwordErrorMessage,
  noSpace,
}: SignUpPasswordProps) {
  return (
    <Form.Group>
      <div className="d-flex align-items-center mb-2">
        <Form.Label htmlFor="password" className="m-0">
          Password
        </Form.Label>
        <SignUpPasswordType
          passwordInputType={passwordInputType}
          changePasswordType={changePasswordType}
        />
      </div>
      <Form.Control
        ref={passwordInputRef}
        className="border-none mt-1 mb-1 rounded-pill"
        onChange={handleSignUpPassword}
        onKeyDown={noSpace}
        id="password"
        name="password"
        value={password}
        type={passwordInputType ? "text" : "password"}
        maxLength={20}
        autoComplete="password"
      />
      {!isPassword && passwordErrorMessage && (
        <div className="mt-2 text-danger">{passwordErrorMessage}</div>
      )}
    </Form.Group>
  );
}
