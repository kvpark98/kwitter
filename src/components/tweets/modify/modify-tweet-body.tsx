import { Alert } from "react-bootstrap";
import ModifyMessagePhoto from "./modify-message-photo";
import UserProfile from "../user-profile";

export interface ModifyTweetBodyProps {
  messageTextAreaRef: React.RefObject<HTMLTextAreaElement>;
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

export default function ModifyTweetBody({
  messageTextAreaRef,
  newMessage,
  handleNewMessage,
  photo,
  newImagePreviewUrl,
  croppedNewImagePreviewUrl,
  resetPhotoButton,
  photoDeleteButtonClicked,
  handleDeletePhoto,
  handleShowModifyPhotoCropModal,
}: ModifyTweetBodyProps) {
  return (
    <Alert
      variant="light"
      className="overflow-y-auto border-0 m-0 p-4"
      style={{ maxHeight: "500px" }}
    >
      <div className="d-flex w-100">
        <UserProfile />
        <ModifyMessagePhoto
          messageTextAreaRef={messageTextAreaRef}
          newMessage={newMessage}
          handleNewMessage={handleNewMessage}
          photo={photo}
          newImagePreviewUrl={newImagePreviewUrl}
          croppedNewImagePreviewUrl={croppedNewImagePreviewUrl}
          resetPhotoButton={resetPhotoButton}
          photoDeleteButtonClicked={photoDeleteButtonClicked}
          handleDeletePhoto={handleDeletePhoto}
          handleShowModifyPhotoCropModal={handleShowModifyPhotoCropModal}
        />
      </div>
    </Alert>
  );
}
