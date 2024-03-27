import { Modal } from "react-bootstrap";
import { CroppedAreaPixels } from "../../../../routes/profile";
import CropAvatarHeader from "../../../profile/crop-modal/avatar/crop-avatar-header";
import CropAvatarBody from "../../../profile/crop-modal/avatar/crop-avatar-body";
import CropAvatarFooter from "../../../profile/crop-modal/avatar/crop-avatar-footer";

export interface CropPhotoModalProps {
  showPhotoCropModal: boolean;
  handleClosePhotoCropModal: () => void;
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

export default function CropPhotoModal({
  showPhotoCropModal,
  handleClosePhotoCropModal,
  imagePreviewUrl,
  crop,
  setCrop,
  zoom,
  setZoom,
  onCropComplete,
  handleSaveCroppedPhoto,
}: CropPhotoModalProps) {
  return (
    <Modal
      show={showPhotoCropModal}
      onHide={handleClosePhotoCropModal}
      backdrop="static"
      keyboard={false}
      className="border-0"
      centered
    >
      <div
        style={{ height: "500px" }}
        className="d-flex flex-column bg-body-light"
      >
        <CropAvatarHeader
          handleCloseAvatarCropModal={handleClosePhotoCropModal}
        />
        <CropAvatarBody
          avatarImagePreviewUrl={imagePreviewUrl}
          crop={crop}
          setCrop={setCrop}
          zoom={zoom}
          setZoom={setZoom}
          onCropComplete={onCropComplete}
        />
        <CropAvatarFooter handleSaveCroppedAvatar={handleSaveCroppedPhoto} />
      </div>
    </Modal>
  );
}
