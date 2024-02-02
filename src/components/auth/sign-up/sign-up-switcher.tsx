import { Button } from "react-bootstrap";
import { Switcher } from "../../styles/auth-components";
import { Link } from "react-router-dom";

export interface SignUpSwitcherProps {
  reset: () => void;
}

export default function SignUpSwitcher({ reset }: SignUpSwitcherProps) {
  return (
    <Switcher className="d-flex justify-content-between">
      <Button onClick={reset} type="button" variant="outline-info">
        Reset
      </Button>
      <Link to="/sign-in" className="btn btn-outline-success">
        Sign In
      </Link>
    </Switcher>
  );
}
