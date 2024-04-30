import { Form } from "react-bootstrap";

export interface DeleteAccountAgreeContentProps {
  contentRetentionChecked: boolean;
  agreeContentRetention: () => void;
}

export default function DeleteAccountAgreeContent({
  contentRetentionChecked,
  agreeContentRetention,
}: DeleteAccountAgreeContentProps) {
  return (
    <div className="d-flex mb-4">
      <Form.Check
        onClick={agreeContentRetention}
        type="checkbox"
        id="agreeContentRetention"
        className="me-2"
        readOnly
        {...(contentRetentionChecked ? { checked: true } : { checked: false })}
      />
      <div>
        <Form.Label htmlFor="agreeContentRetention" className="fw-bold mb-3">
          Content Retention
        </Form.Label>
        <p>
          Posts and comments you've shared on the bulletin board service will
          remain even after your account is withdrawn. If you have specific
          content you wish to delete, please do so before initiating the
          withdrawal process.
        </p>
      </div>
    </div>
  );
}
