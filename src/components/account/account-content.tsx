import { ListGroup } from "react-bootstrap";
import AccountChangePassword from "./account-change-password";
import AccountDeleteAccount from "./account-delete-account";
import Header from "../header/header";

export interface AccountContentProps {
  handleShowChangePasswordModal: () => void;
  handleShowDeleteAccountModal: () => void;
}

export default function AccountContent({
  handleShowChangePasswordModal,
  handleShowDeleteAccountModal,
}: AccountContentProps) {
  return (
    <div className="overflow-y-auto bg-light h-100" style={{ width: "700px" }}>
      <Header />
      <ListGroup>
        <AccountChangePassword
          handleShowChangePasswordModal={handleShowChangePasswordModal}
        />
        <AccountDeleteAccount
          handleShowDeleteAccountModal={handleShowDeleteAccountModal}
        />
      </ListGroup>
    </div>
  );
}
