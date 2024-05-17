import { Container, Navbar } from "react-bootstrap";
import DeleteAccountPasswordSubmit from "./delete-account-password-submit";
import DeleteAccountReset from "./delete-account-reset";

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
          <DeleteAccountReset resetDeletePassword={resetDeletePassword} />
          <DeleteAccountPasswordSubmit
            isLoading={isLoading}
            isDeletePassword={isDeletePassword}
          />
        </div>
      </Container>
    </Navbar>
  );
}
