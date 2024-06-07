import { Form } from "react-bootstrap";
import ChangePasswordCurrentType from "./change-password-current-type";

export interface ChangePasswordCurrentPasswordProps {
  currentPasswordInputType: boolean;
  changeCurrentPasswordType: () => void;
  currentPassword: string;
  handleCurrentPassword: (event: React.ChangeEvent<HTMLInputElement>) => void;
  noSpace: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function ChangePasswordCurrentPassword({
  currentPasswordInputType,
  changeCurrentPasswordType,
  currentPassword,
  handleCurrentPassword,
  noSpace,
}: ChangePasswordCurrentPasswordProps) {
  return (
    <Form.Group>
      <div className="d-flex align-items-center mb-2">
        <Form.Label htmlFor="currentPassword" className="m-0">
          Current password
        </Form.Label>
        <ChangePasswordCurrentType
          currentPasswordInputType={currentPasswordInputType}
          changeCurrentPasswordType={changeCurrentPasswordType}
        />
      </div>
      <Form.Control
        className="border-none mt-1 mb-1 rounded-pill"
        onChange={handleCurrentPassword}
        onKeyDown={noSpace}
        id="currentPassword"
        name="currentPassword"
        value={currentPassword}
        type={currentPasswordInputType ? "text" : "password"}
        maxLength={20}
        autoComplete="password"
      />
    </Form.Group>
  );
}
