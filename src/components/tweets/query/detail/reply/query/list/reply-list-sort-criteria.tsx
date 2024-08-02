import { ButtonGroup, Dropdown, DropdownButton } from "react-bootstrap";

export interface ReplyListSortCriteriaProps {
  sortCriteria: string;
  handleSortCriteria: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function ReplyListSortCriteria({
  sortCriteria,
  handleSortCriteria,
}: ReplyListSortCriteriaProps) {
  return (
    <DropdownButton
      as={ButtonGroup}
      variant="dark"
      drop="end"
      title={sortCriteria}
    >
      <Dropdown.Item onClick={handleSortCriteria}>Date</Dropdown.Item>
      <Dropdown.Item onClick={handleSortCriteria}>Likes</Dropdown.Item>
    </DropdownButton>
  );
}
