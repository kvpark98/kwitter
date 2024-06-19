import { Card } from "react-bootstrap";

export interface ReplyFooterProps {
  timeAgo: string | undefined;
}

export default function ReplyFooter({ timeAgo }: ReplyFooterProps) {
  return (
    <Card.Footer className="d-flex justify-content-end align-items-center text-muted">
      {timeAgo}
    </Card.Footer>
  );
}
