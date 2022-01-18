import React from "react";
import { Link } from "react-router-dom";
import BookList from "../common/books-list";
import SearchInput from "./search-input";

function BooksGallery({ filterBooks, books, handleAddBook }) {
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
          <SearchInput filterBooks={(input) => filterBooks(input)} />
        </div>
        <div className="search-books-results">
          <BookList
            books={books}
            handleAddBook={(bookId, newShelf) =>
              handleAddBook(bookId, newShelf)
            }
          />
        </div>
      </div>
    </div>
  );
}

export default BooksGallery;
