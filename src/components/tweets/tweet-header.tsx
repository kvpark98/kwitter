import { Button, Dropdown, DropdownButton, Navbar } from "react-bootstrap";
import TweetBack from "./tweet-back";
import TweetTitle from "./tweet-title";
import { ITweet } from "./query/detail/tweet";

export interface TweetHeaderProps {
  tweets: ITweet[];
  back: () => void;
  sortCriteria: string;
  handleSortCriteria: (event: React.MouseEvent<HTMLButtonElement>) => void;
  resetCriteria: () => void;
}

export default function TweetHeader({
  tweets,
  back,
  sortCriteria,
  handleSortCriteria,
  resetCriteria,
}: TweetHeaderProps) {
  return (
    <Navbar bg="dark" className="d-flex align-items-center" sticky="top">
      <TweetBack back={back} />
      <TweetTitle tweets={tweets} />
      <DropdownButton
        className="me-2"
        variant="light"
        drop="start"
        title={sortCriteria}
      >
        <Dropdown.Item onClick={handleSortCriteria}>Date</Dropdown.Item>
        <Dropdown.Item onClick={handleSortCriteria}>Replys</Dropdown.Item>
        <Dropdown.Item onClick={handleSortCriteria}>Likes</Dropdown.Item>
      </DropdownButton>
      <Button variant="light" onClick={resetCriteria} className="me-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-arrow-clockwise"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"
          />
          <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
        </svg>
      </Button>
    </Navbar>
  );
}
