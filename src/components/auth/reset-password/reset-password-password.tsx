import { Form } from "react-bootstrap";
import ResetPasswordType from "./reset-password-type";

export interface ResetPasswordPasswordProps {
  passwordInputRef: React.RefObject<HTMLInputElement>;
  passwordInputType: boolean;
  changePasswordType: () => void;
  password: string;
  handlePassword: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isPassword: boolean;
  passwordErrorMessage: string;
  noSpace: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function ResetPasswordPassword({
  passwordInputRef,
  passwordInputType,
  changePasswordType,
  password,
  handlePassword,
  isPassword,
  passwordErrorMessage,
  noSpace,
}: ResetPasswordPasswordProps) {
  return (
    <Form.Group>
      <div className="d-flex align-items-center mb-2">
        <Form.Label htmlFor="password" className="m-0">
          New password
        </Form.Label>
        <ResetPasswordType
          passwordInputType={passwordInputType}
          changePasswordType={changePasswordType}
        />
      </div>
      <Form.Control
        ref={passwordInputRef}
        className="border-none mt-1 mb-1 rounded-pill"
        onChange={handlePassword}
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
