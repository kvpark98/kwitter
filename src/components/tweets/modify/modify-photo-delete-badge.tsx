import { Badge } from "react-bootstrap";
import ModifyPhotoDeleteBadgeChecked from "./modify-photo-delete-badge-checked";
import ModifyPhotoDeleteBadgeUnchecked from "./modify-photo-delete-badge-unchecked.tsx";

export interface ModifyPhotoDeleteBadgeProps {
  deletePhotoChecked: boolean;
}

export default function ModifyPhotoDeleteBadge({
  deletePhotoChecked,
}: ModifyPhotoDeleteBadgeProps) {
  return (
    <Badge
      bg={deletePhotoChecked ? "danger" : "light"}
      title={deletePhotoChecked ? "Delete Checked" : "Delete Unchecked"}
      className="d-flex align-items-center position-absolute top-0 end-0 p-1 border border-2 border-danger"
    >
      {deletePhotoChecked ? (
        <ModifyPhotoDeleteBadgeChecked />
      ) : (
        <ModifyPhotoDeleteBadgeUnchecked />
      )}
    </Badge>
  );
}
