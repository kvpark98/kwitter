import { Alert } from "react-bootstrap";
import ModifyTweetSuccess from "../../alert/success/tweets/modify/modify-tweet-success";
import ModifyTweetErrors from "../../alert/error/tweets/modify/modify-tweet-errors";
import ModifyTweetProfile from "./modify-tweet-profile";
import ModifyMessagePhoto from "./modify-message-photo";

export interface ModifyTweetBodyProps {
  error: string;
  newMessage: string;
  handleNewMessage: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  photo: string | undefined;
  newImagePreviewUrl: string;
  croppedNewImagePreviewUrl: string;
  resetPhotoButton: () => void;
  deletePhoto: () => Promise<void>;
  tweetModified: boolean;
  handleShowModifyPhotoCropModal: () => void;
}

export default function ModifyTweetBody({
  error,
  newMessage,
  handleNewMessage,
  photo,
  newImagePreviewUrl,
  croppedNewImagePreviewUrl,
  resetPhotoButton,
  deletePhoto,
  tweetModified,
  handleShowModifyPhotoCropModal,
}: ModifyTweetBodyProps) {
  return (
    <Alert
      variant="light"
      className="overflow-y-auto border-0 m-0 p-4"
      style={{ maxHeight: "600px" }}
    >
      {tweetModified && !error && <ModifyTweetSuccess />}
      {error && <ModifyTweetErrors error={error} />}
      <div className="d-flex w-100">
        <ModifyTweetProfile />
        <ModifyMessagePhoto
          newMessage={newMessage}
          handleNewMessage={handleNewMessage}
          photo={photo}
          newImagePreviewUrl={newImagePreviewUrl}
          croppedNewImagePreviewUrl={croppedNewImagePreviewUrl}
          resetPhotoButton={resetPhotoButton}
          deletePhoto={deletePhoto}
          handleShowModifyPhotoCropModal={handleShowModifyPhotoCropModal}
        />
      </div>
    </Alert>
  );
}
