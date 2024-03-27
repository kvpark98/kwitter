import React from "react";
import { Button } from "react-bootstrap";

export interface ModifyProfileSubmitProps {
  isLoading: boolean;
  isName: boolean;
}

export default function ModifyProfileSubmit({
  isLoading,
  isName,
}: ModifyProfileSubmitProps) {
  return (
    <Button
      type="submit"
      variant="primary"
      className="fw-bold rounded-pill"
      {...(!isName ? { disabled: true } : { disabled: false })}
    >
      {isLoading ? "Saving..." : "Save"}
    </Button>
  );
}
