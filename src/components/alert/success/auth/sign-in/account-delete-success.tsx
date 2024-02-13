import { Alert } from "react-bootstrap";

export default function AccountDeleteSuccess() {
  return (
    <Alert variant="success" className="m-0 mt-3 w-100">
      <p>Your account has been successfully deleted.</p>
    </Alert>
  );
}
