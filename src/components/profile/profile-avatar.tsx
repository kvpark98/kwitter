import { Card } from "react-bootstrap";

export interface ProfileAvatarProps {
  avatar: string | null | undefined;
}

export default function ProfileAvatar({ avatar }: ProfileAvatarProps) {
  return (
    <div
      className="rounded-circle overflow-hidden"
      style={{ width: "140px", height: "140px" }}
    >
      <Card.Img
        src={avatar!}
        alt="Avatar Image"
        className="w-100 h-100 bg-light"
      />
    </div>
  );
}
