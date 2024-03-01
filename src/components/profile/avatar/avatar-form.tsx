import { Form } from "react-bootstrap";
import Avatar from "./avatar";
import NoAvatar from "./no-avatar";

export interface AvatarFormProps {
  avatar: string | null | undefined;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleAvatar: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  handleDeleteAvatar: () => Promise<void>;
}

export default function AvatarForm({
  avatar,
  fileInputRef,
  handleAvatar,
  handleDeleteAvatar,
}: AvatarFormProps) {
  return (
    <div className="d-flex justify-content-center align-items-center mb-4">
      <div className="position-relative">
        {Boolean(avatar) ? (
          <Avatar avatar={avatar} handleDeleteAvatar={handleDeleteAvatar} />
        ) : (
          <NoAvatar />
        )}
      </div>
      <Form.Control
        ref={fileInputRef}
        onChange={handleAvatar}
        id="avatar"
        type="file"
        accept="image/*"
        className="d-none"
      ></Form.Control>
    </div>
  );
}
