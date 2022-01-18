import React from "react";
import ShelfDisplay from "./shelf-display";
import { Link } from "react-router-dom";

export default function MyReads({ books, handleMoveShelf }) {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <ShelfDisplay
          header="Currently Reading"
          books={books.filter((book) => book.shelf === "currentlyReading")}
          handleMoveShelf={(bookId, newShelf) =>
            handleMoveShelf(bookId, newShelf)
          }
        />
        <ShelfDisplay
          header="Want to read"
          books={books.filter((book) => book.shelf === "wantToRead")}
          handleMoveShelf={(bookId, newShelf) =>
            handleMoveShelf(bookId, newShelf)
          }
        />
        <ShelfDisplay
          header="Read"
          books={books.filter((book) => book.shelf === "read")}
          handleMoveShelf={(bookId, newShelf) =>
            handleMoveShelf(bookId, newShelf)
          }
        />
      </div>
      <div className="open-search">
        <Link to="/search">
          <button>Add a book</button>
        </Link>
      </div>
    </div>
  );
}
