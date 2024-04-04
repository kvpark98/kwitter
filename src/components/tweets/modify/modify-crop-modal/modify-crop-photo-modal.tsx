import { Modal } from "react-bootstrap";
import { CroppedAreaPixels } from "../../../../routes/profile";
import ModifyCropPhotoBody from "./modify-crop-photo-body";
import ModifyCropPhotoHeader from "./modify-crop-photo-header";
import ModifyCropPhotoFooter from "./modify-crop-photo-footer";

export interface ModifyCropPhotoModalProps {
  showModifyPhotoCropModal: boolean;
  handleCloseModifyPhotoCropModal: () => void;
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
  handleSaveCroppedPhoto: () => void;
  modifyRatio1x1: boolean;
  modifyRatio4x3: boolean;
  modifyRatio16x9: boolean;
  handleModifyRatio1x1: () => void;
  handleModifyRatio4x3: () => void;
  handleModifyRatio16x9: () => void;
}

export default function ModifyCropPhotoModal({
  showModifyPhotoCropModal,
  handleCloseModifyPhotoCropModal,
  newImagePreviewUrl,
  crop,
  setCrop,
  zoom,
  setZoom,
  onCropComplete,
  handleSaveCroppedPhoto,
  modifyRatio1x1,
  modifyRatio4x3,
  modifyRatio16x9,
  handleModifyRatio1x1,
  handleModifyRatio4x3,
  handleModifyRatio16x9,
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
          newImagePreviewUrl={newImagePreviewUrl}
          crop={crop}
          setCrop={setCrop}
          zoom={zoom}
          setZoom={setZoom}
          onCropComplete={onCropComplete}
          modifyRatio1x1={modifyRatio1x1}
          modifyRatio4x3={modifyRatio4x3}
          modifyRatio16x9={modifyRatio16x9}
        />
        <ModifyCropPhotoFooter
          handleSaveCroppedPhoto={handleSaveCroppedPhoto}
          modifyRatio1x1={modifyRatio1x1}
          modifyRatio4x3={modifyRatio4x3}
          modifyRatio16x9={modifyRatio16x9}
          handleModifyRatio1x1={handleModifyRatio1x1}
          handleModifyRatio4x3={handleModifyRatio4x3}
          handleModifyRatio16x9={handleModifyRatio16x9}
        />
      </div>
    </Modal>
  );
}
