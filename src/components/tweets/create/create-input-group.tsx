import { Button, Form } from "react-bootstrap";
import CreateMessage from "./create-message";

export interface CreateInputGroupProps {
  message: string;
  handleMessage: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  imagePreviewUrl: string;
  resetPhotoButton: () => void;
}

export default function CreateInputGroup({
  message,
  handleMessage,
  imagePreviewUrl,
  resetPhotoButton,
}: CreateInputGroupProps) {
  return (
    <Form.Group>
      <div>
        <CreateMessage message={message} handleMessage={handleMessage} />
        {imagePreviewUrl && (
          <div className="position-relative">
            <img
              src={imagePreviewUrl}
              alt="Image Preview"
              className="w-100 h-100 mb-4 rounded"
            />
            <Button
              type="button"
              variant="danger"
              className="d-flex align-items-center position-absolute rounded-circle top-0 end-0 p-2"
              title="Delete"
              onClick={resetPhotoButton}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-trash-fill"
                viewBox="0 0 16 16"
              >
                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
              </svg>
            </Button>
          </div>
        )}
      </div>
    </Form.Group>
  );
}
