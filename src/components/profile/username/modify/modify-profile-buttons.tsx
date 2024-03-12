import ModifyProfileReset from "./modify-profile-reset";
import ModifyProfileClose from "./modify-profile-close";
import ModifyProfileSubmit from "./modify-profile-submit";

export interface ModifyProfileButtonsProps {
  isLoading: boolean;
  isName: boolean;
  resetName: () => void;
  handleCloseModifyModal: () => void;
}

export default function ModifyProfileButtons({
  isLoading,
  isName,
  resetName,
  handleCloseModifyModal,
}: ModifyProfileButtonsProps) {
  return (
    <div className="d-flex justify-content-between mt-4">
      <div className="d-flex">
        <ModifyProfileReset resetName={resetName} />
      </div>
      <div>
        <ModifyProfileClose handleCloseModifyModal={handleCloseModifyModal} />
        <ModifyProfileSubmit isLoading={isLoading} isName={isName} />
      </div>
    </div>
  );
}
