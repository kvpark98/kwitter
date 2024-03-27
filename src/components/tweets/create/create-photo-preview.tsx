import CreatePhotoPreviewEdit from "./create-photo-preview-edit";
import CreatePhotoPreviewRemove from "./create-photo-preview-remove";

export interface CreatePhotoPreviewProps {
  imagePreviewUrl: string;
  resetPhotoButton: () => void;
  handleShowPhotoCropModal: () => void;
}

export default function CreatePhotoPreview({
  imagePreviewUrl,
  resetPhotoButton,
  handleShowPhotoCropModal,
}: CreatePhotoPreviewProps) {
  return (
    <div className="position-relative mb-4">
      <img
        src={imagePreviewUrl}
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
