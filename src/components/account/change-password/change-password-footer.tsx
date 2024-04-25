import { Container, Navbar } from "react-bootstrap";
import ChangePasswordButton from "./change-password-button";
import ChangePasswordReset from "./change-password-reset";

export interface ChangePasswordFooterProps {
  isLoading: boolean;
  isCurrentPassword: boolean;
  isNewPassword: boolean;
  isNewPasswordConfirm: boolean;
  reset: () => void;
}

export default function ChangePasswordFooter({
  isLoading,
  isCurrentPassword,
  isNewPassword,
  isNewPasswordConfirm,
  reset,
}: ChangePasswordFooterProps) {
  return (
    <Navbar className="flex-fill rounded-bottom bg-body-light border-top">
      <Container className="d-flex">
        <div className="d-flex justify-content-between w-100">
          <ChangePasswordReset reset={reset} />
          <ChangePasswordButton
            isLoading={isLoading}
            isCurrentPassword={isCurrentPassword}
            isNewPassword={isNewPassword}
            isNewPasswordConfirm={isNewPasswordConfirm}
          />
        </div>
      </Container>
    </Navbar>
  );
}
