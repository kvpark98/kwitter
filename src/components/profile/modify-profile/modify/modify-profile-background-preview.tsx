import { Card } from "react-bootstrap";
import styled from "@emotion/styled";

export interface ModifyProfileBackgroundPreviewProps {
  backgroundImageRef: React.RefObject<HTMLImageElement>;
  background: string;
  backgroundImagePreviewUrl: string;
  backgroundDeleteButtonClicked: boolean;
}

// 미디어 쿼리를 사용하여 스타일 정의
const StyledModifyBackground = styled.div`
  @media screen and (min-width: 700px) {
    height: 210px !important;
  }
  @media screen and (max-width: 700px) {
    height: 200px !important;
  }
  @media screen and (max-width: 500px) {
    height: 190px !important;
  }
`;

export default function ModifyProfileBackgroundPreview({
  backgroundImageRef,
  background,
  backgroundImagePreviewUrl,
  backgroundDeleteButtonClicked,
}: ModifyProfileBackgroundPreviewProps) {
  return (
    <StyledModifyBackground>
      <Card.Img
        ref={backgroundImageRef}
        src={
          backgroundImagePreviewUrl
            ? backgroundImagePreviewUrl
            : background && !backgroundDeleteButtonClicked
            ? background
            : "default-background.png"
        }
        alt="Background Image"
        className="img-fluid rounded-4 w-100 h-100"
      />
    </StyledModifyBackground>
  );
}
