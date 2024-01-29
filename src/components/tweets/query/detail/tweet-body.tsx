import { Card } from "react-bootstrap";

export interface TweetBodyProps {
  message: string;
  photo?: string;
  username: string;
}

export default function TweetBody({
  message,
  photo,
  username,
}: TweetBodyProps) {
  return (
    <div className="d-flex">
      <Card.Body>
        <Card.Title className="fw-bold mb-3">{username}</Card.Title>
        <Card.Text>{message}</Card.Text>
      </Card.Body>
      {photo && <Card.Img variant="top" src={photo} className="w-25 h-25" />}
    </div>
  );
}
