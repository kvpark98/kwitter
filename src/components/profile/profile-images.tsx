import { Card } from "react-bootstrap";
import ProfileAvatarImage from "./profile-avatar-image";

export interface ProfileImagesProps {
  avatar: string | null | undefined;
  background: string;
}

export default function ProfileImages({
  avatar,
  background,
}: ProfileImagesProps) {
  return (
    <div className="position-relative mb-4">
      <Card.Img
        src={background ? background : "/default-background.png"}
        alt="Background Image"
        className="img-fluid"
        style={{ width: "600px", height: "230px" }}
      />
      <ProfileAvatarImage avatar={avatar} />
    </div>
  );
}
