import { Navbar } from "react-bootstrap";
import TweetListFilter from "./tweet-list-filter";

export interface TweetListSortProps {
  sortOrder: boolean;
  handleSortOrder: () => void;
}

export default function TweetListSort({
  sortOrder,
  handleSortOrder,
}: TweetListSortProps) {
  return (
    <Navbar
      bg="light"
      className="d-flex justify-content-end align-items-center"
    >
      <TweetListFilter
        sortOrder={sortOrder}
        handleSortOrder={handleSortOrder}
      />
    </Navbar>
  );
}
