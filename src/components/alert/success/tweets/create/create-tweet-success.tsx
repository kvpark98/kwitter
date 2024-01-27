import { Alert } from "react-bootstrap";

export default function CreateTweetSuccess() {
  return (
    <Alert variant="success" className="m-0 mt-3 w-100">
      <p>Tweet successfully created!</p>
    </Alert>
  );
}
