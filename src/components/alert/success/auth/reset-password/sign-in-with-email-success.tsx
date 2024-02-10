import { Alert } from "react-bootstrap";

export default function SignInWithEmailSuccess() {
  return (
    <Alert variant="success" className="m-0 mt-3 w-100">
      <p>
        You have successfully signed in using the email link. Kindly proceed to
        reset your password within the next 5 minutes.
      </p>
    </Alert>
  );
}
