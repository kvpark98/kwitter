import { Container, Navbar } from "react-bootstrap";
import SignInWithEmailSubmit from "./sign-in-with-email-submit";
import SignInWithEmailReset from "./sign-in-with-email-reset";

export interface SignInWithEmailFooterProps {
  isLoading: boolean;
  isEmail: boolean;
  resetEmail: () => void;
}

export default function SignInWithEmailFooter({
  isLoading,
  isEmail,
  resetEmail,
}: SignInWithEmailFooterProps) {
  return (
    <Navbar className="flex-fill rounded-bottom bg-body-light border-top">
      <Container className="d-flex">
        <div className="d-flex justify-content-between w-100">
          <SignInWithEmailReset resetEmail={resetEmail} />
          <SignInWithEmailSubmit isLoading={isLoading} isEmail={isEmail} />
        </div>
      </Container>
    </Navbar>
  );
}
