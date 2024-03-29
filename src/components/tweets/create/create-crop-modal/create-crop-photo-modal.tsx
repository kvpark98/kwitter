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
  createRatio1x1: boolean;
  createRatio4x3: boolean;
  createRatio16x9: boolean;
  handleCreateRatio1x1: () => void;
  handleCreateRatio4x3: () => void;
  handleCreateRatio16x9: () => void;
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
  createRatio1x1,
  createRatio4x3,
  createRatio16x9,
  handleCreateRatio1x1,
  handleCreateRatio4x3,
  handleCreateRatio16x9,
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
          createRatio1x1={createRatio1x1}
          createRatio4x3={createRatio4x3}
          createRatio16x9={createRatio16x9}
        />
        <CreateCropPhotoFooter
          handleSaveCroppedPhoto={handleSaveCroppedPhoto}
          createRatio1x1={createRatio1x1}
          createRatio4x3={createRatio4x3}
          createRatio16x9={createRatio16x9}
          handleCreateRatio1x1={handleCreateRatio1x1}
          handleCreateRatio4x3={handleCreateRatio4x3}
          handleCreateRatio16x9={handleCreateRatio16x9}
        />
      </div>
    </Modal>
  );
}
