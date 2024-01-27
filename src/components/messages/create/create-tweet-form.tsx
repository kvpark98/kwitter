import { Alert, Button, Form } from "react-bootstrap";
import CreateReset from "./create-reset";
import CreateInputGroup from "./create-input-group";

export interface CreateTweetFormProps {
  isLoading: boolean;
  fileInputRef: React.RefObject<HTMLInputElement>;
  message: string;
  handleMessage: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isMessage: boolean;
  file: File | null;
  handleFile: (event: React.ChangeEvent<HTMLInputElement>) => void;
  resetMessageButton: () => void;
  resetPhotoButton: () => void;
  createTweet: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

export default function CreateTweetForm({
  isLoading,
  fileInputRef,
  message,
  handleMessage,
  isMessage,
  file,
  handleFile,
  resetMessageButton,
  resetPhotoButton,
  createTweet,
}: CreateTweetFormProps) {
  return (
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
  );
}
