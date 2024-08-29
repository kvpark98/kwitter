import { ButtonGroup, Dropdown, DropdownButton } from "react-bootstrap";

export interface TweetListSortCriteriaProps {
  isTweetActive?: boolean;
  sortCriteria: string;
  handleSortCriteria: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function TweetListSortCriteria({
  isTweetActive,
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
      {(!window.location.href.includes("profile") || isTweetActive) && (
        <Dropdown.Item onClick={handleSortCriteria}>Replys</Dropdown.Item>
      )}
      <Dropdown.Item onClick={handleSortCriteria}>Likes</Dropdown.Item>
    </DropdownButton>
  );
}
