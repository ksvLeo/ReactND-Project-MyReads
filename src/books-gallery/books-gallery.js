import React from "react";
import { Link } from "react-router-dom";
import BookList from "../common/books-list";
import SearchInput from "./search-input";

function BooksGallery({ filterBooks, books, handleAddBook, handleMoveShelf }) {
  return (
    <div>
      <div className="list-books-title">
        <h1>Books Gallery</h1>
      </div>
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <SearchInput
            filterBooks={(input) => filterBooks(input)}
            placeholder="Search by title or author"
          />
        </div>
        <div className="search-books-results">
          <BookList
            books={books}
            handleAddBook={(book, newShelf) => handleAddBook(book, newShelf)}
            handleMoveShelf={(book, newShelf) =>
              handleMoveShelf(book, newShelf)
            }
          />
        </div>
      </div>
    </div>
  );
}

export default BooksGallery;
