import ModifyProfileAvatarDelete from "./modify-profile-avatar-delete";
import ModifyProfileAvatarRemove from "./modify-profile-avatar-remove";

export interface ModifyProfileAvatarRemoveDeleteProps {
  defaultAvatarURL: "/person-circle.svg";
  avatar: string | null | undefined;
  avatarImagePreviewUrl: string;
  avatarDeleteButtonClicked: boolean;
  resetAvatar: () => void;
  handleDeleteAvatar: () => void;
}

export default function ModifyProfileAvatarRemoveDelete({
  defaultAvatarURL,
  avatar,
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
        avatar &&
        avatar !== defaultAvatarURL &&
        !avatarDeleteButtonClicked && (
          <ModifyProfileAvatarDelete handleDeleteAvatar={handleDeleteAvatar} />
        )
      )}
    </div>
  );
}
