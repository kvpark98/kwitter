import { Button } from "react-bootstrap";

export interface ReplyListPostProps {}

export default function ReplyListPost({}: ReplyListPostProps) {
  return (
    <Button type="button" variant="primary" className="fw-bold rounded-pill">
      Post reply
    </Button>
  );
}
