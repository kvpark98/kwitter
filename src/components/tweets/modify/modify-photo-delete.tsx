import { Form } from "react-bootstrap";
import ModifyPhotoDeleteBadge from "./modify-photo-delete-badge";

export interface ModifyPhotoDeleteProps {
  deletePhotoChecked: boolean;
  handleDeletePhotoChecked: () => void;
}

export default function ModifyPhotoDelete({
  deletePhotoChecked,
  handleDeletePhotoChecked,
}: ModifyPhotoDeleteProps) {
  return (
    <div style={{ height: 0 }}>
      <Form.Label
        htmlFor="deletePhoto"
        className="m-0"
        onClick={handleDeletePhotoChecked}
      >
        <ModifyPhotoDeleteBadge deletePhotoChecked={deletePhotoChecked} />
      </Form.Label>
      <Form.Check
        id="deletePhoto"
        type="checkbox"
        className="d-none"
      ></Form.Check>
    </div>
  );
}
