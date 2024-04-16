import ModifyProfileBackgroundDelete from "./modify-profile-background-delete";
import ModifyProfileBackgroundRemove from "./modify-profile-background-remove";

export interface ModifyProfileBackgroundRemoveDeleteProps {
  defaultBackgroundURL: "/default-background.png";
  background: string;
  backgroundImagePreviewUrl: string;
  backgroundDeleteButtonClicked: boolean;
  resetBackground: () => void;
  handleDeleteBackground: () => void;
}

export default function ModifyProfileBackgroundRemoveDelete({
  defaultBackgroundURL,
  background,
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
        background &&
        background !== defaultBackgroundURL &&
        !backgroundDeleteButtonClicked && (
          <ModifyProfileBackgroundDelete
            handleDeleteBackground={handleDeleteBackground}
          />
        )
      )}
    </div>
  );
}
