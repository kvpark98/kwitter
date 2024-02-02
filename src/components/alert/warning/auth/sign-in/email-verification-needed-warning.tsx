import { Alert } from "react-bootstrap";

export default function EmailVerificationNeededWarning() {
  return (
    <Alert variant="warning" className="m-0 mt-3 w-100">
      <p>
        Kindly navigate to your email and click on the provided link for
        verification.
      </p>
    </Alert>
  );
}
