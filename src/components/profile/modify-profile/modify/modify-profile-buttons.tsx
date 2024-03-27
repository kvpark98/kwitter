import React from "react";
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
    <div className="d-flex justify-content-between mt-4">
      <div className="d-flex">
        <ModifyProfileReset resetName={resetName} />
      </div>
      <div>
        <ModifyProfileSubmit isLoading={isLoading} isName={isName} />
      </div>
    </div>
  );
}
