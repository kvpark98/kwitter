import { Modal } from "react-bootstrap";
import { CroppedAreaPixels } from "../../../../routes/profile";
import CreateCropPhotoBody from "./create-crop-photo-body";
import CreateCropPhotoHeader from "./create-crop-photo-header";
import CreateCropPhotoFooter from "./create-crop-photo-footer";

export interface CreateCropPhotoModalProps {
  showCreatePhotoCropModal: boolean;
  handleCloseCreatePhotoCropModal: () => void;
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

export default function CreateCropPhotoModal({
  showCreatePhotoCropModal,
  handleCloseCreatePhotoCropModal,
  imagePreviewUrl,
  crop,
  setCrop,
  zoom,
  setZoom,
  onCropComplete,
  handleSaveCroppedPhoto,
}: CreateCropPhotoModalProps) {
  return (
    <Modal
      show={showCreatePhotoCropModal}
      onHide={handleCloseCreatePhotoCropModal}
      backdrop="static"
      keyboard={false}
      className="border-0"
      centered
    >
      <div
        style={{ height: "500px" }}
        className="d-flex flex-column bg-body-light"
      >
        <CreateCropPhotoHeader
          handleClosePhotoCropModal={handleCloseCreatePhotoCropModal}
        />
        <CreateCropPhotoBody
          imagePreviewUrl={imagePreviewUrl}
          crop={crop}
          setCrop={setCrop}
          zoom={zoom}
          setZoom={setZoom}
          onCropComplete={onCropComplete}
        />
        <CreateCropPhotoFooter
          handleSaveCroppedPhoto={handleSaveCroppedPhoto}
        />
      </div>
    </Modal>
  );
}
