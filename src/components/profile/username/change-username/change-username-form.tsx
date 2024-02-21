import { Alert, Form } from "react-bootstrap";
import ChangeUsernameFooter from "./change-username-footer";
import ChangeUsernameHeader from "./change-username-header";
import ChangeUsernameBody from "./change-username-body";

export interface ChangeUsernameFormProps {
  nameInputRef: React.RefObject<HTMLInputElement>;
  isLoading: boolean;
  error: string;
  name: string | null | undefined;
  handleName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isName: boolean;
  nameErrorMessage: string;
  noSpace: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  reset: () => void;
  changeName: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  isUpdated: boolean;
  handleCloseModifyModal: () => void;
}

export default function ChangeUsernameForm({
  nameInputRef,
  isLoading,
  error,
  name,
  handleName,
  isName,
  nameErrorMessage,
  noSpace,
  reset,
  changeName,
  isUpdated,
  handleCloseModifyModal,
}: ChangeUsernameFormProps) {
  return (
    <Form className="w-100" onSubmit={changeName}>
      <Alert variant="light" className="m-0">
        <ChangeUsernameHeader />
        <ChangeUsernameBody
          nameInputRef={nameInputRef}
          error={error}
          name={name}
          handleName={handleName}
          isName={isName}
          nameErrorMessage={nameErrorMessage}
          noSpace={noSpace}
          reset={reset}
          isUpdated={isUpdated}
        />
        <ChangeUsernameFooter
          isLoading={isLoading}
          isName={isName}
          handleCloseModifyModal={handleCloseModifyModal}
        />
      </Alert>
    </Form>
  );
}
