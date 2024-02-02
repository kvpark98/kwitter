import { Button } from "react-bootstrap";
import { Switcher } from "../../styles/auth-components";
import { Link } from "react-router-dom";

export interface SignInSwitcherProps {
  reset: () => void;
}

export default function SignInSwitcher({ reset }: SignInSwitcherProps) {
  return (
    <Switcher className="d-flex justify-content-between">
      <Button onClick={reset} type="button" variant="outline-info">
        Reset
      </Button>
      <Link to="/sign-up" className="btn btn-outline-success">
        Sign Up
      </Link>
    </Switcher>
  );
}
