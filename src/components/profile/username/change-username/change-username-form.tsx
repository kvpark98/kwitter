import { Alert, Form } from "react-bootstrap";
import ChangeUsernameName from "./change-username-name";
import ChangeUsernameErrors from "../../../alert/error/auth/change-username/change-username-errors";
import ChangeUsernameSuccess from "../../../alert/success/auth/change-username/change-username-success";
import ChangeUsernameButtons from "./change-username-buttons";

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
      <Alert variant="light" className="m-0 p-4">
        {isUpdated && !error && <ChangeUsernameSuccess />}
        {error && <ChangeUsernameErrors error={error} />}
        <ChangeUsernameName
          nameInputRef={nameInputRef}
          name={name}
          handleName={handleName}
          isName={isName}
          nameErrorMessage={nameErrorMessage}
          noSpace={noSpace}
        />
        <ChangeUsernameButtons
          isLoading={isLoading}
          isName={isName}
          reset={reset}
          handleCloseModifyModal={handleCloseModifyModal}
        />
      </Alert>
    </Form>
  );
}
