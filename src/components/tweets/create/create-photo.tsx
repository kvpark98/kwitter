import { Form, InputGroup } from "react-bootstrap";
import CreatePhotoChange from "./create-photo-change";
import CreatePhotoAdd from "./create-photo-add";

export interface CreatePhotoProps {
  fileInputRef: React.RefObject<HTMLInputElement>;
  file: File | null;
  handleFile: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CreatePhoto({
  fileInputRef,
  file,
  handleFile,
}: CreatePhotoProps) {
  return (
    <InputGroup.Text className="w-25 mb-4 p-0">
      <Form.Label
        htmlFor="file"
        className="btn btn-outline-secondary w-100 h-100 border-0 m-0 rounded-end"
      >
        {file ? <CreatePhotoChange /> : <CreatePhotoAdd />}
      </Form.Label>
      <Form.Control
        ref={fileInputRef}
        onChange={handleFile}
        type="file"
        id="file"
        className="d-none"
        accept="image/*"
      />
    </InputGroup.Text>
  );
}
