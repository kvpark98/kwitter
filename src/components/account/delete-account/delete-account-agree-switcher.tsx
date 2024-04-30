import { Button } from "react-bootstrap";
import { Switcher } from "../../styles/auth-components";

export interface DeleteAccountAgreeSwitcherProps {
  back: () => void;
}

export default function DeleteAccountAgreeSwitcher({
  back,
}: DeleteAccountAgreeSwitcherProps) {
  return (
    <Switcher className="d-flex justify-content-end">
      <Button onClick={back} type="button" variant="outline-success">
        Back
      </Button>
    </Switcher>
  );
}
