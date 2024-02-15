import { Alert } from "react-bootstrap";

export default function ProfileSuccess() {
  return (
    <Alert variant="success" className="m-0 mb-4 w-100">
      <p>Your profile image has been successfully uploaded!</p>
    </Alert>
  );
}
