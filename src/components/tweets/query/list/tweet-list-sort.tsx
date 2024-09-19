import { Navbar } from "react-bootstrap";
import TweetListFilter from "./tweet-list-filter";

export interface TweetListSortProps {
  sortCriteria: string;
  handleSortCriteria: (event: React.MouseEvent<HTMLButtonElement>) => void;
  sortOrder: boolean;
  handleSortOrder: () => void;
  resetCriteria: () => void;
}

export default function TweetListSort({
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
        sortCriteria={sortCriteria}
        handleSortCriteria={handleSortCriteria}
        sortOrder={sortOrder}
        handleSortOrder={handleSortOrder}
        resetCriteria={resetCriteria}
      />
    </Navbar>
  );
}
