import { Alert } from "react-bootstrap";

export default function EmailNotVerifiedError() {
  return (
    <Alert variant="danger" className="m-0 mt-3 w-100">
      <p>
        Your email has not been verified. Please check your email and click on
        the verification link.
      </p>
    </Alert>
  );
}
