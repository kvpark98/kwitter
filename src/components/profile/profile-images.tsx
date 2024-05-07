import ProfileAvatarImage from "./profile-avatar-image";
import styled from "@emotion/styled";

export interface ProfileImagesProps {
  avatar: string | null | undefined;
  background: string;
}

// 미디어 쿼리를 사용하여 스타일 정의
const StyledBackground = styled.img`
  @media screen and (max-width: 700px) {
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
        src={background ? background : "/default-background.png"}
        alt="Background Image"
        className="img-fluid"
        style={{ width: "600px", height: "230px" }}
      />
      <ProfileAvatarImage avatar={avatar} />
    </div>
  );
}
