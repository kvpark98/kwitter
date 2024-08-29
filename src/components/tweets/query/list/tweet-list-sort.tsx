import { Navbar } from "react-bootstrap";
import TweetListFilter from "./tweet-list-filter";

export interface TweetListSortProps {
  isTweetActive?: boolean;
  sortCriteria: string;
  handleSortCriteria: (event: React.MouseEvent<HTMLButtonElement>) => void;
  sortOrder: boolean;
  handleSortOrder: () => void;
  resetCriteria: () => void;
}

export default function TweetListSort({
  isTweetActive,
  sortCriteria,
  handleSortCriteria,
  sortOrder,
  handleSortOrder,
  resetCriteria,
}: TweetListSortProps) {
  return (
    <Navbar
      bg="light"
      className="d-flex justify-content-end align-items-center"
    >
      <TweetListFilter
        isTweetActive={isTweetActive}
        sortCriteria={sortCriteria}
        handleSortCriteria={handleSortCriteria}
        sortOrder={sortOrder}
        handleSortOrder={handleSortOrder}
        resetCriteria={resetCriteria}
      />
    </Navbar>
  );
}
