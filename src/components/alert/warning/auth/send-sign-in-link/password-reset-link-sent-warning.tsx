import { Alert } from "react-bootstrap";

export default function PasswordResetLinkSentWarning() {
  return (
    <Alert variant="warning" className="m-0 mt-3 w-100">
      <p>
        Please review your email for a sign-in link. In case it doesn't show up
        within a couple of minutes, kindly inspect your spam folder.
      </p>
    </Alert>
  );
}
