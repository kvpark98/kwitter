import { Button } from "react-bootstrap";

export interface SendSignInLinkSubmitProps {
  isLoading: boolean;
  isEmail: boolean;
}

export default function SendSignInLinkSubmit({
  isLoading,
  isEmail,
}: SendSignInLinkSubmitProps) {
  return (
    <Button
      type="submit"
      variant="primary"
      className="fw-bold rounded-pill"
      {...(!isEmail ? { disabled: true } : { disabled: false })}
    >
      {isLoading ? "Sending..." : "Send link"}
    </Button>
  );
}
