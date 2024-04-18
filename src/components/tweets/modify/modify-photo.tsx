import ModifyPhotoDelete from "./modify-photo-delete";

export interface ModifyPhotoProps {
  photo: string | undefined;
  photoDeleteButtonClicked: boolean;
  handleDeletePhoto: () => Promise<void>;
}

export default function ModifyPhoto({
  photo,
  photoDeleteButtonClicked,
  handleDeletePhoto,
}: ModifyPhotoProps) {
  return (
    <div
      className={
        photoDeleteButtonClicked
          ? "position-relative d-none"
          : "position-relative"
      }
    >
      <img src={photo} alt="Image Preview" className="w-100 h-100 rounded-4" />
      <ModifyPhotoDelete handleDeletePhoto={handleDeletePhoto} />
    </div>
  );
}
