import { Container, Navbar } from "react-bootstrap";
import CreateCropRatio1x1 from "./create-crop-ratio1x1";
import CreateCropRatio4x3 from "./create-crop-ratio4x3";
import CreateCropRatio16x9 from "./create-crop-ratio16x9";
import CreateCropApply from "./create-crop-apply";

export interface CreateCropPhotoFooterProps {
  handleSaveCroppedPhoto: () => void;
  createRatio1x1: boolean;
  createRatio4x3: boolean;
  createRatio16x9: boolean;
  handleCreateRatio1x1: () => void;
  handleCreateRatio4x3: () => void;
  handleCreateRatio16x9: () => void;
}

export default function CreateCropPhotoFooter({
  handleSaveCroppedPhoto,
  createRatio1x1,
  createRatio4x3,
  createRatio16x9,
  handleCreateRatio1x1,
  handleCreateRatio4x3,
  handleCreateRatio16x9,
}: CreateCropPhotoFooterProps) {
  return (
    <Navbar className="flex-fill rounded-bottom bg-body-light">
      <Container className="d-flex justify-content-end h-100">
        <div className="d-flex justify-content-between w-100">
          <div className="d-flex">
            <CreateCropRatio1x1
              createRatio1x1={createRatio1x1}
              handleCreateRatio1x1={handleCreateRatio1x1}
            />
            <CreateCropRatio4x3
              createRatio4x3={createRatio4x3}
              handleCreateRatio4x3={handleCreateRatio4x3}
            />
            <CreateCropRatio16x9
              createRatio16x9={createRatio16x9}
              handleCreateRatio16x9={handleCreateRatio16x9}
            />
          </div>
          <div>
            <CreateCropApply handleSaveCroppedPhoto={handleSaveCroppedPhoto} />
          </div>
        </div>
      </Container>
    </Navbar>
  );
}
