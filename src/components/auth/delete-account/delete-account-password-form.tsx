import { Alert, Form } from "react-bootstrap";
import DeleteAccountPasswordButton from "./delete-account-password-button";
import DeleteAccountPasswordPassword from "./delete-account-password-password";
import DeleteAccountPasswordSwitcher from "./delete-account-password-switcher";

export interface DeleteAccountPasswordFormProps {
  isLoading: boolean;
  password: string;
  handlePassword: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isPassword: boolean;
  noSpace: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  reset: () => void;
  deleteAccount: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

export default function DeleteAccountPasswordForm({
  isLoading,
  password,
  handlePassword,
  isPassword,
  noSpace,
  reset,
  deleteAccount,
}: DeleteAccountPasswordFormProps) {
  return (
    <Alert variant="light" className="mt-3 px-4 py-4 w-100">
      <Form onSubmit={deleteAccount} className="d-flex flex-column row-gap-3">
        <DeleteAccountPasswordPassword
          password={password}
          handlePassword={handlePassword}
          noSpace={noSpace}
        />
        <DeleteAccountPasswordButton
          isLoading={isLoading}
          isPassword={isPassword}
        />
      </Form>
      <DeleteAccountPasswordSwitcher reset={reset} />
    </Alert>
  );
}
