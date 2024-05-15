import { Container, Navbar } from "react-bootstrap";
import SignInReset from "./sign-in-reset";
import SignInSubmit from "./sign-in-submit";

export interface SignInFooterProps {
  isLoading: boolean;
  isEmail: boolean;
  isPassword: boolean;
  reset: () => void;
}

export default function SignInFooter({
  isLoading,
  isEmail,
  isPassword,
  reset,
}: SignInFooterProps) {
  return (
    <Navbar className="flex-fill rounded-bottom bg-body-light border-top">
      <Container className="d-flex">
        <div className="d-flex justify-content-between w-100">
          <SignInReset reset={reset} />
          <SignInSubmit
            isLoading={isLoading}
            isEmail={isEmail}
            isPassword={isPassword}
          />
        </div>
      </Container>
    </Navbar>
  );
}
