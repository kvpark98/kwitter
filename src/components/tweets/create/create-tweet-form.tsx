import { Alert, Button, Form } from "react-bootstrap";
import CreateReset from "./create-reset";
import CreateInputGroup from "./create-input-group";
import CreateTweetSuccess from "../../alert/success/tweets/create/create-tweet-success";
import CreateTweetErrors from "../../alert/error/tweets/create/create-tweet-errors";

export interface CreateTweetFormProps {
  isLoading: boolean;
  error: string;
  fileInputRef: React.RefObject<HTMLInputElement>;
  message: string;
  handleMessage: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isMessage: boolean;
  file: File | null;
  handleFile: (event: React.ChangeEvent<HTMLInputElement>) => void;
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
  resetMessageButton,
  resetPhotoButton,
  createTweet,
  tweetCreated,
}: CreateTweetFormProps) {
  return (
    <div>
      <h1 className="fs-2 text-center mb-4">Create Tweet</h1>
      {tweetCreated && !error && <CreateTweetSuccess />}
      {error && <CreateTweetErrors error={error} />}
      <Alert variant="light" className="mt-3 px-4 py-4 w-100">
        <Form className="w-100" onSubmit={createTweet}>
          <CreateInputGroup
            fileInputRef={fileInputRef}
            message={message}
            handleMessage={handleMessage}
            file={file}
            handleFile={handleFile}
          />
          <CreateReset
            resetMessageButton={resetMessageButton}
            resetPhotoButton={resetPhotoButton}
          />
          <Button
            type="submit"
            variant="primary"
            className="w-100 fw-bold"
            {...(!isMessage ? { disabled: true } : { disabled: false })}
          >
            {isLoading ? "Creating..." : "Create"}
          </Button>
        </Form>
      </Alert>
    </div>
  );
}
