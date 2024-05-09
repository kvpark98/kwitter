import { Card } from "react-bootstrap";
import styled from "@emotion/styled";

export interface ModifyProfileAvatarPreviewProps {
  avatarImageRef: React.RefObject<HTMLImageElement>;
  avatar: string | null | undefined;
  avatarImagePreviewUrl: string;
  avatarDeleteButtonClicked: boolean;
}

// 미디어 쿼리를 사용하여 스타일 정의
const StyledModifyAvatar = styled.div`
  @media screen and (min-width: 700px) {
    width: 120px !important;
    height: 120px !important;
  }
  @media screen and (max-width: 700px) {
    width: 110px !important;
    height: 110px !important;
  }
  @media screen and (max-width: 500px) {
    width: 100px !important;
    height: 100px !important;
  }
`;

export default function ModifyProfileAvatarPreview({
  avatarImageRef,
  avatar,
  avatarImagePreviewUrl,
  avatarDeleteButtonClicked,
}: ModifyProfileAvatarPreviewProps) {
  return (
    <StyledModifyAvatar className="position-relative rounded-circle overflow-hidden">
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
    </StyledModifyAvatar>
  );
}
