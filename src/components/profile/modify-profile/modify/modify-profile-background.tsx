import { Form } from "react-bootstrap";
import ModifyProfileBackgroundPreview from "./modify-profile-background-preview";
import ModifyProfileBackgroundAdd from "./modify-profile-background-add";
import ModifyProfileBackgroundRemoveDelete from "./modify-profile-background-remove-delete";
import React from "react";

export interface ModifyProfileBackgroundProps {
  backgroundInputRef: React.RefObject<HTMLInputElement>;
  backgroundImageRef: React.RefObject<HTMLImageElement>;
  background: string;
  backgroundImagePreviewUrl: string;
  handleBackgroundImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  backgroundDeleteButtonClicked: boolean;
  resetBackground: () => void;
  handleDeleteBackground: () => void;
}

export default function ModifyProfileBackground({
  backgroundInputRef,
  backgroundImageRef,
  background,
  backgroundImagePreviewUrl,
  handleBackgroundImage,
  backgroundDeleteButtonClicked,
  resetBackground,
  handleDeleteBackground,
}: ModifyProfileBackgroundProps) {
  return (
    <div className="position-relative">
      <ModifyProfileBackgroundPreview
        backgroundImageRef={backgroundImageRef}
        background={background}
        backgroundImagePreviewUrl={backgroundImagePreviewUrl}
      />
      <ModifyProfileBackgroundAdd />
      <ModifyProfileBackgroundRemoveDelete
        backgroundImagePreviewUrl={backgroundImagePreviewUrl}
        backgroundDeleteButtonClicked={backgroundDeleteButtonClicked}
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
