import { Card, Form } from "react-bootstrap";
import AvatarDeleteButton from "./avatar-delete-button";

export interface AvatarProps {
  avatar: string | null | undefined;
  handleDeleteAvatar: () => Promise<void>;
}

export default function Avatar({ avatar, handleDeleteAvatar }: AvatarProps) {
  return (
    <div
      className="rounded-circle overflow-hidden"
      style={{ width: "160px", height: "160px" }}
    >
      <Form.Label htmlFor="avatar" className="btn m-0 p-0 border-0">
        <Card.Img src={avatar!} title="Change Avatar"></Card.Img>
      </Form.Label>
      <AvatarDeleteButton handleDeleteAvatar={handleDeleteAvatar} />
    </div>
  );
}
