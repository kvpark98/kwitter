import { Alert } from "react-bootstrap";
import ModifyTweetProfile from "./modify-tweet-profile";
import ModifyMessagePhoto from "./modify-message-photo";

export interface ModifyTweetBodyProps {
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
      style={{ maxHeight: "600px" }}
    >
      <div className="d-flex w-100">
        <ModifyTweetProfile />
        <ModifyMessagePhoto
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
