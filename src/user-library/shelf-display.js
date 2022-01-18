import React from "react";
import BookList from "../common/books-list";

export default function ShelfDisplay({ header, books, handleMoveShelf }) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{header}</h2>
      <div className="bookshelf-books">
        <BookList
          books={books}
          handleMoveShelf={(bookId, newShelf) =>
            handleMoveShelf(bookId, newShelf)
          }
        />
      </div>
    </div>
  );
}
