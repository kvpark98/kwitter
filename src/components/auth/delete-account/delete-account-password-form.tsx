import { Alert, Form } from "react-bootstrap";
import DeleteAccountPasswordFormPassword from "./delete-account-password-form-password";
import DeleteAccountPasswordFormButton from "./delete-account-password-form-button";
import DeleteAccountPasswordFormSwitcher from "./delete-account-password-form-switcher";

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
        <DeleteAccountPasswordFormPassword
          password={password}
          handlePassword={handlePassword}
          noSpace={noSpace}
        />
        <DeleteAccountPasswordFormButton
          isLoading={isLoading}
          isPassword={isPassword}
        />
      </Form>
      <DeleteAccountPasswordFormSwitcher reset={reset} />
    </Alert>
  );
}
