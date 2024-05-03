import { Navbar } from "react-bootstrap";
import AccountBack from "./account-back";
import AccountTitle from "./account-title";

export interface AccountHeaderProps {
  back: () => void;
}

export default function AccountHeader({ back }: AccountHeaderProps) {
  return (
    <Navbar bg="dark" className="d-flex align-items-center">
      <AccountBack back={back} />
      <AccountTitle />
    </Navbar>
  );
}
