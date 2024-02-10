import { Button } from "react-bootstrap";
import { Switcher } from "../../styles/auth-components";

export interface ChangePasswordSwitcherProps {
  reset: () => void;
  goBack: () => void;
}

export default function ChangePasswordSwitcher({
  reset,
  goBack,
}: ChangePasswordSwitcherProps) {
  return (
    <Switcher className="d-flex justify-content-between">
      <Button onClick={reset} type="button" variant="outline-info">
        Reset
      </Button>
      <Button onClick={goBack} type="button" variant="outline-success">
        Back
      </Button>
    </Switcher>
  );
}
