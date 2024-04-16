import { Card } from "react-bootstrap";

export interface ModifyProfileBackgroundPreviewProps {
  backgroundImageRef: React.RefObject<HTMLImageElement>;
  background: string;
  backgroundImagePreviewUrl: string;
  backgroundDeleteButtonClicked: boolean;
}

export default function ModifyProfileBackgroundPreview({
  backgroundImageRef,
  background,
  backgroundImagePreviewUrl,
  backgroundDeleteButtonClicked,
}: ModifyProfileBackgroundPreviewProps) {
  return (
    <div>
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
        className="img-fluid rounded-4"
        style={{ width: "100%", height: "200px" }}
      />
    </div>
  );
}
