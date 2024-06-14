import { Alert } from "react-bootstrap";
import CreateMessagePhoto from "./create-message-photo";
import UserProfile from "../user-profile";

export interface CreateTweetBodyProps {
  message: string;
  handleMessage: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleFile: (event: React.ChangeEvent<HTMLInputElement>) => void;
  imagePreviewUrl: string;
  croppedImagePreviewUrl: string;
  resetPhotoButton: () => void;
  handleShowCreatePhotoCropModal: () => void;
}

export default function CreateTweetBody({
  message,
  handleMessage,
  imagePreviewUrl,
  croppedImagePreviewUrl,
  resetPhotoButton,
  handleShowCreatePhotoCropModal,
}: CreateTweetBodyProps) {
  return (
    <Alert
      variant="light"
      className="overflow-y-auto border-0 m-0 p-4"
      style={{ maxHeight: "600px" }}
    >
      <div className="d-flex w-100">
        <UserProfile />
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
