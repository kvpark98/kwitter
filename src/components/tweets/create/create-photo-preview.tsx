import CreatePhotoPreviewRemove from "./create-photo-preview-remove";

export interface CreatePhotoPreviewProps {
  imagePreviewUrl: string;
  resetPhotoButton: () => void;
}

export default function CreatePhotoPreview({
  imagePreviewUrl,
  resetPhotoButton,
}: CreatePhotoPreviewProps) {
  return (
    <div className="position-relative mb-4">
      <img
        src={imagePreviewUrl}
        alt="Image Preview"
        className="w-100 h-100 rounded-4"
      />
      <CreatePhotoPreviewRemove resetPhotoButton={resetPhotoButton} />
    </div>
  );
}
