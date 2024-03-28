import { Modal } from "react-bootstrap";
import { CroppedAreaPixels } from "../../../../routes/profile";
import ModifyCropPhotoBody from "./modify-crop-photo-body";
import ModifyCropPhotoHeader from "./modify-crop-photo-header";
import ModifyCropPhotoFooter from "./modify-crop-photo-footer";

export interface ModifyCropPhotoModalProps {
  showModifyPhotoCropModal: boolean;
  handleCloseModifyPhotoCropModal: () => void;
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
  handleSaveCroppedPhoto: () => void;
}

export default function ModifyCropPhotoModal({
  showModifyPhotoCropModal,
  handleCloseModifyPhotoCropModal,
  imagePreviewUrl,
  crop,
  setCrop,
  zoom,
  setZoom,
  onCropComplete,
  handleSaveCroppedPhoto,
}: ModifyCropPhotoModalProps) {
  return (
    <Modal
      show={showModifyPhotoCropModal}
      onHide={handleCloseModifyPhotoCropModal}
      backdrop="static"
      keyboard={false}
      className="border-0"
      centered
    >
      <div
        style={{ height: "500px" }}
        className="d-flex flex-column bg-body-light"
      >
        <ModifyCropPhotoHeader
          handleCloseModifyPhotoCropModal={handleCloseModifyPhotoCropModal}
        />
        <ModifyCropPhotoBody
          imagePreviewUrl={imagePreviewUrl}
          crop={crop}
          setCrop={setCrop}
          zoom={zoom}
          setZoom={setZoom}
          onCropComplete={onCropComplete}
        />
        <ModifyCropPhotoFooter
          handleSaveCroppedPhoto={handleSaveCroppedPhoto}
        />
      </div>
    </Modal>
  );
}
