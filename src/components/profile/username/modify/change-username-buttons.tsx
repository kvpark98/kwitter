import ChangeUsernameReset from "./change-username-reset";
import ChangeUsernameClose from "./change-username-close";
import ChangeUsernameSubmit from "./change-username-submit";

export interface ChangeUsernameButtonsProps {
  isLoading: boolean;
  isName: boolean;
  reset: () => void;
  handleCloseModifyModal: () => void;
}

export default function ChangeUsernameButtons({
  isLoading,
  isName,
  reset,
  handleCloseModifyModal,
}: ChangeUsernameButtonsProps) {
  return (
    <div className="d-flex justify-content-between mt-4">
      <div className="d-flex">
        <ChangeUsernameReset reset={reset} />
      </div>
      <div>
        <ChangeUsernameClose handleCloseModifyModal={handleCloseModifyModal} />
        <ChangeUsernameSubmit isLoading={isLoading} isName={isName} />
      </div>
    </div>
  );
}
