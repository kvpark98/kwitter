import { Form, InputGroup } from "react-bootstrap";
import CreateMessage from "./create-message";
import CreatePhoto from "./create-photo";

export interface CreateInputGroupProps {
  fileInputRef: React.RefObject<HTMLInputElement>;
  message: string;
  handleMessage: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  file: File | null;
  handleFile: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CreateInputGroup({
  fileInputRef,
  message,
  handleMessage,
  file,
  handleFile,
}: CreateInputGroupProps) {
  return (
    <Form.Group>
      <InputGroup className="d-flex">
        <CreateMessage message={message} handleMessage={handleMessage} />
        <CreatePhoto
          fileInputRef={fileInputRef}
          file={file}
          handleFile={handleFile}
        />
      </InputGroup>
    </Form.Group>
  );
}
