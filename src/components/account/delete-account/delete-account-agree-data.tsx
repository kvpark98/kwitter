import { Form } from "react-bootstrap";

export interface DeleteAccountAgreeDataProps {
  dataRemovalChecked: boolean;
  agreeDataRemoval: () => void;
}

export default function DeleteAccountAgreeData({
  dataRemovalChecked,
  agreeDataRemoval,
}: DeleteAccountAgreeDataProps) {
  return (
    <div className="d-flex mb-4">
      <Form.Check
        onClick={agreeDataRemoval}
        type="checkbox"
        id="agreeDataRemoval"
        className="me-2"
        readOnly
        {...(dataRemovalChecked ? { checked: true } : { checked: false })}
      />
      <div>
        <Form.Label htmlFor="agreeDataRemoval" className="fw-bold mb-3">
          Data Removal
        </Form.Label>
        <p>
          Upon withdrawal, all your personal data, including account details,
          settings, and usage records, will be permanently deleted from our
          system.
        </p>
      </div>
    </div>
  );
}
