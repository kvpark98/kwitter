import { ButtonGroup } from "react-bootstrap";
import ReplyListSortCriteria from "./reply-list-sort-criteria";
import ReplyListSortOrder from "./reply-list-sort-order";
import ReplyListResetCriteria from "./reply-list-reset-criteria";

export interface ReplyListFilterProps {
  sortCriteria: string;
  handleSortCriteria: (event: React.MouseEvent<HTMLButtonElement>) => void;
  sortOrder: boolean;
  handleSortOrder: () => void;
  resetCriteria: () => void;
}

export default function ReplyListFilter({
  sortCriteria,
  handleSortCriteria,
  sortOrder,
  handleSortOrder,
  resetCriteria,
}: ReplyListFilterProps) {
  return (
    <ButtonGroup>
      <ReplyListSortCriteria
        sortCriteria={sortCriteria}
        handleSortCriteria={handleSortCriteria}
      />
      <ReplyListSortOrder
        sortOrder={sortOrder}
        handleSortOrder={handleSortOrder}
      />
      <ReplyListResetCriteria resetCriteria={resetCriteria} />
    </ButtonGroup>
  );
}
