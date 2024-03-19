import ModifyPhotoRemove from "./modify-photo-remove";

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
      <ModifyPhotoRemove resetPhotoButton={resetPhotoButton} />
    </div>
  );
}
