import { Container, Navbar } from "react-bootstrap";
import SendSignInLinkReset from "./send-sign-in-link-reset";
import SendSignInLinkSubmit from "./send-sign-in-link-submit";

export interface SendSignInLinkFooterProps {
  isLoading: boolean;
  isEmail: boolean;
  resetEmail: () => void;
}

export default function SendSignInLinkFooter({
  isLoading,
  isEmail,
  resetEmail,
}: SendSignInLinkFooterProps) {
  return (
    <Navbar className="flex-fill rounded-bottom bg-body-light border-top">
      <Container className="d-flex">
        <div className="d-flex justify-content-between w-100">
          <SendSignInLinkReset resetEmail={resetEmail} />
          <SendSignInLinkSubmit isLoading={isLoading} isEmail={isEmail} />
        </div>
      </Container>
    </Navbar>
  );
}
