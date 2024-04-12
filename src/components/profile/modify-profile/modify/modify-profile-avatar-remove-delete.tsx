import ModifyProfileAvatarDelete from "./modify-profile-avatar-delete";
import ModifyProfileAvatarRemove from "./modify-profile-avatar-remove";

export interface ModifyProfileAvatarRemoveDeleteProps {
  avatarImagePreviewUrl: string;
  avatarDeleteButtonClicked: boolean;
  resetAvatar: () => void;
  handleDeleteAvatar: () => void;
}

export default function ModifyProfileAvatarRemoveDelete({
  avatarImagePreviewUrl,
  avatarDeleteButtonClicked,
  resetAvatar,
  handleDeleteAvatar,
}: ModifyProfileAvatarRemoveDeleteProps) {
  return (
    <div>
      {avatarImagePreviewUrl ? (
        <ModifyProfileAvatarRemove resetAvatar={resetAvatar} />
      ) : (
        !avatarDeleteButtonClicked && (
          <ModifyProfileAvatarDelete handleDeleteAvatar={handleDeleteAvatar} />
        )
      )}
    </div>
  );
}
