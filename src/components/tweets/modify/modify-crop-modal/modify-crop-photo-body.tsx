import { Alert } from "react-bootstrap";
import Cropper from "react-easy-crop";
import { CroppedAreaPixels } from "../../../../routes/profile";

export interface ModifyCropPhotoBodyProps {
  newImagePreviewUrl: string;
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
  modifyRatio1x1: boolean;
  modifyRatio4x3: boolean;
  modifyRatio16x9: boolean;
}

export default function ModifyCropPhotoBody({
  newImagePreviewUrl,
  crop,
  setCrop,
  zoom,
  setZoom,
  onCropComplete,
  modifyRatio1x1,
  modifyRatio4x3,
  modifyRatio16x9,
}: ModifyCropPhotoBodyProps) {
  return (
    <Alert
      variant="light"
      className="rounded-0 overflow-y-auto border-0 h-100 m-0 p-4"
    >
      <Cropper
        image={newImagePreviewUrl}
        crop={crop}
        zoom={zoom}
        {...(modifyRatio1x1 && { aspect: 1 / 1 })}
        {...(modifyRatio4x3 && { aspect: 4 / 3 })}
        {...(modifyRatio16x9 && { aspect: 16 / 9 })}
        onCropChange={setCrop}
        onZoomChange={setZoom}
        onCropComplete={onCropComplete}
      />
    </Alert>
  );
}
