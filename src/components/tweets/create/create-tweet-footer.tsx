import { Container, Navbar } from "react-bootstrap";
import CreateButtonPhoto from "./create-button-photo.tsx";
import CreateButtonReset from "./create-button-reset.tsx";
import CreateButtonSubmit from "./create-button-submit.tsx";

export interface CreateTweetFooterProps {
  isLoading: boolean;
  isMessage: boolean;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleFile: (event: React.ChangeEvent<HTMLInputElement>) => void;
  resetMessageButton: () => void;
}

export default function CreateTweetFooter({
  isLoading,
  isMessage,
  fileInputRef,
  handleFile,
  resetMessageButton,
}: CreateTweetFooterProps) {
  return (
    <Navbar className="flex-fill rounded-bottom bg-body-light border-top">
      <Container className="d-flex">
        <div className="d-flex justify-content-between w-100">
          <div className="d-flex">
            <CreateButtonPhoto
              fileInputRef={fileInputRef}
              handleFile={handleFile}
            />
            <CreateButtonReset resetMessageButton={resetMessageButton} />
          </div>
          <div>
            <CreateButtonSubmit isLoading={isLoading} isMessage={isMessage} />
          </div>
        </div>
      </Container>
    </Navbar>
  );
}
