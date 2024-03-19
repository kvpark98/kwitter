import ModifyPhotoDelete from "./modify-photo-delete";
import ModifyPhotoRemove from "./modify-photo-remove";

export interface ModifyPhotoProps {
  photo: string | undefined;
  imagePreviewUrl: string;
  resetPhotoButton: () => void;
  deletePhoto: () => Promise<void>;
}

export default function ModifyPhoto({
  photo,
  imagePreviewUrl,
  resetPhotoButton,
  deletePhoto,
}: ModifyPhotoProps) {
  return (
    <div className="position-relative mb-4">
      <img src={photo} alt="Image Preview" className="w-100 h-100 rounded-4" />
      {imagePreviewUrl ? (
        <ModifyPhotoRemove resetPhotoButton={resetPhotoButton} />
      ) : (
        photo && <ModifyPhotoDelete deletePhoto={deletePhoto} />
      )}
    </div>
  );
}
