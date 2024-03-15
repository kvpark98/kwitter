import { Form } from "react-bootstrap";
import ModifyProfileBackgroundPreview from "./modify-profile-background-preview";
import ModifyProfileBackgroundAdd from "./modify-profile-background-add";
import ModifyProfileBackgroundRemoveDelete from "./modify-profile-background-remove-delete";

export interface ModifyProfileBackgroundProps {
  backgroundInputRef: React.RefObject<HTMLInputElement>;
  background: string;
  backgroundImagePreviewUrl: string;
  handleBackgroundImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  resetBackground: () => void;
  handleDeleteBackground: () => Promise<void>;
}

export default function ModifyProfileBackground({
  backgroundInputRef,
  background,
  backgroundImagePreviewUrl,
  handleBackgroundImage,
  resetBackground,
  handleDeleteBackground,
}: ModifyProfileBackgroundProps) {
  return (
    <div className="position-relative">
      <ModifyProfileBackgroundPreview
        background={background}
        backgroundImagePreviewUrl={backgroundImagePreviewUrl}
      />
      <ModifyProfileBackgroundAdd />
      <ModifyProfileBackgroundRemoveDelete
        backgroundImagePreviewUrl={backgroundImagePreviewUrl}
        resetBackground={resetBackground}
        handleDeleteBackground={handleDeleteBackground}
      />
      <Form.Control
        ref={backgroundInputRef}
        onChange={handleBackgroundImage}
        id="background"
        type="file"
        accept="image/*"
        className="d-none"
      ></Form.Control>
    </div>
  );
}
