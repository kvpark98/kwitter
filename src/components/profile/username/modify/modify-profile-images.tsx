import { Form } from "react-bootstrap";
import ModifyProfileBackground from "./modify-profile-background";
import ModifyProfileAvatar from "./modify-profile-avatar";

export interface ModifyProfileImagesProps {
  avatarInputRef: React.RefObject<HTMLInputElement>;
  backgroundInputRef: React.RefObject<HTMLInputElement>;
  avatar: string | null | undefined;
  avatarImagePreviewUrl: string;
  handleAvatarImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  background: string;
  backgroundImagePreviewUrl: string;
  handleBackgroundImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  resetAvatar: () => void;
  resetBackground: () => void;
  handleDeleteAvatar: () => Promise<void>;
  handleDeleteBackground: () => Promise<void>;
}

export default function ModifyProfileImages({
  avatarInputRef,
  backgroundInputRef,
  avatar,
  avatarImagePreviewUrl,
  handleAvatarImage,
  background,
  backgroundImagePreviewUrl,
  handleBackgroundImage,
  resetAvatar,
  resetBackground,
  handleDeleteAvatar,
  handleDeleteBackground,
}: ModifyProfileImagesProps) {
  return (
    <Form.Group className="position-relative mb-5">
      <ModifyProfileBackground
        backgroundInputRef={backgroundInputRef}
        background={background}
        backgroundImagePreviewUrl={backgroundImagePreviewUrl}
        handleBackgroundImage={handleBackgroundImage}
        resetBackground={resetBackground}
        handleDeleteBackground={handleDeleteBackground}
      />
      <ModifyProfileAvatar
        avatarInputRef={avatarInputRef}
        avatar={avatar}
        avatarImagePreviewUrl={avatarImagePreviewUrl}
        handleAvatarImage={handleAvatarImage}
        resetAvatar={resetAvatar}
        handleDeleteAvatar={handleDeleteAvatar}
      />
    </Form.Group>
  );
}
