import { Alert } from "react-bootstrap";

export default function CreateTweetSuccess() {
  return (
    <Alert variant="success" className="m-0 mb-3 w-100">
      <p>Tweet successfully posted!</p>
    </Alert>
  );
}
