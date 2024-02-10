import { Button } from "react-bootstrap";
import { Switcher } from "../../styles/auth-components";

export interface ResetPasswordSwitcherProps {
  reset: () => void;
  handleShowModal: () => void;
}

export default function ResetPasswordSwitcher({
  reset,
  handleShowModal,
}: ResetPasswordSwitcherProps) {
  return (
    <Switcher className="d-flex justify-content-between">
      <Button onClick={reset} type="button" variant="outline-info">
        Reset
      </Button>
      <Button variant="outline-success" onClick={handleShowModal}>
        Home
      </Button>
    </Switcher>
  );
}
