import { Form } from "react-bootstrap";
import ModifyProfileAvatarAdd from "./modify-profile-avatar-add";
import ModifyProfileAvatarPreview from "./modify-profile-avatar-preview";
import ModifyProfileAvatarRemoveDelete from "./modify-profile-avatar-remove-delete";

export interface ModifyProfileAvatarProps {
  avatarInputRef: React.RefObject<HTMLInputElement>;
  avatarImageRef: React.RefObject<HTMLImageElement>;
  avatar: string | null | undefined;
  avatarImagePreviewUrl: string;
  handleAvatarImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  avatarDeleteButtonClicked: boolean;
  resetAvatar: () => void;
  handleDeleteAvatar: () => void;
}

export default function ModifyProfileAvatar({
  avatarInputRef,
  avatarImageRef,
  avatar,
  avatarImagePreviewUrl,
  handleAvatarImage,
  avatarDeleteButtonClicked,
  resetAvatar,
  handleDeleteAvatar,
}: ModifyProfileAvatarProps) {
  return (
    <div
      className="d-flex justify-content-center align-items-center position-absolute top-100 translate-middle-y"
      style={{ left: "5%" }}
    >
      <ModifyProfileAvatarPreview
        avatarImageRef={avatarImageRef}
        avatar={avatar}
        avatarImagePreviewUrl={avatarImagePreviewUrl}
      />
      <ModifyProfileAvatarAdd />
      <ModifyProfileAvatarRemoveDelete
        avatarImagePreviewUrl={avatarImagePreviewUrl}
        avatarDeleteButtonClicked={avatarDeleteButtonClicked}
        resetAvatar={resetAvatar}
        handleDeleteAvatar={handleDeleteAvatar}
      />
      <Form.Control
        ref={avatarInputRef}
        onChange={handleAvatarImage}
        id="avatar"
        type="file"
        accept="image/*"
        className="d-none"
      ></Form.Control>
    </div>
  );
}
