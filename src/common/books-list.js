import React from "react";
import BookItem from "./book-item";

function BookList({ books, handleMoveShelf }) {
  return (
    <ol className="books-grid">
      {books &&
        books.map((book) => {
          return (
            <li key={book.id}>
              <BookItem
                book={book}
                handleMoveShelf={(bookId, newShelf) =>
                  handleMoveShelf(bookId, newShelf)
                }
              />
            </li>
          );
        })}
    </ol>
  );
}

export default BookList;
