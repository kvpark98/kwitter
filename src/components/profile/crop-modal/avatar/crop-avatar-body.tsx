import { Alert } from "react-bootstrap";
import Cropper from "react-easy-crop";
import { CroppedAreaPixels } from "../../../../routes/profile";

export interface CropAvatarBodyProps {
  avatarImagePreviewUrl: string;
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

export default function CropAvatarBody({
  avatarImagePreviewUrl,
  crop,
  setCrop,
  zoom,
  setZoom,
  onCropComplete,
}: CropAvatarBodyProps) {
  return (
    <Alert
      variant="light"
      className="rounded-0 overflow-y-auto border-0 h-100 m-0 p-4"
    >
      <Cropper
        image={avatarImagePreviewUrl}
        crop={crop}
        zoom={zoom}
        aspect={1 / 1}
        onCropChange={setCrop}
        onZoomChange={setZoom}
        onCropComplete={onCropComplete}
      />
    </Alert>
  );
}
