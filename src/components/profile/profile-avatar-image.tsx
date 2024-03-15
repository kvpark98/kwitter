import ProfileAvatar from "./profile-avatar";
import ProfileDefault from "./profile-default";

export interface ProfileAvatarImageProps {
  avatar: string | null | undefined;
}

export default function ProfileAvatarImage({
  avatar,
}: ProfileAvatarImageProps) {
  return (
    <div
      className="d-flex justify-content-center align-items-center position-absolute top-100 translate-middle-y"
      style={{ left: "5%" }}
    >
      {Boolean(avatar) ? <ProfileAvatar avatar={avatar} /> : <ProfileDefault />}
    </div>
  );
}
