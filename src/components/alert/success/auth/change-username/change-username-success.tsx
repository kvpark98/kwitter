import { Alert } from "react-bootstrap";

export default function ChangeUsernameSuccess() {
  return (
    <Alert variant="success" className="m-0 mb-3 w-100">
      <p>New username successfully configured.</p>
    </Alert>
  );
}
