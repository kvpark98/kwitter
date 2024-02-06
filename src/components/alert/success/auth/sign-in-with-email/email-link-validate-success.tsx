import { Alert } from "react-bootstrap";

export default function EmailLinkValidatedSuccess() {
  return (
    <Alert variant="success" className="m-0 mt-3 w-100">
      <p>
        Your email link has been successfully validated. Please reconfirm your
        email address.
      </p>
    </Alert>
  );
}
