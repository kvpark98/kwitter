import { Button, ButtonGroup } from "react-bootstrap";
import TweetListSortOrder from "./tweet-list-sort-order";

export interface TweetListFilterProps {
  sortOrder: boolean;
  handleSortOrder: () => void;
}

export default function TweetListFilter({
  sortOrder,
  handleSortOrder,
}: TweetListFilterProps) {
  return (
    <ButtonGroup className="me-2">
      <Button variant="dark">Date</Button>
      <TweetListSortOrder
        sortOrder={sortOrder}
        handleSortOrder={handleSortOrder}
      />
    </ButtonGroup>
  );
}
