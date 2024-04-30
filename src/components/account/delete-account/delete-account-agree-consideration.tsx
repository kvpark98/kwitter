import { Form } from "react-bootstrap";

export interface DeleteAccountAgreeFormProps {
  considerationChecked: boolean;
  agreeConsideration: () => void;
}

export default function DeleteAccountAgreeConsideration({
  considerationChecked,
  agreeConsideration,
}: DeleteAccountAgreeFormProps) {
  return (
    <div className="d-flex mb-5">
      <Form.Check
        onClick={agreeConsideration}
        type="checkbox"
        id="agreeConsideration"
        className="me-2"
        readOnly
        {...(considerationChecked ? { checked: true } : { checked: false })}
      />
      <div>
        <Form.Label htmlFor="agreeConsideration" className="fw-bold mb-3">
          Consideration
        </Form.Label>
        <p>
          We recommend carefully considering the decision to withdraw your
          account. If there are concerns or issues, reaching out to our support
          team might provide alternative solutions.
        </p>
      </div>
    </div>
  );
}
