import { Alert, Form } from "react-bootstrap";
import CreateTweetSuccess from "../../alert/success/tweets/create/create-tweet-success";
import CreateTweetErrors from "../../alert/error/tweets/create/create-tweet-errors";
import CreateMessagePhoto from "./create-message-photo";
import CreateButtons from "./create-buttons";
import CreateTweetProfile from "./create-tweet-profile";

export interface CreateTweetFormProps {
  isLoading: boolean;
  error: string;
  fileInputRef: React.RefObject<HTMLInputElement>;
  message: string;
  handleMessage: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isMessage: boolean;
  handleFile: (event: React.ChangeEvent<HTMLInputElement>) => void;
  imagePreviewUrl: string;
  resetMessageButton: () => void;
  resetPhotoButton: () => void;
  createTweet: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  tweetCreated: boolean;
}

export default function CreateTweetForm({
  isLoading,
  error,
  fileInputRef,
  message,
  handleMessage,
  isMessage,
  handleFile,
  imagePreviewUrl,
  resetMessageButton,
  resetPhotoButton,
  createTweet,
  tweetCreated,
}: CreateTweetFormProps) {
  return (
    <div>
      {tweetCreated && !error && <CreateTweetSuccess />}
      {error && <CreateTweetErrors error={error} />}
      <Alert variant="light" className="px-4 py-4 w-100">
        <Form className="w-100" onSubmit={createTweet}>
          <div className="d-flex w-100">
            <CreateTweetProfile />
            <CreateMessagePhoto
              message={message}
              handleMessage={handleMessage}
              imagePreviewUrl={imagePreviewUrl}
              resetPhotoButton={resetPhotoButton}
            />
          </div>
          <CreateButtons
            isLoading={isLoading}
            isMessage={isMessage}
            fileInputRef={fileInputRef}
            handleFile={handleFile}
            resetMessageButton={resetMessageButton}
          />
        </Form>
      </Alert>
    </div>
  );
}
