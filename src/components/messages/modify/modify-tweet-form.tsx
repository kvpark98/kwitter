import { Alert, Button, Form, Modal } from "react-bootstrap";
import ModifyTweetSuccess from "../../alert/success/tweets/modify/modify-tweet-success";
import ModifyTweetErrors from "../../alert/error/post/modify/modify-tweet-errors";
import ModifyReset from "./modify-reset";
import ModifyInputGroup from "./modify-input-group";

export interface ModifyTweetFormProps {
  isLoading: boolean;
  error: string;
  newFileInputRef: React.RefObject<HTMLInputElement>;
  newMessage: string;
  handleNewMessage: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isNewMessage: boolean;
  newFile: File | null;
  handleNewFile: (event: React.ChangeEvent<HTMLInputElement>) => void;
  photo: string | undefined;
  deletePhotoClicked: boolean;
  handleDeletePhotoClicked: () => void;
  resetMessageButton: () => void;
  resetPhotoButton: () => void;
  modifyTweet: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  tweetModified: boolean;
  handleCloseModifyModal: () => void;
}

export default function ModifyTweetForm({
  isLoading,
  error,
  newFileInputRef,
  newMessage,
  handleNewMessage,
  isNewMessage,
  newFile,
  handleNewFile,
  photo,
  deletePhotoClicked,
  handleDeletePhotoClicked,
  resetMessageButton,
  resetPhotoButton,
  modifyTweet,
  tweetModified,
  handleCloseModifyModal,
}: ModifyTweetFormProps) {
  return (
    <Form className="w-100" onSubmit={modifyTweet}>
      <Alert variant="light" className="m-0">
        <Modal.Header className="d-flex justify-content-center align-items-center border-0 pb-2">
          <Alert.Heading className="m-0 fs-2">Modify Tweet</Alert.Heading>
        </Modal.Header>
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
            deletePhotoClicked={deletePhotoClicked}
            handleDeletePhotoClicked={handleDeletePhotoClicked}
          />
          <ModifyReset
            resetMessageButton={resetMessageButton}
            resetPhotoButton={resetPhotoButton}
          />
        </Modal.Body>
        <Modal.Footer className="border-0 pt-0 p-3">
          <Button
            type="submit"
            variant="primary w-100 m-0 mb-3"
            {...(!isNewMessage ? { disabled: true } : { disabled: false })}
          >
            {isLoading ? "Modifying..." : "Modify"}
          </Button>
          <Button
            variant="outline-dark w-100 m-0"
            onClick={handleCloseModifyModal}
          >
            Close
          </Button>
        </Modal.Footer>
      </Alert>
    </Form>
  );
}
