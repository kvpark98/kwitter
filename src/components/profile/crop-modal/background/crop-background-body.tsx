import { Alert } from "react-bootstrap";
import Cropper from "react-easy-crop";
import { CroppedAreaPixels } from "../../../../routes/profile";

export interface CropBackgroundBodyProps {
  backgroundImagePreviewUrl: string;
  crop: {
    x: number;
    y: number;
  };
  setCrop: React.Dispatch<
    React.SetStateAction<{
      x: number;
      y: number;
    }>
  >;
  zoom: number;
  setZoom: React.Dispatch<React.SetStateAction<number>>;
  onCropComplete: (
    croppedArea: CroppedAreaPixels,
    croppedAreaPixels: CroppedAreaPixels
  ) => void;
}

export default function CropBackgroundBody({
  backgroundImagePreviewUrl,
  crop,
  setCrop,
  zoom,
  setZoom,
  onCropComplete,
}: CropBackgroundBodyProps) {
  return (
    <Alert
      variant="light"
      className="rounded-0 overflow-y-auto border-0 h-100 m-0 p-4"
    >
      <Cropper
        image={backgroundImagePreviewUrl}
        crop={crop}
        zoom={zoom}
        aspect={16 / 9}
        onCropChange={setCrop}
        onZoomChange={setZoom}
        onCropComplete={onCropComplete}
      />
    </Alert>
  );
}
