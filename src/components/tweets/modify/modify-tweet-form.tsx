import { Alert, Form } from "react-bootstrap";
import ModifyFooter from "./modify-footer";
import ModifyBody from "./modify-body";

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
  deletePhotoChecked: boolean;
  handleDeletePhotoChecked: () => void;
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
  deletePhotoChecked,
  handleDeletePhotoChecked,
  resetMessageButton,
  resetPhotoButton,
  modifyTweet,
  tweetModified,
  handleCloseModifyModal,
}: ModifyTweetFormProps) {
  return (
    <Form className="w-100" onSubmit={modifyTweet}>
      <Alert variant="light" className="m-0">
        <ModifyBody
          error={error}
          newFileInputRef={newFileInputRef}
          newMessage={newMessage}
          handleNewMessage={handleNewMessage}
          newFile={newFile}
          handleNewFile={handleNewFile}
          photo={photo}
          deletePhotoChecked={deletePhotoChecked}
          handleDeletePhotoChecked={handleDeletePhotoChecked}
          resetMessageButton={resetMessageButton}
          resetPhotoButton={resetPhotoButton}
          tweetModified={tweetModified}
        />
        <ModifyFooter
          isLoading={isLoading}
          isNewMessage={isNewMessage}
          handleCloseModifyModal={handleCloseModifyModal}
        />
      </Alert>
    </Form>
  );
}
