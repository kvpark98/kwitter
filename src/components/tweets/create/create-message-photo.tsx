import { Form } from "react-bootstrap";
import CreateMessage from "./create-message";
import CreatePhotoPreview from "./create-photo-preview";

export interface CreateMessagePhotoProps {
  message: string;
  handleMessage: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  imagePreviewUrl: string;
  resetPhotoButton: () => void;
  handleShowPhotoCropModal: () => void;
}

export default function CreateMessagePhoto({
  message,
  handleMessage,
  imagePreviewUrl,
  resetPhotoButton,
  handleShowPhotoCropModal,
}: CreateMessagePhotoProps) {
  return (
    <Form.Group className="w-100">
      <CreateMessage message={message} handleMessage={handleMessage} />
      {imagePreviewUrl && (
        <CreatePhotoPreview
          imagePreviewUrl={imagePreviewUrl}
          resetPhotoButton={resetPhotoButton}
          handleShowPhotoCropModal={handleShowPhotoCropModal}
        />
      )}
    </Form.Group>
  );
}
