import { ListGroup } from "react-bootstrap";
import AccountChangePassword from "./account-change-password";
import AccountDeleteAccount from "./account-delete-account";

export interface AccountContentProps {
  handleShowChangePasswordModal: () => void;
}

export default function AccountContent({
  handleShowChangePasswordModal,
}: AccountContentProps) {
  return (
    <ListGroup className="mt-5">
      <AccountChangePassword
        handleShowChangePasswordModal={handleShowChangePasswordModal}
      />
      <AccountDeleteAccount
        handleShowChangePasswordModal={handleShowChangePasswordModal}
      />
    </ListGroup>
  );
}
