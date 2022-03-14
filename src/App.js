import React, { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import UserLibrary from "./user-library/user-library";
import * as BooksAPI from "./utils/BooksAPI";
import BooksGallery from "./books-gallery/books-gallery";

function BooksApp() {
  const [userAddedBooks, setUserBooks] = useState([]);
  const [galleryBooks, setGalleryBooks] = useState([]);
  const [shelvesContent, setShelvesContents] = useState({
    currentlyReading: [],
    wantToRead: [],
    read: [],
  });

  useEffect(() => {
    requestBooks();
  }, []);

  const requestBooks = () => {
    BooksAPI.getAll().then((books) => {
      let shelves = {
        currentlyReading: [],
        wantToRead: [],
        read: [],
      };

      for (let book of books) {
        shelves[book.shelf].push(book.id);
      }

      setShelvesContents(shelves);
      setUserBooks(books);
    });
  };

  const handleAddBook = (book, shelf) => {
    book.shelf = shelf;
    setUserBooks((userAddedBooks) => [...userAddedBooks, book]);
    BooksAPI.update(book, shelf).then((updatedShelves) => {
      setShelvesContents(updatedShelves);
    });
  };

  const handleMoveShelf = (book, newShelf) => {
    if (book.shelf !== newShelf) {
      BooksAPI.update(book, newShelf).then((updatedShelves) => {
        book.shelf = newShelf;
        setUserBooks((userAddedBooks) => [
          ...userAddedBooks.filter((addedBook) => addedBook.id !== book.id),
          book,
        ]);
        setShelvesContents(updatedShelves);
      });
    }
  };

  const filterGallery = (input) => {
    if (input) {
      BooksAPI.search(input).then((books) => {
        if (!books.error) {
          setGalleryBooks(books);
          return; //As server did return a collection of books, purpose of this method is reached
        }
      });
    }
    setGalleryBooks([]); // Either because input was empty or query did not return any book, gallery array will be reset
  };

  return (
    <div className="app">
      <Routes>
        // BooksGallery Module - Allows user to search for books to add to their
        personal collection
        <Route
          path="/search"
          element={
            <BooksGallery
              books={galleryBooks}
              filterBooks={(input) => filterGallery(input)}
              handleAddBook={(bookId, shelf) => handleAddBook(bookId, shelf)}
              handleMoveShelf={(book, newShelf) =>
                handleMoveShelf(book, newShelf)
              }
            />
          }
        />
        // UserLibrary Module - Displays user's personal collection grouped in
        shelves
        <Route
          path="/"
          exact
          element={
            <UserLibrary
              books={userAddedBooks}
              handleMoveShelf={(book, newShelf) =>
                handleMoveShelf(book, newShelf)
              }
            />
          }
        />
      </Routes>
    </div>
  );
}

export default BooksApp;
