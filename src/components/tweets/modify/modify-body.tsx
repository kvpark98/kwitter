import { Modal } from "react-bootstrap";
import ModifyTweetSuccess from "../../alert/success/tweets/modify/modify-tweet-success";
import ModifyTweetErrors from "../../alert/error/tweets/modify/modify-tweet-errors";
import ModifyInputGroup from "./modify-input-group";
import ModifyReset from "./modify-reset";

export interface ModifyBodyProps {
  error: string;
  newFileInputRef: React.RefObject<HTMLInputElement>;
  newMessage: string;
  handleNewMessage: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  newFile: File | null;
  handleNewFile: (event: React.ChangeEvent<HTMLInputElement>) => void;
  photo: string | undefined;
  deletePhotoChecked: boolean;
  handleDeletePhotoChecked: () => void;
  resetMessageButton: () => void;
  resetPhotoButton: () => void;
  tweetModified: boolean;
}

export default function ModifyBody({
  error,
  newFileInputRef,
  newMessage,
  handleNewMessage,
  newFile,
  handleNewFile,
  photo,
  deletePhotoChecked,
  handleDeletePhotoChecked,
  resetMessageButton,
  resetPhotoButton,
  tweetModified,
}: ModifyBodyProps) {
  return (
    <Modal.Body>
      {tweetModified && !error && <ModifyTweetSuccess />}
      {error && <ModifyTweetErrors error={error} />}
      <ModifyInputGroup
        newFileInputRef={newFileInputRef}
        newMessage={newMessage}
        handleNewMessage={handleNewMessage}
        newFile={newFile}
        handleNewFile={handleNewFile}
        photo={photo}
        deletePhotoChecked={deletePhotoChecked}
        handleDeletePhotoChecked={handleDeletePhotoChecked}
      />
      <ModifyReset
        resetMessageButton={resetMessageButton}
        resetPhotoButton={resetPhotoButton}
      />
    </Modal.Body>
  );
}
