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
          Please be aware that upon withdrawing your membership, all posted
          content, including comments, will be permanently deleted.
        </p>
      </div>
    </div>
  );
}
