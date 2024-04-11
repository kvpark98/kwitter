import { Form } from "react-bootstrap";
import ModifyProfileBackground from "./modify-profile-background";
import ModifyProfileAvatar from "./modify-profile-avatar";

export interface ModifyProfileImagesProps {
  avatarInputRef: React.RefObject<HTMLInputElement>;
  backgroundInputRef: React.RefObject<HTMLInputElement>;
  avatarImageRef: React.RefObject<HTMLImageElement>;
  backgroundImageRef: React.RefObject<HTMLImageElement>;
  avatar: string | null | undefined;
  avatarImagePreviewUrl: string;
  handleAvatarImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  background: string;
  backgroundImagePreviewUrl: string;
  handleBackgroundImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  resetAvatar: () => void;
  resetBackground: () => void;
  handleDeleteAvatar: () => void;
  handleDeleteBackground: () => void;
}

export default function ModifyProfileImages({
  avatarInputRef,
  backgroundInputRef,
  avatarImageRef,
  backgroundImageRef,
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
        backgroundImageRef={backgroundImageRef}
        background={background}
        backgroundImagePreviewUrl={backgroundImagePreviewUrl}
        handleBackgroundImage={handleBackgroundImage}
        resetBackground={resetBackground}
        handleDeleteBackground={handleDeleteBackground}
      />
      <ModifyProfileAvatar
        avatarInputRef={avatarInputRef}
        avatarImageRef={avatarImageRef}
        avatar={avatar}
        avatarImagePreviewUrl={avatarImagePreviewUrl}
        handleAvatarImage={handleAvatarImage}
        resetAvatar={resetAvatar}
        handleDeleteAvatar={handleDeleteAvatar}
      />
    </Form.Group>
  );
}
