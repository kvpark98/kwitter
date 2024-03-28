import ModifyPhotoPreviewEdit from "./modify-photo-preview-edit";
import ModifyPhotoPreviewRemove from "./modify-photo-preview-remove";

export interface ModifyPhotoPreviewProps {
  imagePreviewUrl: string;
  resetPhotoButton: () => void;
  handleShowModifyPhotoCropModal: () => void;
}

export default function ModifyPhotoPreview({
  imagePreviewUrl,
  resetPhotoButton,
  handleShowModifyPhotoCropModal,
}: ModifyPhotoPreviewProps) {
  return (
    <div className="position-relative">
      <img
        src={imagePreviewUrl}
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
