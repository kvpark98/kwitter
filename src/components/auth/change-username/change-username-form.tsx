import { Alert, Form } from "react-bootstrap";
import ChangeUsernameErrors from "../../alert/error/auth/change-username/change-username-errors";
import ChangeUsernameSuccess from "../../alert/success/auth/change-username/change-username-success";
import { Wrapper } from "../../styles/auth-components";
import ChangeUsernameButton from "./change-username-button";
import ChangeUsernameSwitcher from "./change-username-switcher";
import ChangeUsernameName from "./change-username-name";

export interface ChangeUsernameFormProps {
  nameInputRef: React.RefObject<HTMLInputElement>;
  isLoading: boolean;
  error: string;
  name: string;
  handleName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isName: boolean;
  nameErrorMessage: string;
  noSpace: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  reset: () => void;
  goBack: () => void;
  changeName: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  isUpdated: boolean;
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
  goBack,
  changeName,
  isUpdated,
}: ChangeUsernameFormProps) {
  return (
    <Wrapper>
      <h1 className="fs-2 mb-2">Change Username</h1>
      {isUpdated && !error && <ChangeUsernameSuccess />}
      {error && <ChangeUsernameErrors error={error} />}
      <Alert variant="light" className="mt-3 px-4 py-4 w-100">
        <Form onSubmit={changeName} className="d-flex flex-column row-gap-3">
          <ChangeUsernameName
            nameInputRef={nameInputRef}
            name={name}
            handleName={handleName}
            isName={isName}
            nameErrorMessage={nameErrorMessage}
            noSpace={noSpace}
          />
          <ChangeUsernameButton isLoading={isLoading} isName={isName} />
        </Form>
        <ChangeUsernameSwitcher reset={reset} goBack={goBack} />
      </Alert>
    </Wrapper>
  );
}
