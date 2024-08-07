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
      variant={window.location.href.includes("profile") ? "dark" : "light"}
      drop="start"
      title={sortCriteria}
    >
      <Dropdown.Item onClick={handleSortCriteria}>Date</Dropdown.Item>
      <Dropdown.Item onClick={handleSortCriteria}>Replys</Dropdown.Item>
      <Dropdown.Item onClick={handleSortCriteria}>Likes</Dropdown.Item>
    </DropdownButton>
  );
}
