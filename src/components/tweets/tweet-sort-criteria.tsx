import { Dropdown, DropdownButton } from "react-bootstrap";

export interface TweetSortCriteriaProps {
  sortCriteria: string;
  handleSortCriteria: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function TweetSortCriteria({
  sortCriteria,
  handleSortCriteria,
}: TweetSortCriteriaProps) {
  return (
    <DropdownButton
      className="me-1"
      variant="light"
      drop="start"
      title={sortCriteria}
    >
      <Dropdown.Item onClick={handleSortCriteria}>Date</Dropdown.Item>
      <Dropdown.Item onClick={handleSortCriteria}>Replys</Dropdown.Item>
      <Dropdown.Item onClick={handleSortCriteria}>Likes</Dropdown.Item>
    </DropdownButton>
  );
}
