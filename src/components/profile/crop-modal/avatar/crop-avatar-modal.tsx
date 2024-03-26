import { Modal } from "react-bootstrap";
import { CroppedAreaPixels } from "../../../../routes/profile";
import CropAvatarHeader from "./crop-avatar-header";
import CropAvatarBody from "./crop-avatar-body";
import CropAvatarFooter from "./crop-avatar-footer";

export interface CropAvatarModalProps {
  showAvatarCropModal: boolean;
  handleCloseAvatarCropModal: () => void;
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
  handleSaveCroppedAvatar: () => void;
}

export default function CropAvatarModal({
  showAvatarCropModal,
  handleCloseAvatarCropModal,
  avatarImagePreviewUrl,
  crop,
  setCrop,
  zoom,
  setZoom,
  onCropComplete,
  handleSaveCroppedAvatar,
}: CropAvatarModalProps) {
  return (
    <Modal
      show={showAvatarCropModal}
      onHide={handleCloseAvatarCropModal}
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
          handleCloseAvatarCropModal={handleCloseAvatarCropModal}
        />
        <CropAvatarBody
          avatarImagePreviewUrl={avatarImagePreviewUrl}
          crop={crop}
          setCrop={setCrop}
          zoom={zoom}
          setZoom={setZoom}
          onCropComplete={onCropComplete}
        />
        <CropAvatarFooter handleSaveCroppedAvatar={handleSaveCroppedAvatar} />
      </div>
    </Modal>
  );
}
