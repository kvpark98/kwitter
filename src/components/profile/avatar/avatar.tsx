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
      style={{ width: "130px", height: "130px" }}
    >
      <Form.Label
        htmlFor="avatar"
        className="btn m-0 p-0 border-0 w-100 h-100 ratio ratio-1x1"
      >
        <Card.Img src={avatar!} title="Change Avatar" />
      </Form.Label>
      <AvatarDeleteButton handleDeleteAvatar={handleDeleteAvatar} />
    </div>
  );
}
