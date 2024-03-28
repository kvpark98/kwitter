import { Form } from "react-bootstrap";
import CreateMessage from "./create-message";
import CreatePhotoPreview from "./create-photo-preview";

export interface CreateMessagePhotoProps {
  message: string;
  handleMessage: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  imagePreviewUrl: string;
  resetPhotoButton: () => void;
  handleShowCreatePhotoCropModal: () => void;
}

export default function CreateMessagePhoto({
  message,
  handleMessage,
  imagePreviewUrl,
  resetPhotoButton,
  handleShowCreatePhotoCropModal,
}: CreateMessagePhotoProps) {
  return (
    <Form.Group className="w-100">
      <CreateMessage message={message} handleMessage={handleMessage} />
      {imagePreviewUrl && (
        <CreatePhotoPreview
          imagePreviewUrl={imagePreviewUrl}
          resetPhotoButton={resetPhotoButton}
          handleShowPhotoCropModal={handleShowCreatePhotoCropModal}
        />
      )}
    </Form.Group>
  );
}
