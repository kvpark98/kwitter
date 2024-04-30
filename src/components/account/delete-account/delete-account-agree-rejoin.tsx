import { Form } from "react-bootstrap";

export interface DeleteAccountAgreeRejoinProps {
  rejoiningChecked: boolean;
  agreeRejoining: () => void;
}

export default function DeleteAccountAgreeRejoin({
  rejoiningChecked,
  agreeRejoining,
}: DeleteAccountAgreeRejoinProps) {
  return (
    <div className="d-flex mb-4">
      <Form.Check
        onClick={agreeRejoining}
        type="checkbox"
        id="agreeRejoining"
        className="me-2"
        readOnly
        {...(rejoiningChecked ? { checked: true } : { checked: false })}
      />
      <div>
        <Form.Label htmlFor="agreeRejoining" className="fw-bold mb-3">
          Rejoining
        </Form.Label>
        <p>
          While you can rejoin later, keep in mind that your previous account
          data will no longer be available. You will essentially be starting
          anew.
        </p>
      </div>
    </div>
  );
}
