import ModifyProfileBackgroundDelete from "./modify-profile-background-delete";
import ModifyProfileBackgroundRemove from "./modify-profile-background-remove";

export interface ModifyProfileBackgroundRemoveDeleteProps {
  backgroundImagePreviewUrl: string;
  backgroundDeleteButtonClicked: boolean;
  resetBackground: () => void;
  handleDeleteBackground: () => void;
}

export default function ModifyProfileBackgroundRemoveDelete({
  backgroundImagePreviewUrl,
  backgroundDeleteButtonClicked,
  resetBackground,
  handleDeleteBackground,
}: ModifyProfileBackgroundRemoveDeleteProps) {
  return (
    <div>
      {backgroundImagePreviewUrl ? (
        <ModifyProfileBackgroundRemove resetBackground={resetBackground} />
      ) : (
        !backgroundDeleteButtonClicked && (
          <ModifyProfileBackgroundDelete
            handleDeleteBackground={handleDeleteBackground}
          />
        )
      )}
    </div>
  );
}
