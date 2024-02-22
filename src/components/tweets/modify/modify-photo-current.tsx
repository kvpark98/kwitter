import { Card } from "react-bootstrap";
import ModifyPhotoDelete from "./modify-photo-delete";

export interface ModifyPhotoCurrentProps {
  photo?: string | undefined;
  deletePhotoChecked: boolean;
  handleDeletePhotoChecked: () => void;
}

export default function ModifyPhotoCurrent({
  photo,
  deletePhotoChecked,
  handleDeletePhotoChecked,
}: ModifyPhotoCurrentProps) {
  return (
    <div className="h-100">
      <Card.Img
        variant="top"
        src={photo}
        alt="Photo"
        className="position-relative w-100 h-100 rounded-end"
        title="Change Photo"
      />
      <ModifyPhotoDelete
        deletePhotoChecked={deletePhotoChecked}
        handleDeletePhotoChecked={handleDeletePhotoChecked}
      />
    </div>
  );
}
