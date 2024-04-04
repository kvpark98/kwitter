import { Container, Navbar } from "react-bootstrap";
import ModifyCropRatio1x1 from "./modify-crop-ratio1x1";
import ModifyCropRatio4x3 from "./modify-crop-ratio4x3";
import ModifyCropRatio16x9 from "./modify-crop-ratio16x9";
import ModifyCropApply from "./modify-crop-apply";

export interface ModifyCropPhotoFooterProps {
  handleSaveCroppedPhoto: () => void;
  modifyRatio1x1: boolean;
  modifyRatio4x3: boolean;
  modifyRatio16x9: boolean;
  handleModifyRatio1x1: () => void;
  handleModifyRatio4x3: () => void;
  handleModifyRatio16x9: () => void;
}

export default function ModifyCropPhotoFooter({
  handleSaveCroppedPhoto,
  modifyRatio1x1,
  modifyRatio4x3,
  modifyRatio16x9,
  handleModifyRatio1x1,
  handleModifyRatio4x3,
  handleModifyRatio16x9,
}: ModifyCropPhotoFooterProps) {
  return (
    <Navbar className="flex-fill rounded-bottom bg-body-light">
      <Container className="d-flex justify-content-end h-100">
        <div className="d-flex justify-content-between w-100">
          <div className="d-flex">
            <ModifyCropRatio1x1
              modifyRatio1x1={modifyRatio1x1}
              handleModifyRatio1x1={handleModifyRatio1x1}
            />
            <ModifyCropRatio4x3
              modifyRatio4x3={modifyRatio4x3}
              handleModifyRatio4x3={handleModifyRatio4x3}
            />
            <ModifyCropRatio16x9
              modifyRatio16x9={modifyRatio16x9}
              handleModifyRatio16x9={handleModifyRatio16x9}
            />
          </div>
        </div>
        <ModifyCropApply handleSaveCroppedPhoto={handleSaveCroppedPhoto} />
      </Container>
    </Navbar>
  );
}
