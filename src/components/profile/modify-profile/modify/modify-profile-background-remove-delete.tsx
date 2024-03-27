import ModifyProfileBackgroundDelete from "./modify-profile-background-delete";
import ModifyProfileBackgroundRemove from "./modify-profile-background-remove";

export interface ModifyProfileBackgroundRemoveDeleteProps {
  backgroundImagePreviewUrl: string;
  resetBackground: () => void;
  handleDeleteBackground: () => Promise<void>;
}

export default function ModifyProfileBackgroundRemoveDelete({
  backgroundImagePreviewUrl,
  resetBackground,
  handleDeleteBackground,
}: ModifyProfileBackgroundRemoveDeleteProps) {
  return (
    <div>
      {backgroundImagePreviewUrl ? (
        <ModifyProfileBackgroundRemove resetBackground={resetBackground} />
      ) : (
        <ModifyProfileBackgroundDelete
          handleDeleteBackground={handleDeleteBackground}
        />
      )}
    </div>
  );
}
