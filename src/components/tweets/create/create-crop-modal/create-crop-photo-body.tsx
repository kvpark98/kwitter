import { Alert } from "react-bootstrap";
import Cropper from "react-easy-crop";
import { CroppedAreaPixels } from "../../../../routes/profile";

export interface CreateCropPhotoBodyProps {
  imagePreviewUrl: string;
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
  createRatio1x1: boolean;
  createRatio4x3: boolean;
  createRatio16x9: boolean;
}

export default function CreateCropPhotoBody({
  imagePreviewUrl,
  crop,
  setCrop,
  zoom,
  setZoom,
  onCropComplete,
  createRatio1x1,
  createRatio4x3,
  createRatio16x9,
}: CreateCropPhotoBodyProps) {
  return (
    <Alert
      variant="light"
      className="rounded-0 overflow-y-auto border-0 h-100 m-0 p-4"
    >
      <Cropper
        image={imagePreviewUrl}
        crop={crop}
        zoom={zoom}
        {...(createRatio1x1 && { aspect: 1 / 1 })}
        {...(createRatio4x3 && { aspect: 4 / 3 })}
        {...(createRatio16x9 && { aspect: 16 / 9 })}
        onCropChange={setCrop}
        onZoomChange={setZoom}
        onCropComplete={onCropComplete}
      />
    </Alert>
  );
}
