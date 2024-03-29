import CreatePhotoPreviewEdit from "./create-photo-preview-edit";
import CreatePhotoPreviewRemove from "./create-photo-preview-remove";

export interface CreatePhotoPreviewProps {
  imagePreviewUrl: string;
  croppedImagePreviewUrl: string;
  resetPhotoButton: () => void;
  handleShowPhotoCropModal: () => void;
}

export default function CreatePhotoPreview({
  imagePreviewUrl,
  croppedImagePreviewUrl,
  resetPhotoButton,
  handleShowPhotoCropModal,
}: CreatePhotoPreviewProps) {
  return (
    <div className="position-relative">
      <img
        src={croppedImagePreviewUrl ? croppedImagePreviewUrl : imagePreviewUrl}
        alt="Image Preview"
        className="w-100 h-100 rounded-4"
      />
      <CreatePhotoPreviewEdit
        handleShowPhotoCropModal={handleShowPhotoCropModal}
      />
      <CreatePhotoPreviewRemove resetPhotoButton={resetPhotoButton} />
    </div>
  );
}
