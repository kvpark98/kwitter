import { Container, Navbar } from "react-bootstrap";
import ResetPasswordReset from "./reset-password-reset";
import ResetPasswordSubmit from "./reset-password-submit";

export interface ResetPasswordFooterProps {
  isLoading: boolean;
  isPassword: boolean;
  isPasswordConfirm: boolean;
  reset: () => void;
}

export default function ResetPasswordFooter({
  isLoading,
  isPassword,
  isPasswordConfirm,
  reset,
}: ResetPasswordFooterProps) {
  return (
    <Navbar className="flex-fill rounded-bottom bg-body-light border-top">
      <Container className="d-flex">
        <div className="d-flex justify-content-between w-100">
          <ResetPasswordReset reset={reset} />
          <ResetPasswordSubmit
            isLoading={isLoading}
            isPassword={isPassword}
            isPasswordConfirm={isPasswordConfirm}
          />
        </div>
      </Container>
    </Navbar>
  );
}
