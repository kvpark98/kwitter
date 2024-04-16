import ProfileAvatar from "./profile-avatar";

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
      <ProfileAvatar avatar={avatar} />
    </div>
  );
}
