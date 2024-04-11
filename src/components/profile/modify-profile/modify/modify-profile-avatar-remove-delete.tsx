import ModifyProfileAvatarDelete from "./modify-profile-avatar-delete";
import ModifyProfileAvatarRemove from "./modify-profile-avatar-remove";

export interface ModifyProfileAvatarRemoveDeleteProps {
  avatarImagePreviewUrl: string;
  resetAvatar: () => void;
  handleDeleteAvatar: () => void;
}

export default function ModifyProfileAvatarRemoveDelete({
  avatarImagePreviewUrl,
  resetAvatar,
  handleDeleteAvatar,
}: ModifyProfileAvatarRemoveDeleteProps) {
  return (
    <div>
      {avatarImagePreviewUrl ? (
        <ModifyProfileAvatarRemove resetAvatar={resetAvatar} />
      ) : (
        <ModifyProfileAvatarDelete handleDeleteAvatar={handleDeleteAvatar} />
      )}
    </div>
  );
}
