import { Alert, Button, Form } from "react-bootstrap";
import { Switcher, Wrapper } from "../../styles/auth-components";
import { Link } from "react-router-dom";
import SignUpErrors from "../../alert/error/auth/sign-up/sign-up-errors";
import SignUpSocialSignIn from "./sign-up-social-sign-in";

export interface SignUpFormProps {
  isLoading: boolean;
  error: string;
  name: string;
  handleName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isName: boolean;
  nameErrorMessage: string;
  email: string;
  handleEmail: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isEmail: boolean;
  emailErrorMessage: string;
  password: string;
  handlePassword: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isPassword: boolean;
  passwordErrorMessage: string;
  passwordConfirm: string;
  handlePasswordConfirm: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isPasswordConfirm: boolean;
  passwordConfirmErrorMessage: string;
  noSpace: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  reset: () => void;
  signUp: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

export default function SignUpForm({
  isLoading,
  error,
  name,
  handleName,
  isName,
  nameErrorMessage,
  email,
  handleEmail,
  isEmail,
  emailErrorMessage,
  password,
  handlePassword,
  isPassword,
  passwordErrorMessage,
  passwordConfirm,
  handlePasswordConfirm,
  isPasswordConfirm,
  passwordConfirmErrorMessage,
  noSpace,
  reset,
  signUp,
}: SignUpFormProps) {
  return (
    <Wrapper>
      <div className="mb-2">
        <h1 className="fs-2">Sign Up</h1>
      </div>
      {error && <SignUpErrors error={error} />}
      <Alert variant="light" className="mt-3 px-4 py-4 w-100">
        <Form onSubmit={signUp} className="d-flex flex-column row-gap-3">
          <Form.Group>
            <Form.Label htmlFor="name">Username</Form.Label>
            <Form.Control
              className="border-none mt-1 mb-1"
              onChange={handleName}
              onKeyDown={noSpace}
              id="name"
              name="name"
              value={name}
              type="text"
              maxLength={20}
            />
            {!isName && nameErrorMessage && (
              <div className="mt-2 text-danger">{nameErrorMessage}</div>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="email">Email Address</Form.Label>
            <Form.Control
              className="border-none mt-1 mb-1"
              onChange={handleEmail}
              onKeyDown={noSpace}
              id="email"
              name="email"
              value={email}
              type="text"
              maxLength={50}
            />
            {!isEmail && emailErrorMessage && (
              <div className="mt-2 text-danger">{emailErrorMessage}</div>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="password">Password</Form.Label>
            <Form.Control
              className="border-none mt-1 mb-1"
              onChange={handlePassword}
              onKeyDown={noSpace}
              id="password"
              name="password"
              value={password}
              type="password"
              autoComplete="new-password"
              maxLength={20}
            />
            {!isPassword && passwordErrorMessage && (
              <div className="mt-2 text-danger">{passwordErrorMessage}</div>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="passwordConfirm">Password Confirm</Form.Label>
            <Form.Control
              className="border-none mt-1 mb-1"
              onChange={handlePasswordConfirm}
              onKeyDown={noSpace}
              id="passwordConfirm"
              name="passwordConfirm"
              value={passwordConfirm}
              type="password"
              autoComplete="new-password"
              maxLength={20}
              {...(!isPassword ? { disabled: true } : { disabled: false })}
            />
            {!isPasswordConfirm && passwordConfirmErrorMessage && (
              <div className="mt-2 text-danger">
                {passwordConfirmErrorMessage}
              </div>
            )}
          </Form.Group>
          <Button
            type="submit"
            className="mt-2 fw-bold"
            {...(!isName || !isEmail || !isPassword || !isPasswordConfirm
              ? { disabled: true }
              : { disabled: false })}
          >
            {isLoading ? "Loading..." : "Sign Up"}
          </Button>
        </Form>
        <Switcher className="d-flex justify-content-between">
          <Button onClick={reset} type="button" variant="outline-info">
            Reset
          </Button>
          <Link to="/sign-in" className="btn btn-outline-success">
            Sign In
          </Link>
        </Switcher>
      </Alert>
      <SignUpSocialSignIn />
    </Wrapper>
  );
}
