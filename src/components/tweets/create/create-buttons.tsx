import CreateButtonPhoto from "./create-button-photo.tsx";
import CreateButtonReset from "./create-button-reset.tsx";
import CreateButtonSubmit from "./create-button-submit.tsx";

export interface CreateButtonsProps {
  isLoading: boolean;
  isMessage: boolean;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleFile: (event: React.ChangeEvent<HTMLInputElement>) => void;
  resetMessageButton: () => void;
}

export default function CreateButtons({
  isLoading,
  isMessage,
  fileInputRef,
  handleFile,
  resetMessageButton,
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
        <CreateButtonSubmit isLoading={isLoading} isMessage={isMessage} />
      </div>
    </div>
  );
}
