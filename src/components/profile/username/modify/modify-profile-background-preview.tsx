import { Card } from "react-bootstrap";

export interface ModifyProfileBackgroundPreviewProps {
  background: string;
  backgroundImagePreviewUrl: string;
}

export default function ModifyProfileBackgroundPreview({
  background,
  backgroundImagePreviewUrl,
}: ModifyProfileBackgroundPreviewProps) {
  return (
    <div>
      {backgroundImagePreviewUrl ? (
        <Card.Img
          src={backgroundImagePreviewUrl}
          alt="Background Image"
          className="img-fluid"
          style={{ width: "100%", height: "200px" }}
        />
      ) : background ? (
        <Card.Img
          src={background}
          alt="Background Image"
          className="img-fluid"
          style={{ width: "100%", height: "200px" }}
        />
      ) : (
        <Card.Img
          src="/default-background.png"
          alt="Background Image"
          className="img-fluid"
          style={{ width: "100%", height: "200px" }}
        />
      )}
    </div>
  );
}
