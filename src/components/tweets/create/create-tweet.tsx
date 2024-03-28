import CreateTweetForm from "./create-tweet-form";
import { Modal } from "react-bootstrap";
import CreateTweetHeader from "./create-tweet-header";

export interface CreateTweetProps {
  showCreateTweetModal: boolean;
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
  handleShowCreatePhotoCropModal: () => void;
  handleCloseCreateTweetModal: () => void;
}

export default function CreateTweet({
  showCreateTweetModal,
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
  handleShowCreatePhotoCropModal,
  handleCloseCreateTweetModal,
}: CreateTweetProps) {
  return (
    <Modal
      show={showCreateTweetModal}
      onHide={handleCloseCreateTweetModal}
      backdrop="static"
      keyboard={false}
      className="border-0"
      centered
    >
      <CreateTweetHeader
        handleCloseCreateTweetModal={handleCloseCreateTweetModal}
      />
      <CreateTweetForm
        isLoading={isLoading}
        error={error}
        fileInputRef={fileInputRef}
        message={message}
        handleMessage={handleMessage}
        isMessage={isMessage}
        handleFile={handleFile}
        imagePreviewUrl={imagePreviewUrl}
        resetMessageButton={resetMessageButton}
        resetPhotoButton={resetPhotoButton}
        createTweet={createTweet}
        tweetCreated={tweetCreated}
        handleShowCreatePhotoCropModal={handleShowCreatePhotoCropModal}
      />
    </Modal>
  );
}
