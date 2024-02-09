import { Button } from "react-bootstrap";
import { Switcher } from "../../styles/auth-components";

export interface DeleteAccountAgreeSwitcherProps {
  goBack: () => void;
}

export default function DeleteAccountAgreeSwitcher({
  goBack,
}: DeleteAccountAgreeSwitcherProps) {
  return (
    <Switcher className="d-flex justify-content-end">
      <Button onClick={goBack} type="button" variant="outline-success">
        Back
      </Button>
    </Switcher>
  );
}
