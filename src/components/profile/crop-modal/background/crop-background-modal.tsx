import { Modal } from "react-bootstrap";
import { CroppedAreaPixels } from "../../../../routes/profile";
import CropBackgroundHeader from "./crop-background-header";
import CropBackgroundBody from "./crop-background-body";
import CropBackgroundFooter from "./crop-background-footer";

export interface CropBackgroundModalProps {
  showBackgroundCropModal: boolean;
  handleCloseBackgroundCropModal: () => void;
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
  handleSaveCroppedBackground: () => void;
}

export default function CropBackgroundModal({
  showBackgroundCropModal,
  handleCloseBackgroundCropModal,
  backgroundImagePreviewUrl,
  crop,
  setCrop,
  zoom,
  setZoom,
  onCropComplete,
  handleSaveCroppedBackground,
}: CropBackgroundModalProps) {
  return (
    <Modal
      show={showBackgroundCropModal}
      onHide={handleCloseBackgroundCropModal}
      backdrop="static"
      keyboard={false}
      className="border-0"
      centered
    >
      <div
        style={{ height: "500px" }}
        className="d-flex flex-column bg-body-light"
      >
        <CropBackgroundHeader
          handleCloseBackgroundCropModal={handleCloseBackgroundCropModal}
        />
        <CropBackgroundBody
          backgroundImagePreviewUrl={backgroundImagePreviewUrl}
          crop={crop}
          setCrop={setCrop}
          zoom={zoom}
          setZoom={setZoom}
          onCropComplete={onCropComplete}
        />
        <CropBackgroundFooter
          handleSaveCroppedBackground={handleSaveCroppedBackground}
        />
      </div>
    </Modal>
  );
}
