import { Modal } from "react-bootstrap";
import ChangeUsernameSuccess from "../../alert/success/auth/change-username/change-username-success";
import ChangeUsernameErrors from "../../alert/error/auth/change-username/change-username-errors";
import ChangeUsernameName from "./change-username-name";
import ChangeUsernameReset from "./change-username-reset";

export interface ChangeUsernameBodyProps {
  nameInputRef: React.RefObject<HTMLInputElement>;
  error: string;
  name: string;
  handleName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isName: boolean;
  nameErrorMessage: string;
  noSpace: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  reset: () => void;
  isUpdated: boolean;
}

export default function ChangeUsernameBody({
  nameInputRef,
  error,
  name,
  handleName,
  isName,
  nameErrorMessage,
  noSpace,
  reset,
  isUpdated,
}: ChangeUsernameBodyProps) {
  return (
    <Modal.Body>
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
      <ChangeUsernameReset reset={reset} />
    </Modal.Body>
  );
}
