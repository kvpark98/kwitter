import { Container, Navbar } from "react-bootstrap";
import SendSignInLinkReset from "./send-sign-in-link-reset";
import SendSignInLinkSubmit from "./send-sign-in-link-submit";

export interface SendSignInLinkFooterProps {
  isLoading: boolean;
  isEmail: boolean;
  resetSendSignInLink: () => void;
}

export default function SendSignInLinkFooter({
  isLoading,
  isEmail,
  resetSendSignInLink,
}: SendSignInLinkFooterProps) {
  return (
    <Navbar className="flex-fill rounded-bottom bg-body-light border-top">
      <Container className="d-flex">
        <div className="d-flex justify-content-between w-100">
          <SendSignInLinkReset resetSendSignInLink={resetSendSignInLink} />
          <SendSignInLinkSubmit isLoading={isLoading} isEmail={isEmail} />
        </div>
      </Container>
    </Navbar>
  );
}
