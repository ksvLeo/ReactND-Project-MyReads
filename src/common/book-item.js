import React from "react";
import BookActions from "./book-actions";

function BookItem({ book, handleMoveShelf, handleAddBook }) {
  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: book.imageLinks
              ? `url(${book.imageLinks.thumbnail})`
              : "",
          }}
        >
          <div className="book-shelf-changer">
            <BookActions
              shelf={book.shelf ? book.shelf : "none"}
              handleMoveShelf={(newShelf) => handleMoveShelf(book.id, newShelf)}
              handleAddBook={(newShelf) => handleAddBook(book.id, newShelf)}
            />
          </div>
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      {book.authors &&
        Object.values(book.authors).map((author) => (
          <div key={author} className="book-authors">
            {author}
          </div>
        ))}
    </div>
  );
}

export default BookItem;
