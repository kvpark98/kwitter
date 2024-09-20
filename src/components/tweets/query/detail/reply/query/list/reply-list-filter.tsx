import { Button, ButtonGroup } from "react-bootstrap";
import ReplyListSortOrder from "./reply-list-sort-order";

export interface ReplyListFilterProps {
  sortOrder: boolean;
  handleSortOrder: () => void;
}

export default function ReplyListFilter({
  sortOrder,
  handleSortOrder,
}: ReplyListFilterProps) {
  return (
    <ButtonGroup>
      <Button variant="dark">Date</Button>
      <ReplyListSortOrder
        sortOrder={sortOrder}
        handleSortOrder={handleSortOrder}
      />
    </ButtonGroup>
  );
}
