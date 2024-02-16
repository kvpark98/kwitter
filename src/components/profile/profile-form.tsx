import { Form } from "react-bootstrap";
import ProfileAvatar from "./profile-avatar";
import ProfileNoAvatar from "./profile-no-avatar";

export interface ProfileFormProps {
  avatar: string | null | undefined;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleAvatar: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  handleDeleteAvatar: () => Promise<void>;
}

export default function ProfileForm({
  avatar,
  fileInputRef,
  handleAvatar,
  handleDeleteAvatar,
}: ProfileFormProps) {
  return (
    <div className="d-flex justify-content-center align-items-center position-relative mb-4">
      {Boolean(avatar) ? (
        <ProfileAvatar
          avatar={avatar}
          handleDeleteAvatar={handleDeleteAvatar}
        />
      ) : (
        <ProfileNoAvatar />
      )}
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
