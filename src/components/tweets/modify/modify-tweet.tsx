import { Form, Modal } from "react-bootstrap";
import ModifyTweetHeader from "./modify-tweet-header";
import ModifyTweetBody from "./modify-tweet-body";
import ModifyTweetFooter from "./modify-tweet-footer";

export interface ModifyTweetProps {
  isLoading: boolean;
  error: string;
  photo: string | undefined;
  newFileInputRef: React.RefObject<HTMLInputElement>;
  newMessage: string;
  handleNewMessage: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isNewMessage: boolean;
  handleNewFile: (event: React.ChangeEvent<HTMLInputElement>) => void;
  newImagePreviewUrl: string;
  croppedNewImagePreviewUrl: string;
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
  newImagePreviewUrl,
  croppedNewImagePreviewUrl,
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
      <Form className="w-100" onSubmit={modifyTweet}>
        <ModifyTweetBody
          error={error}
          newMessage={newMessage}
          handleNewMessage={handleNewMessage}
          photo={photo}
          newImagePreviewUrl={newImagePreviewUrl}
          croppedNewImagePreviewUrl={croppedNewImagePreviewUrl}
          resetPhotoButton={resetPhotoButton}
          deletePhoto={deletePhoto}
          tweetModified={tweetModified}
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
