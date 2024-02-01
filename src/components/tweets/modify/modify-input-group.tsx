import { Form, InputGroup } from "react-bootstrap";
import ModifyPhoto from "./modify-photo";
import ModifyMessage from "./modify-message";

export interface ModifyInputGroupProps {
  newFileInputRef: React.RefObject<HTMLInputElement>;
  newMessage: string;
  handleNewMessage: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  newFile: File | null;
  handleNewFile: (event: React.ChangeEvent<HTMLInputElement>) => void;
  photo?: string | undefined;
  deletePhotoChecked: boolean;
  handleDeletePhotoChecked: () => void;
}

export default function ModifyInputGroup({
  newFileInputRef,
  newMessage,
  handleNewMessage,
  newFile,
  handleNewFile,
  photo,
  deletePhotoChecked,
  handleDeletePhotoChecked,
}: ModifyInputGroupProps) {
  return (
    <Form.Group>
      <InputGroup className="d-flex">
        <ModifyMessage
          newMessage={newMessage}
          handleNewMessage={handleNewMessage}
        />
        <ModifyPhoto
          newFileInputRef={newFileInputRef}
          newFile={newFile}
          handleNewFile={handleNewFile}
          photo={photo}
          deletePhotoChecked={deletePhotoChecked}
          handleDeletePhotoChecked={handleDeletePhotoChecked}
        />
      </InputGroup>
    </Form.Group>
  );
}
