import { Card } from "react-bootstrap";

export interface TweetFooterProps {
  timeAgo: string | undefined;
}

export default function TweetFooter({ timeAgo }: TweetFooterProps) {
  return (
    <Card.Footer className="d-flex justify-content-end align-items-center text-muted">
      {timeAgo}
    </Card.Footer>
  );
}
