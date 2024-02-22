import { Form, InputGroup } from "react-bootstrap";
import ModifyPhotoNew from "./modify-photo-new";
import ModifyPhotoCurrent from "./modify-photo-current";
import ModifyPhotoAdd from "./modify-photo-add";

export interface ModifyPhotoProps {
  newFileInputRef: React.RefObject<HTMLInputElement>;
  newFile: File | null;
  handleNewFile: (event: React.ChangeEvent<HTMLInputElement>) => void;
  photo?: string | undefined;
  deletePhotoChecked: boolean;
  handleDeletePhotoChecked: () => void;
}

export default function ModifyPhoto({
  newFileInputRef,
  newFile,
  handleNewFile,
  photo,
  deletePhotoChecked,
  handleDeletePhotoChecked,
}: ModifyPhotoProps) {
  return (
    <InputGroup.Text className="w-25 mb-3 p-0">
      <Form.Label
        htmlFor="newFile"
        className="btn btn-outline-secondary w-100 h-100 border-0 m-0 p-0"
      >
        {newFile ? (
          <ModifyPhotoNew />
        ) : photo ? (
          <ModifyPhotoCurrent
            photo={photo}
            deletePhotoChecked={deletePhotoChecked}
            handleDeletePhotoChecked={handleDeletePhotoChecked}
          />
        ) : (
          <ModifyPhotoAdd />
        )}
      </Form.Label>
      <Form.Control
        ref={newFileInputRef}
        onChange={handleNewFile}
        type="file"
        id="newFile"
        className="d-none"
        accept="image/*"
      />
    </InputGroup.Text>
  );
}
