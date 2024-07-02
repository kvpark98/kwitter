import { Form, Modal } from "react-bootstrap";
import ModifyTweetHeader from "./modify-tweet-header";
import ModifyTweetBody from "./modify-tweet-body";
import ModifyTweetFooter from "./modify-tweet-footer";

export interface ModifyTweetProps {
  isLoading: boolean;
  photo: string | undefined;
  newFileInputRef: React.RefObject<HTMLInputElement>;
  message: string;
  handleNewMessage: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isNewMessage: boolean;
  handleNewFile: (event: React.ChangeEvent<HTMLInputElement>) => void;
  newImagePreviewUrl: string;
  croppedNewImagePreviewUrl: string;
  resetMessageButton: () => void;
  resetPhotoButton: () => void;
  photoDeleteButtonClicked: boolean;
  handleDeletePhoto: () => Promise<void>;
  modifyTweet: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  showModifyTweetModal: boolean;
  handleCloseModifyTweetModal: () => void;
  handleShowModifyPhotoCropModal: () => void;
}

export default function ModifyTweet({
  isLoading,
  photo,
  newFileInputRef,
  message,
  handleNewMessage,
  isNewMessage,
  handleNewFile,
  newImagePreviewUrl,
  croppedNewImagePreviewUrl,
  resetMessageButton,
  resetPhotoButton,
  photoDeleteButtonClicked,
  handleDeletePhoto,
  modifyTweet,
  showModifyTweetModal,
  handleCloseModifyTweetModal,
  handleShowModifyPhotoCropModal,
}: ModifyTweetProps) {
  return (
    <Modal
      show={showModifyTweetModal}
      onHide={handleCloseModifyTweetModal}
      backdrop="static"
      keyboard={false}
      className="border-0"
      centered
    >
      <ModifyTweetHeader
        handleCloseModifyTweetModal={handleCloseModifyTweetModal}
      />
      <Form className="w-100" onSubmit={modifyTweet}>
        <ModifyTweetBody
          message={message}
          handleNewMessage={handleNewMessage}
          photo={photo}
          newImagePreviewUrl={newImagePreviewUrl}
          croppedNewImagePreviewUrl={croppedNewImagePreviewUrl}
          resetPhotoButton={resetPhotoButton}
          photoDeleteButtonClicked={photoDeleteButtonClicked}
          handleDeletePhoto={handleDeletePhoto}
          handleShowModifyPhotoCropModal={handleShowModifyPhotoCropModal}
        />
        <ModifyTweetFooter
          isLoading={isLoading}
          isNewMessage={isNewMessage}
          newFileInputRef={newFileInputRef}
          handleNewFile={handleNewFile}
          resetMessageButton={resetMessageButton}
        />
      </Form>
    </Modal>
  );
}
