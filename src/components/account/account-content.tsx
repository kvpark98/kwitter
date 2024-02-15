import AccountChangeUsername from "./account-change-username";
import AccountChangePassword from "./account-change-password";
import AccountDeleteAccount from "./account-delete-account";

export default function AccountContent() {
  return (
    <div className="mt-5">
      <AccountChangeUsername />
      <AccountChangePassword />
      <AccountDeleteAccount />
    </div>
  );
}
