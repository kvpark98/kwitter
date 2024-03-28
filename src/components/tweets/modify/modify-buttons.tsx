import { Container, Navbar } from "react-bootstrap";
import ModifyButtonPhoto from "./modify-button-photo.tsx";
import ModifyButtonReset from "./modify-button-reset.tsx";
import ModifyButtonSubmit from "./modify-button-submit.tsx";

export interface ModifyButtonsProps {
  isLoading: boolean;
  isNewMessage: boolean;
  newFileInputRef: React.RefObject<HTMLInputElement>;
  handleNewFile: (event: React.ChangeEvent<HTMLInputElement>) => void;
  resetMessageButton: () => void;
}

export default function ModifyButtons({
  isLoading,
  isNewMessage,
  newFileInputRef,
  handleNewFile,
  resetMessageButton,
}: ModifyButtonsProps) {
  return (
    <Navbar className="flex-fill rounded-bottom bg-body-light border-top">
      <Container className="d-flex">
        <div className="d-flex justify-content-between w-100">
          <div className="d-flex">
            <ModifyButtonPhoto
              newFileInputRef={newFileInputRef}
              handleNewFile={handleNewFile}
            />
            <ModifyButtonReset resetMessageButton={resetMessageButton} />
          </div>
          <div>
            <ModifyButtonSubmit
              isLoading={isLoading}
              isNewMessage={isNewMessage}
            />
          </div>
        </div>
      </Container>
    </Navbar>
  );
}
