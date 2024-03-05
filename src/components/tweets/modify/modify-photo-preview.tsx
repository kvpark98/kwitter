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
    <div className="position-relative">
      <img
        src={imagePreviewUrl}
        alt="Image Preview"
        className="w-100 h-100 mb-4 rounded-4"
      />
      <ModifyPhotoRemove resetPhotoButton={resetPhotoButton} />
    </div>
  );
}
