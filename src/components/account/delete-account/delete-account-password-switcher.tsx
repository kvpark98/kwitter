import { Button } from "react-bootstrap";
import { Switcher } from "../../styles/auth-components";
import { Link } from "react-router-dom";

export interface DeleteAccountPasswordSwitcherProps {
  resetDeletePassword: () => void;
}

export default function DeleteAccountPasswordSwitcher({
  resetDeletePassword,
}: DeleteAccountPasswordSwitcherProps) {
  return (
    <Switcher className="d-flex justify-content-between">
      <Button
        onClick={resetDeletePassword}
        type="button"
        variant="outline-info"
      >
        Reset
      </Button>
      <Link to="/" className="btn btn-outline-success">
        Home
      </Link>
    </Switcher>
  );
}
