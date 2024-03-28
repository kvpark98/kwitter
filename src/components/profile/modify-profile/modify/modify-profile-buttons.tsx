import { Container, Navbar } from "react-bootstrap";
import ModifyProfileReset from "./modify-profile-reset";
import ModifyProfileSubmit from "./modify-profile-submit";

export interface ModifyProfileButtonsProps {
  isLoading: boolean;
  isName: boolean;
  resetName: () => void;
}

export default function ModifyProfileButtons({
  isLoading,
  isName,
  resetName,
}: ModifyProfileButtonsProps) {
  return (
    <Navbar className="flex-fill rounded-bottom bg-body-light border-top">
      <Container className="d-flex">
        <div className="d-flex justify-content-between w-100">
          <div className="d-flex">
            <ModifyProfileReset resetName={resetName} />
          </div>
          <div>
            <ModifyProfileSubmit isLoading={isLoading} isName={isName} />
          </div>
        </div>
      </Container>
    </Navbar>
  );
}
