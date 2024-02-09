import { Button } from "react-bootstrap";
import { Switcher } from "../../styles/auth-components";
import { Link } from "react-router-dom";

export interface DeleteAccountPasswordFormSwitcherProps {
  reset: () => void;
}

export default function DeleteAccountPasswordFormSwitcher({
  reset,
}: DeleteAccountPasswordFormSwitcherProps) {
  return (
    <Switcher className="d-flex justify-content-between">
      <Button onClick={reset} type="button" variant="outline-info">
        Reset
      </Button>
      <Link to="/" className="btn btn-outline-success">
        Home
      </Link>
    </Switcher>
  );
}
