import { Alert, Form } from "react-bootstrap";
import SignInWithEmailSuccess from "../../alert/success/auth/reset-password/sign-in-with-email-success";
import ResetPasswordPassword from "./reset-password-password";
import ResetPasswordPasswordConfirm from "./reset-password-password-confirm.tsx";
import ResetPasswordFooter from "./reset-password-footer.tsx";

export interface ResetPasswordFormProps {
  passwordInputRef: React.RefObject<HTMLInputElement>;
  passwordConfirmInputRef: React.RefObject<HTMLInputElement>;
  isLoading: boolean;
  password: string;
  handlePassword: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isPassword: boolean;
  passwordErrorMessage: string;
  passwordConfirm: string;
  handlePasswordConfirm: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isPasswordConfirm: boolean;
  passwordConfirmErrorMessage: string;
  noSpace: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  reset: () => void;
  resetPassword: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

export default function ResetPasswordForm({
  passwordInputRef,
  passwordConfirmInputRef,
  isLoading,
  password,
  handlePassword,
  isPassword,
  passwordErrorMessage,
  passwordConfirm,
  handlePasswordConfirm,
  isPasswordConfirm,
  passwordConfirmErrorMessage,
  noSpace,
  reset,
  resetPassword,
}: ResetPasswordFormProps) {
  return (
    <Form onSubmit={resetPassword}>
      <Alert
        variant="light"
        className="d-flex flex-column row-gap-3 border-0 m-0 p-4 w-100"
      >
        {window.sessionStorage.getItem("isSignedInWithEmail") && (
          <SignInWithEmailSuccess />
        )}
        <ResetPasswordPassword
          passwordInputRef={passwordInputRef}
          password={password}
          handlePassword={handlePassword}
          isPassword={isPassword}
          passwordErrorMessage={passwordErrorMessage}
          noSpace={noSpace}
        />
        <ResetPasswordPasswordConfirm
          passwordConfirmInputRef={passwordConfirmInputRef}
          passwordConfirm={passwordConfirm}
          handlePasswordConfirm={handlePasswordConfirm}
          isPassword={isPassword}
          isPasswordConfirm={isPasswordConfirm}
          passwordConfirmErrorMessage={passwordConfirmErrorMessage}
          noSpace={noSpace}
        />
      </Alert>
      <ResetPasswordFooter
        isLoading={isLoading}
        isPassword={isPassword}
        isPasswordConfirm={isPasswordConfirm}
        reset={reset}
      />
    </Form>
  );
}
