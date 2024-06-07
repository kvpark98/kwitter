import { Alert } from "react-bootstrap";
import DeleteAccountPasswordPassword from "./delete-account-password-password";

export interface DeleteAccountPasswordInputProps {
  deletePasswordInputType: boolean;
  changeDeletePasswordType: () => void;
  deletePassword: string;
  handleDeletePassword: (event: React.ChangeEvent<HTMLInputElement>) => void;
  noSpace: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function DeleteAccountPasswordInput({
  deletePasswordInputType,
  changeDeletePasswordType,
  deletePassword,
  handleDeletePassword,
  noSpace,
}: DeleteAccountPasswordInputProps) {
  return (
    <Alert variant="light" className="mt-4 mb-0 p-4 w-100">
      <DeleteAccountPasswordPassword
        deletePasswordInputType={deletePasswordInputType}
        changeDeletePasswordType={changeDeletePasswordType}
        deletePassword={deletePassword}
        handleDeletePassword={handleDeletePassword}
        noSpace={noSpace}
      />
    </Alert>
  );
}
