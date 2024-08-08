import { ButtonGroup } from "react-bootstrap";
import TweetListSortCriteria from "./tweet-list-sort-criteria";
import TweetListSortOrder from "./tweet-list-sort-order";
import TweetListResetCriteria from "./tweet-list-reset-criteria";

export interface TweetListFilterProps {
  isTweetActive?: boolean;
  sortCriteria: string;
  handleSortCriteria: (event: React.MouseEvent<HTMLButtonElement>) => void;
  sortOrder: boolean;
  handleSortOrder: () => void;
  resetCriteria: () => void;
}

export default function TweetListFilter({
  isTweetActive,
  sortCriteria,
  handleSortCriteria,
  sortOrder,
  handleSortOrder,
  resetCriteria,
}: TweetListFilterProps) {
  return (
    <ButtonGroup className="me-2 mb-2">
      <TweetListSortCriteria
        isTweetActive={isTweetActive}
        sortCriteria={sortCriteria}
        handleSortCriteria={handleSortCriteria}
      />
      <TweetListSortOrder
        sortOrder={sortOrder}
        handleSortOrder={handleSortOrder}
      />
      <TweetListResetCriteria resetCriteria={resetCriteria} />
    </ButtonGroup>
  );
}
