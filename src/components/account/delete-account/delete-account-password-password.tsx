import { Form } from "react-bootstrap";
import DeleteAccountPasswordType from "./delete-account-password-type";

export interface DeleteAccountPasswordPasswordProps {
  deletePasswordInputType: boolean;
  changeDeletePasswordType: () => void;
  deletePassword: string;
  handleDeletePassword: (event: React.ChangeEvent<HTMLInputElement>) => void;
  noSpace: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function DeleteAccountPasswordPassword({
  deletePasswordInputType,
  changeDeletePasswordType,
  deletePassword,
  handleDeletePassword,
  noSpace,
}: DeleteAccountPasswordPasswordProps) {
  return (
    <Form.Group>
      <div className="d-flex align-items-center mb-2">
        <Form.Label htmlFor="password" className="m-0">
          Kindly input your password for a secure account withdrawal.
        </Form.Label>
        <DeleteAccountPasswordType
          deletePasswordInputType={deletePasswordInputType}
          changeDeletePasswordType={changeDeletePasswordType}
        />
      </div>
      <Form.Control
        className="border-none mt-1 mb-1 rounded-pill"
        onChange={handleDeletePassword}
        onKeyDown={noSpace}
        id="password"
        name="password"
        value={deletePassword}
        type={deletePasswordInputType ? "text" : "password"}
        maxLength={20}
        autoComplete="password"
      />
    </Form.Group>
  );
}
