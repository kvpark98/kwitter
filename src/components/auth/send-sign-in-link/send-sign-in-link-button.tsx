import { Button } from "react-bootstrap";

export interface SendSignInLinkButtonProps {
  isLoading: boolean;
  isEmail: boolean;
}

export default function SendSignInLinkButton({
  isLoading,
  isEmail,
}: SendSignInLinkButtonProps) {
  return (
    <Button
      type="submit"
      className="mt-2 fw-bold rounded-pill"
      {...(!isEmail ? { disabled: true } : { disabled: false })}
    >
      {isLoading ? "Sending..." : "Send Link"}
    </Button>
  );
}
