import { Form, Modal } from "react-bootstrap";
import CreateTweetHeader from "./create-tweet-header";
import CreateTweetFooter from "./create-tweet-footer";
import CreateTweetBody from "./create-tweet-body";

export interface CreateTweetProps {
  showCreateTweetModal: boolean;
  isLoading: boolean;
  fileInputRef: React.RefObject<HTMLInputElement>;
  message: string;
  handleMessage: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isMessage: boolean;
  handleFile: (event: React.ChangeEvent<HTMLInputElement>) => void;
  imagePreviewUrl: string;
  croppedImagePreviewUrl: string;
  resetMessageButton: () => void;
  resetPhotoButton: () => void;
  createTweet: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleShowCreatePhotoCropModal: () => void;
  handleCloseCreateTweetModal: () => void;
}

export default function CreateTweet({
  showCreateTweetModal,
  isLoading,
  fileInputRef,
  message,
  handleMessage,
  isMessage,
  handleFile,
  imagePreviewUrl,
  croppedImagePreviewUrl,
  resetMessageButton,
  resetPhotoButton,
  createTweet,
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
      <Form className="w-100" onSubmit={createTweet}>
        <CreateTweetBody
          message={message}
          handleMessage={handleMessage}
          handleFile={handleFile}
          imagePreviewUrl={imagePreviewUrl}
          croppedImagePreviewUrl={croppedImagePreviewUrl}
          resetPhotoButton={resetPhotoButton}
          handleShowCreatePhotoCropModal={handleShowCreatePhotoCropModal}
        />
        <CreateTweetFooter
          isLoading={isLoading}
          isMessage={isMessage}
          fileInputRef={fileInputRef}
          handleFile={handleFile}
          resetMessageButton={resetMessageButton}
        />
      </Form>
    </Modal>
  );
}
