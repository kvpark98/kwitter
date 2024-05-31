import { Button, Form } from "react-bootstrap";

export interface SignInPasswordProps {
  password: string;
  handleSignInPassword: (event: React.ChangeEvent<HTMLInputElement>) => void;
  noSpace: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  handleShowSendSignInLinkModal: () => void;
}

export default function SignInPassword({
  password,
  handleSignInPassword,
  noSpace,
  handleShowSendSignInLinkModal,
}: SignInPasswordProps) {
  return (
    <Form.Group>
      <div className="d-flex justify-content-between align-items-center">
        <Form.Label htmlFor="password">Password</Form.Label>
        <Button
          variant="link"
          onClick={handleShowSendSignInLinkModal}
          className="p-0 mb-2 text-decoration-none"
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
        type="password"
        maxLength={20}
        autoComplete="password"
      />
    </Form.Group>
  );
}
