import { Button, Form } from "react-bootstrap";
import SignInPasswordType from "./sign-in-password-type";

export interface SignInPasswordProps {
  passwordInputType: boolean;
  changePasswordType: () => void;
  password: string;
  handleSignInPassword: (event: React.ChangeEvent<HTMLInputElement>) => void;
  noSpace: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  handleShowSendSignInLinkModal: () => void;
}

export default function SignInPassword({
  passwordInputType,
  changePasswordType,
  password,
  handleSignInPassword,
  noSpace,
  handleShowSendSignInLinkModal,
}: SignInPasswordProps) {
  return (
    <Form.Group>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <div className="d-flex align-items-center">
          <Form.Label htmlFor="password" className="m-0">
            Password
          </Form.Label>
          <SignInPasswordType
            passwordInputType={passwordInputType}
            changePasswordType={changePasswordType}
          />
        </div>
        <Button
          variant="link"
          onClick={handleShowSendSignInLinkModal}
          className="p-0 text-decoration-none"
        >
          Forgot password?
        </Button>
      </div>
      <Form.Control
        className="border-none mt-1 mb-1 rounded-pill"
        onChange={handleSignInPassword}
        onKeyDown={noSpace}
        id="password"
        name="password"
        value={password}
        type={passwordInputType ? "text" : "password"}
        maxLength={20}
        autoComplete="password"
      />
    </Form.Group>
  );
}
