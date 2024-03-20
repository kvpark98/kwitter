import { Form } from "react-bootstrap";
import ModifyMessage from "./modify-message";
import ModifyPhoto from "./modify-photo";
import ModifyPhotoPreview from "./modify-photo-preview";

export interface ModifyMessagePhotoProps {
  newMessage: string;
  handleNewMessage: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  photo: string | undefined;
  imagePreviewUrl: string;
  resetPhotoButton: () => void;
  deletePhoto: () => Promise<void>;
}

export default function ModifyMessagePhoto({
  newMessage,
  handleNewMessage,
  photo,
  imagePreviewUrl,
  resetPhotoButton,
  deletePhoto,
}: ModifyMessagePhotoProps) {
  return (
    <Form.Group className="w-100">
      <ModifyMessage
        newMessage={newMessage}
        handleNewMessage={handleNewMessage}
      />
      {imagePreviewUrl ? (
        <ModifyPhotoPreview
          imagePreviewUrl={imagePreviewUrl}
          resetPhotoButton={resetPhotoButton}
        />
      ) : (
        photo && <ModifyPhoto photo={photo} deletePhoto={deletePhoto} />
      )}
    </Form.Group>
  );
}
