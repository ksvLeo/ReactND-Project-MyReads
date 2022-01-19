import React from "react";
import "../App.css";

export default function BookActions({ handleAddBook, handleMoveShelf, shelf }) {
  const handleInput = (event) => {
    shelf === "none"
      ? handleAddBook(event.target.value)
      : handleMoveShelf(event.target.value);
  };

  //Options menu to interact with library
  return (
    <select defaultValue={""} onChange={handleInput}>
      <option key="move" value="" hidden />
      <option
        key="currentlyReading"
        value="currentlyReading"
        className={
          shelf === "currentlyReading" ? "disabled-option-transparent" : ""
        }
        disabled={shelf === "currentlyReading"}
      >
        Currently Reading
      </option>
      <option
        key="wantToRead"
        value="wantToRead"
        className={shelf === "wantToRead" ? "disabled-option-transparent" : ""}
        disabled={shelf === "wantToRead"}
      >
        Want to Read
      </option>
      <option
        key="read"
        value="read"
        className={shelf === "read" ? "disabled-option-transparent" : ""}
        disabled={shelf === "read"}
      >
        Read
      </option>
      <option
        key="none"
        value="none"
        className={shelf === "none" ? "disabled-option-transparent" : ""}
        disabled={shelf === "none"}
      >
        None
      </option>
    </select>
  );
}
