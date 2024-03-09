import { Form } from "react-bootstrap";

export interface ChangeUsernameNameProps {
  nameInputRef: React.RefObject<HTMLInputElement>;
  name: string | null | undefined;
  handleName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isName: boolean;
  nameErrorMessage: string;
  noSpace: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function ChangeUsernameName({
  nameInputRef,
  name,
  handleName,
  isName,
  nameErrorMessage,
  noSpace,
}: ChangeUsernameNameProps) {
  return (
    <Form.Group className="pt-5">
      <Form.Label htmlFor="name">Username</Form.Label>
      <Form.Control
        ref={nameInputRef}
        className="border-none mt-1 mb-1"
        onChange={handleName}
        onKeyDown={noSpace}
        id="name"
        name="name"
        value={name!}
        type="text"
        maxLength={20}
      />
      {!isName && nameErrorMessage && (
        <div className="mt-2 text-danger">{nameErrorMessage}</div>
      )}
    </Form.Group>
  );
}
