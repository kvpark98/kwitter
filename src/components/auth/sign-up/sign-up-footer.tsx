import { Container, Navbar } from "react-bootstrap";
import SignUpReset from "./sign-up-reset";
import SignUpSubmit from "./sign-up-submit";

export interface SignUpFooterProps {
  isLoading: boolean;
  isName: boolean;
  isEmail: boolean;
  isPassword: boolean;
  isPasswordConfirm: boolean;
  resetSignUp: () => void;
}

export default function SignUpFooter({
  isLoading,
  isName,
  isEmail,
  isPassword,
  isPasswordConfirm,
  resetSignUp,
}: SignUpFooterProps) {
  return (
    <Navbar className="flex-fill rounded-bottom bg-body-light border-top">
      <Container className="d-flex">
        <div className="d-flex justify-content-between w-100">
          <SignUpReset resetSignUp={resetSignUp} />
          <SignUpSubmit
            isLoading={isLoading}
            isName={isName}
            isEmail={isEmail}
            isPassword={isPassword}
            isPasswordConfirm={isPasswordConfirm}
          />
        </div>
      </Container>
    </Navbar>
  );
}
