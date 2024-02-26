import { Alert, Form } from "react-bootstrap";
import CreateInputGroup from "./create-input-group";
import CreateTweetSuccess from "../../alert/success/tweets/create/create-tweet-success";
import CreateTweetErrors from "../../alert/error/tweets/create/create-tweet-errors";
import CreateTweetButton from "./create-tweet-button";
import { Link } from "react-router-dom";
import { auth } from "../../../firebase";

export interface CreateTweetFormProps {
  isLoading: boolean;
  error: string;
  fileInputRef: React.RefObject<HTMLInputElement>;
  message: string;
  handleMessage: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isMessage: boolean;
  file: File | null;
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
  file,
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
        <Form className="d-flex w-100" onSubmit={createTweet}>
          <div>
            <Link to="/profile" className="me-2">
              <img
                src={auth.currentUser?.photoURL ?? "/default-profile.png"}
                alt="Profile Image"
                width="40"
                height="40"
                className="rounded-circle align-middle bg-light"
              />
            </Link>
          </div>
          <div className="w-100">
            <CreateInputGroup
              message={message}
              handleMessage={handleMessage}
              imagePreviewUrl={imagePreviewUrl}
              resetPhotoButton={resetPhotoButton}
            />
            <CreateTweetButton
              isLoading={isLoading}
              isMessage={isMessage}
              fileInputRef={fileInputRef}
              handleFile={handleFile}
              resetMessageButton={resetMessageButton}
            />
          </div>
        </Form>
      </Alert>
    </div>
  );
}
