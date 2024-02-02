import { Alert } from "react-bootstrap";

export default function PasswordChangeSuccess() {
  return (
    <Alert variant="success" className="m-0 mt-3 w-100">
      <p>
        Your new password has been set successfully. Please sign in using your
        updated password.
      </p>
    </Alert>
  );
}
