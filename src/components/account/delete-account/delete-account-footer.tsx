import { Container, Navbar } from "react-bootstrap";
import DeleteAccountPasswordButton from "./delete-account-password-button";
import DeleteAccountResetButton from "./delete-account-reset-button";

export interface DeleteAccountFooterProps {
  isLoading: boolean;
  isDeletePassword: boolean;
  resetDeletePassword: () => void;
}

export default function DeleteAccountFooter({
  isLoading,
  isDeletePassword,
  resetDeletePassword,
}: DeleteAccountFooterProps) {
  return (
    <Navbar className="flex-fill rounded-bottom bg-body-light border-top">
      <Container className="d-flex">
        <div className="d-flex justify-content-between w-100">
          <DeleteAccountResetButton resetDeletePassword={resetDeletePassword} />
          <DeleteAccountPasswordButton
            isLoading={isLoading}
            isDeletePassword={isDeletePassword}
          />
        </div>
      </Container>
    </Navbar>
  );
}
