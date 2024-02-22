import { Card } from "react-bootstrap";

export interface TweetBodyProps {
  message: string;
  photo?: string | undefined;
  username: string;
}

export default function TweetBody({
  message,
  photo,
  username,
}: TweetBodyProps) {
  return (
    <div className="d-flex">
      <Card.Body style={{ maxWidth: "323.7px" }}>
        <Card.Title className="fw-bold mb-2">{username}</Card.Title>
        <Card.Text>{message}</Card.Text>
      </Card.Body>
      {photo && <Card.Img variant="top" src={photo} className="w-25" />}
    </div>
  );
}
