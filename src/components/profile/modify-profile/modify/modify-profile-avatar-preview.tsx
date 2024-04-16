import { Card } from "react-bootstrap";

export interface ModifyProfileAvatarPreviewProps {
  avatarImageRef: React.RefObject<HTMLImageElement>;
  avatar: string | null | undefined;
  avatarImagePreviewUrl: string;
  avatarDeleteButtonClicked: boolean;
}

export default function ModifyProfileAvatarPreview({
  avatarImageRef,
  avatar,
  avatarImagePreviewUrl,
  avatarDeleteButtonClicked,
}: ModifyProfileAvatarPreviewProps) {
  return (
    <div
      className="position-relative rounded-circle overflow-hidden"
      style={{ width: "120px", height: "120px" }}
    >
      <Card.Img
        ref={avatarImageRef}
        src={
          avatarImagePreviewUrl
            ? avatarImagePreviewUrl
            : avatar && !avatarDeleteButtonClicked
            ? avatar
            : "/person-circle.svg"
        }
        alt="Avatar Image"
        className="w-100 h-100 bg-light"
      />
    </div>
  );
}
