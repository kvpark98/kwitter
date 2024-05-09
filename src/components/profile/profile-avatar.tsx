import styled from "@emotion/styled";
import { Card } from "react-bootstrap";

export interface ProfileAvatarProps {
  avatar: string | null | undefined;
}

// 미디어 쿼리를 사용하여 스타일 정의
const StyledAvatar = styled.div`
  @media screen and (min-width: 700px) {
    width: 135px !important;
    height: 135px !important;
  }
  @media screen and (max-width: 700px) {
    width: 125px !important;
    height: 125px !important;
  }
  @media screen and (max-width: 500px) {
    width: 115px !important;
    height: 115px !important;
  }
`;

export default function ProfileAvatar({ avatar }: ProfileAvatarProps) {
  return (
    <StyledAvatar className="rounded-circle overflow-hidden">
      <Card.Img
        src={avatar!}
        alt="Avatar Image"
        className="w-100 h-100 bg-light"
      />
    </StyledAvatar>
  );
}
