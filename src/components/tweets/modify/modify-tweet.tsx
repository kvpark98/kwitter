import { Modal } from "react-bootstrap";
import ModifyTweetForm from "./modify-tweet-form";
import ModifyTweetHeader from "./modify-tweet-header";

export interface ModifyTweetProps {
  isLoading: boolean;
  error: string;
  photo: string | undefined;
  newFileInputRef: React.RefObject<HTMLInputElement>;
  newMessage: string;
  handleNewMessage: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isNewMessage: boolean;
  handleNewFile: (event: React.ChangeEvent<HTMLInputElement>) => void;
  imagePreviewUrl: string;
  resetMessageButton: () => void;
  resetPhotoButton: () => void;
  deletePhoto: () => Promise<void>;
  modifyTweet: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  tweetModified: boolean;
  showTweetModifyModal: boolean;
  handleCloseTweetModifyModal: () => void;
  handleShowModifyPhotoCropModal: () => void;
}

export default function ModifyTweet({
  isLoading,
  error,
  photo,
  newFileInputRef,
  newMessage,
  handleNewMessage,
  isNewMessage,
  handleNewFile,
  imagePreviewUrl,
  resetMessageButton,
  resetPhotoButton,
  deletePhoto,
  modifyTweet,
  tweetModified,
  showTweetModifyModal,
  handleCloseTweetModifyModal,
  handleShowModifyPhotoCropModal,
}: ModifyTweetProps) {
  return (
    <Modal
      show={showTweetModifyModal}
      onHide={handleCloseTweetModifyModal}
      backdrop="static"
      keyboard={false}
      className="border-0"
      centered
    >
      <ModifyTweetHeader
        handleCloseTweetModifyModal={handleCloseTweetModifyModal}
      />
      <ModifyTweetForm
        isLoading={isLoading}
        error={error}
        newFileInputRef={newFileInputRef}
        newMessage={newMessage}
        handleNewMessage={handleNewMessage}
        isNewMessage={isNewMessage}
        handleNewFile={handleNewFile}
        photo={photo}
        imagePreviewUrl={imagePreviewUrl}
        resetMessageButton={resetMessageButton}
        resetPhotoButton={resetPhotoButton}
        deletePhoto={deletePhoto}
        modifyTweet={modifyTweet}
        tweetModified={tweetModified}
        handleShowModifyPhotoCropModal={handleShowModifyPhotoCropModal}
      />
    </Modal>
  );
}
