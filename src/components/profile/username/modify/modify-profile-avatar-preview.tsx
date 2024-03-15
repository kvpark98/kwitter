import { Card } from "react-bootstrap";

export interface ModifyProfileAvatarPreviewProps {
  avatar: string | null | undefined;
  avatarImagePreviewUrl: string;
}

export default function ModifyProfileAvatarPreview({
  avatar,
  avatarImagePreviewUrl,
}: ModifyProfileAvatarPreviewProps) {
  return (
    <div
      className="position-relative rounded-circle overflow-hidden"
      style={{ width: "120px", height: "120px" }}
    >
      {avatarImagePreviewUrl ? (
        <Card.Img
          src={avatarImagePreviewUrl}
          alt="Avatar Image"
          className="w-100 h-100 bg-light"
        />
      ) : avatar ? (
        <Card.Img
          src={avatar}
          alt="Avatar Image"
          className="w-100 h-100 bg-light"
        />
      ) : (
        <Card.Img
          src="/person-circle.svg"
          alt="Avatar Image"
          className="w-100 h-100 bg-light"
        />
      )}
    </div>
  );
}
