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
    <div className="d-flex justify-content-between">
      <div className="d-flex">
        <ModifyButtonPhoto
          newFileInputRef={newFileInputRef}
          handleNewFile={handleNewFile}
        />
        <ModifyButtonReset resetMessageButton={resetMessageButton} />
      </div>
      <div>
        <ModifyButtonSubmit isLoading={isLoading} isNewMessage={isNewMessage} />
      </div>
    </div>
  );
}
