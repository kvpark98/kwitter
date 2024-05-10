import ProfileAvatarImage from "./profile-avatar-image";
import styled from "@emotion/styled";

export interface ProfileImagesProps {
  avatar: string | null | undefined;
  background: string;
}

// 미디어 쿼리를 사용하여 스타일 정의
const StyledBackground = styled.img`
  @media screen and (min-width: 700px) {
    height: 240px !important;
  }
  @media screen and (max-width: 700px) {
    height: 220px !important;
  }
  @media screen and (max-width: 500px) {
    height: 200px !important;
  }
`;

export default function ProfileImages({
  avatar,
  background,
}: ProfileImagesProps) {
  return (
    <div className="position-relative mb-4">
      <StyledBackground
        src={background ?? "/default-background.png"}
        alt="Background Image"
        className="img-fluid"
        style={{ width: "100%" }}
      />
      <ProfileAvatarImage avatar={avatar} />
    </div>
  );
}
