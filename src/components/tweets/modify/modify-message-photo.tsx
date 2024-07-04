import { Form } from "react-bootstrap";
import ModifyMessage from "./modify-message";
import ModifyPhoto from "./modify-photo";
import ModifyPhotoPreview from "./modify-photo-preview";

export interface ModifyMessagePhotoProps {
  messageTextAreaRef: React.RefObject<HTMLTextAreaElement>;
  message: string;
  newMessage: string;
  handleNewMessage: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  photo: string | undefined;
  newImagePreviewUrl: string;
  croppedNewImagePreviewUrl: string;
  resetPhotoButton: () => void;
  photoDeleteButtonClicked: boolean;
  handleDeletePhoto: () => Promise<void>;
  handleShowModifyPhotoCropModal: () => void;
}

export default function ModifyMessagePhoto({
  messageTextAreaRef,
  message,
  newMessage,
  handleNewMessage,
  photo,
  newImagePreviewUrl,
  croppedNewImagePreviewUrl,
  resetPhotoButton,
  photoDeleteButtonClicked,
  handleDeletePhoto,
  handleShowModifyPhotoCropModal,
}: ModifyMessagePhotoProps) {
  return (
    <Form.Group className="w-100">
      <ModifyMessage
        messageTextAreaRef={messageTextAreaRef}
        message={message}
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
        photo && (
          <ModifyPhoto
            photo={photo}
            photoDeleteButtonClicked={photoDeleteButtonClicked}
            handleDeletePhoto={handleDeletePhoto}
          />
        )
      )}
    </Form.Group>
  );
}
