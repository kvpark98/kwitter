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
  order: boolean;
  handleOrder: (event: React.MouseEvent<HTMLButtonElement>) => void;
  resetOrder: () => void;
}

export default function TweetHeader({
  tweets,
  back,
  sortCriteria,
  handleSortCriteria,
  resetCriteria,
  order,
  handleOrder,
  resetOrder,
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
      <Button variant="light" onClick={handleOrder} className="me-2">
        {order ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrow-down"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrow-up"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5"
            />
          </svg>
        )}
      </Button>
    </Navbar>
  );
}
