import AccountBack from "./account-back";

export interface AccountTitleProps {
  back: () => void;
}

export default function AccountTitle({ back }: AccountTitleProps) {
  return (
    <div className="d-flex justify-content-between align-items-center pt-4">
      <h1 className="fs-2">Account</h1>
      <AccountBack back={back} />
    </div>
  );
}
