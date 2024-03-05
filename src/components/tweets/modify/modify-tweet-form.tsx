import { Alert, Form } from "react-bootstrap";
import ModifyTweetErrors from "../../alert/error/tweets/modify/modify-tweet-errors";
import ModifyTweetSuccess from "../../alert/success/tweets/modify/modify-tweet-success";
import ModifyTweetProfile from "./modify-tweet-profile";
import ModifyMessagePhoto from "./modify-message-photo";
import ModifyButtons from "./modify-buttons";

export interface ModifyTweetFormProps {
  isLoading: boolean;
  error: string;
  newFileInputRef: React.RefObject<HTMLInputElement>;
  newMessage: string;
  handleNewMessage: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isNewMessage: boolean;
  handleNewFile: (event: React.ChangeEvent<HTMLInputElement>) => void;
  photo: string | undefined;
  imagePreviewUrl: string;
  resetMessageButton: () => void;
  resetPhotoButton: () => void;
  deletePhoto: () => Promise<void>;
  modifyTweet: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  tweetModified: boolean;
  handleCloseModifyModal: () => void;
}

export default function ModifyTweetForm({
  isLoading,
  error,
  newFileInputRef,
  newMessage,
  handleNewMessage,
  isNewMessage,
  handleNewFile,
  photo,
  imagePreviewUrl,
  resetMessageButton,
  resetPhotoButton,
  deletePhoto,
  modifyTweet,
  tweetModified,
  handleCloseModifyModal,
}: ModifyTweetFormProps) {
  return (
    <Form className="w-100" onSubmit={modifyTweet}>
      <Alert
        variant="light"
        className="m-0 p-4 overflow-y-auto"
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
            imagePreviewUrl={imagePreviewUrl}
            resetPhotoButton={resetPhotoButton}
            deletePhoto={deletePhoto}
          />
        </div>
        <ModifyButtons
          isLoading={isLoading}
          isNewMessage={isNewMessage}
          newFileInputRef={newFileInputRef}
          handleNewFile={handleNewFile}
          resetMessageButton={resetMessageButton}
          handleCloseModifyModal={handleCloseModifyModal}
        />
      </Alert>
    </Form>
  );
}
