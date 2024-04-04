import { Form } from "react-bootstrap";
import ModifyMessage from "./modify-message";
import ModifyPhoto from "./modify-photo";
import ModifyPhotoPreview from "./modify-photo-preview";

export interface ModifyMessagePhotoProps {
  newMessage: string;
  handleNewMessage: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  photo: string | undefined;
  newImagePreviewUrl: string;
  croppedNewImagePreviewUrl: string;
  resetPhotoButton: () => void;
  deletePhoto: () => Promise<void>;
  handleShowModifyPhotoCropModal: () => void;
}

export default function ModifyMessagePhoto({
  newMessage,
  handleNewMessage,
  photo,
  newImagePreviewUrl,
  croppedNewImagePreviewUrl,
  resetPhotoButton,
  deletePhoto,
  handleShowModifyPhotoCropModal,
}: ModifyMessagePhotoProps) {
  return (
    <Form.Group className="w-100">
      <ModifyMessage
        newMessage={newMessage}
        handleNewMessage={handleNewMessage}
      />
      {newImagePreviewUrl ? (
        <ModifyPhotoPreview
          newImagePreviewUrl={newImagePreviewUrl}
          croppedNewImagePreviewUrl={croppedNewImagePreviewUrl}
          resetPhotoButton={resetPhotoButton}
          handleShowModifyPhotoCropModal={handleShowModifyPhotoCropModal}
        />
      ) : (
        photo && <ModifyPhoto photo={photo} deletePhoto={deletePhoto} />
      )}
    </Form.Group>
  );
}
