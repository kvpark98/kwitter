import { Card, Form } from "react-bootstrap";

export interface AvatarProps {
  avatar: string | null | undefined;
}

export default function Avatar({ avatar }: AvatarProps) {
  return (
    <div
      className="rounded-circle overflow-hidden"
      style={{ width: "130px", height: "130px" }}
    >
      <Form.Label
        htmlFor="avatar"
        className="btn m-0 p-0 border-0 w-100 h-100 ratio ratio-1x1"
      >
        <Card.Img src={avatar!} title="Add/Change Avatar" />
      </Form.Label>
    </div>
  );
}
