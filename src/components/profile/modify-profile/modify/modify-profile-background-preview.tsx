import { Card } from "react-bootstrap";

export interface ModifyProfileBackgroundPreviewProps {
  backgroundImageRef: React.RefObject<HTMLImageElement>;
  background: string;
  backgroundImagePreviewUrl: string;
}

export default function ModifyProfileBackgroundPreview({
  backgroundImageRef,
  background,
  backgroundImagePreviewUrl,
}: ModifyProfileBackgroundPreviewProps) {
  return (
    <div>
      <Card.Img
        ref={backgroundImageRef}
        src={
          backgroundImagePreviewUrl
            ? backgroundImagePreviewUrl
            : background
            ? background
            : "default-background.png"
        }
        alt="Background Image"
        className="img-fluid"
        style={{ width: "100%", height: "200px" }}
      />
    </div>
  );
}
