import CreateButtonClose from "./create-button-close.tsx";
import CreateButtonPhoto from "./create-button-photo.tsx";
import CreateButtonReset from "./create-button-reset.tsx";
import CreateButtonSubmit from "./create-button-submit.tsx.tsx";

export interface CreateButtonsProps {
  isLoading: boolean;
  isMessage: boolean;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleFile: (event: React.ChangeEvent<HTMLInputElement>) => void;
  resetMessageButton: () => void;
  handleCloseCreateModal: () => void;
}

export default function CreateButtons({
  isLoading,
  isMessage,
  fileInputRef,
  handleFile,
  resetMessageButton,
  handleCloseCreateModal,
}: CreateButtonsProps) {
  return (
    <div className="d-flex justify-content-between">
      <div className="d-flex">
        <CreateButtonPhoto
          fileInputRef={fileInputRef}
          handleFile={handleFile}
        />
        <CreateButtonReset resetMessageButton={resetMessageButton} />
      </div>
      <div>
        <CreateButtonClose handleCloseCreateModal={handleCloseCreateModal} />
        <CreateButtonSubmit isLoading={isLoading} isMessage={isMessage} />
      </div>
    </div>
  );
}
