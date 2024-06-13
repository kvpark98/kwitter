import { Alert } from "react-bootstrap";

export default function SignInWithEmailSuccess() {
  return (
    <Alert variant="success" className="m-0 w-100">
      <p>You have successfully signed in using the email link.</p>
    </Alert>
  );
}
