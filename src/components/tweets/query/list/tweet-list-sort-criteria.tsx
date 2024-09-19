import { ButtonGroup, Dropdown, DropdownButton } from "react-bootstrap";

export interface TweetListSortCriteriaProps {
  sortCriteria: string;
  handleSortCriteria: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function TweetListSortCriteria({
  sortCriteria,
  handleSortCriteria,
}: TweetListSortCriteriaProps) {
  return (
    <DropdownButton
      as={ButtonGroup}
      variant="dark"
      drop="start"
      title={sortCriteria}
    >
      <Dropdown.Item onClick={handleSortCriteria}>Date</Dropdown.Item>
    </DropdownButton>
  );
}
