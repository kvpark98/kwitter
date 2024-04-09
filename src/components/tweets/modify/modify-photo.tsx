import ModifyPhotoDelete from "./modify-photo-delete";

export interface ModifyPhotoProps {
  imageRef: React.RefObject<HTMLDivElement>;
  photo: string | undefined;
  deletePhoto: () => Promise<void>;
}

export default function ModifyPhoto({
  imageRef,
  photo,
  deletePhoto,
}: ModifyPhotoProps) {
  return (
    <div ref={imageRef} className="position-relative">
      <img src={photo} alt="Image Preview" className="w-100 h-100 rounded-4" />
      <ModifyPhotoDelete deletePhoto={deletePhoto} />
    </div>
  );
}
