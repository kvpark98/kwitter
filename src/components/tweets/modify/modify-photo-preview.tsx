import ModifyPhotoPreviewRemove from "./modify-photo-preview-remove";

export interface ModifyPhotoPreviewProps {
  imagePreviewUrl: string;
  resetPhotoButton: () => void;
}

export default function ModifyPhotoPreview({
  imagePreviewUrl,
  resetPhotoButton,
}: ModifyPhotoPreviewProps) {
  return (
    <div className="position-relative mb-4">
      <img
        src={imagePreviewUrl}
        alt="Image Preview"
        className="w-100 h-100 rounded-4"
      />
      <ModifyPhotoPreviewRemove resetPhotoButton={resetPhotoButton} />
    </div>
  );
}
