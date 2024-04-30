import { Alert } from "react-bootstrap";
import DeleteAccountPasswordPassword from "./delete-account-password-password";

export interface DeleteAccountPasswordInputProps {
  deletePassword: string;
  handleDeletePassword: (event: React.ChangeEvent<HTMLInputElement>) => void;
  noSpace: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function DeleteAccountPasswordInput({
  deletePassword,
  handleDeletePassword,
  noSpace,
}: DeleteAccountPasswordInputProps) {
  return (
    <Alert variant="light" className="mt-4 mb-0 p-4 w-100">
      <DeleteAccountPasswordPassword
        deletePassword={deletePassword}
        handleDeletePassword={handleDeletePassword}
        noSpace={noSpace}
      />
    </Alert>
  );
}
