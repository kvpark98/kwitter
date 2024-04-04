import ModifyPhotoPreviewEdit from "./modify-photo-preview-edit";
import ModifyPhotoPreviewRemove from "./modify-photo-preview-remove";

export interface ModifyPhotoPreviewProps {
  newImagePreviewUrl: string;
  croppedNewImagePreviewUrl: string;
  resetPhotoButton: () => void;
  handleShowModifyPhotoCropModal: () => void;
}

export default function ModifyPhotoPreview({
  newImagePreviewUrl,
  croppedNewImagePreviewUrl,
  resetPhotoButton,
  handleShowModifyPhotoCropModal,
}: ModifyPhotoPreviewProps) {
  return (
    <div className="position-relative">
      <img
        src={
          croppedNewImagePreviewUrl
            ? croppedNewImagePreviewUrl
            : newImagePreviewUrl
        }
        alt="Image Preview"
        className="w-100 h-100 rounded-4"
      />
      <ModifyPhotoPreviewEdit
        handleShowModifyPhotoCropModal={handleShowModifyPhotoCropModal}
      />
      <ModifyPhotoPreviewRemove resetPhotoButton={resetPhotoButton} />
    </div>
  );
}
