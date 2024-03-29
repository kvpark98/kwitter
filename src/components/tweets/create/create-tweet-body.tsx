import { Alert } from "react-bootstrap";
import CreateTweetSuccess from "../../alert/success/tweets/create/create-tweet-success";
import CreateTweetErrors from "../../alert/error/tweets/create/create-tweet-errors";
import CreateMessagePhoto from "./create-message-photo";
import CreateTweetProfile from "./create-tweet-profile";

export interface CreateTweetBodyProps {
  error: string;
  message: string;
  handleMessage: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleFile: (event: React.ChangeEvent<HTMLInputElement>) => void;
  imagePreviewUrl: string;
  croppedImagePreviewUrl: string;
  resetPhotoButton: () => void;
  tweetCreated: boolean;
  handleShowCreatePhotoCropModal: () => void;
}

export default function CreateTweetBody({
  error,
  message,
  handleMessage,
  imagePreviewUrl,
  croppedImagePreviewUrl,
  resetPhotoButton,
  tweetCreated,
  handleShowCreatePhotoCropModal,
}: CreateTweetBodyProps) {
  return (
    <Alert
      variant="light"
      className="overflow-y-auto border-0 m-0 p-4"
      style={{ maxHeight: "600px" }}
    >
      {tweetCreated && !error && <CreateTweetSuccess />}
      {error && <CreateTweetErrors error={error} />}
      <div className="d-flex w-100">
        <CreateTweetProfile />
        <CreateMessagePhoto
          message={message}
          handleMessage={handleMessage}
          imagePreviewUrl={imagePreviewUrl}
          croppedImagePreviewUrl={croppedImagePreviewUrl}
          resetPhotoButton={resetPhotoButton}
          handleShowCreatePhotoCropModal={handleShowCreatePhotoCropModal}
        />
      </div>
    </Alert>
  );
}
