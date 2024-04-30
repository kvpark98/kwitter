import { Form } from "react-bootstrap";

export interface DeleteAccountAgreeAllProps {
  allChecked: boolean;
  agreeAll: () => void;
}

export default function DeleteAccountAgreeAll({
  allChecked,
  agreeAll,
}: DeleteAccountAgreeAllProps) {
  return (
    <Form.Check
      onClick={agreeAll}
      type="checkbox"
      id="agreeAll"
      label="I have reviewed all the guidances and agree to them."
      readOnly
      {...(allChecked ? { checked: true } : { checked: false })}
    />
  );
}
