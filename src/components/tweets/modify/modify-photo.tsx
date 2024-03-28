import ModifyPhotoDelete from "./modify-photo-delete";

export interface ModifyPhotoProps {
  photo: string | undefined;
  deletePhoto: () => Promise<void>;
}

export default function ModifyPhoto({ photo, deletePhoto }: ModifyPhotoProps) {
  return (
    <div className="position-relative">
      <img src={photo} alt="Image Preview" className="w-100 h-100 rounded-4" />
      <ModifyPhotoDelete deletePhoto={deletePhoto} />
    </div>
  );
}
