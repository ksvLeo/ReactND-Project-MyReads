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

  const handleAddBook = (bookId, shelf) => {
    BooksAPI.get(bookId).then((book) => {
      book.shelf = shelf;
      setUserBooks((userAddedBooks) => [...userAddedBooks, book]);
      BooksAPI.update(book, shelf).then((updatedShelves) => {
        setShelvesContents(updatedShelves);
      });
    });
  };

  const handleMoveShelf = (bookId, newShelf) => {
    const book = userAddedBooks.find((book) => book.id === bookId);
    if (book.shelf !== newShelf) {
      BooksAPI.update(book, newShelf).then((updatedShelves) => {
        book.shelf = newShelf;
        setUserBooks((userAddedBooks) => [
          ...userAddedBooks.filter((book) => book.id !== bookId),
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
          setGalleryBooks(books)
          return; //As server did return a collection of books, purpose of this method is reached
        }
      });
    }
    setGalleryBooks([]); // Either because input was empty or query did not return any book, gallery array will be reset
  };

  const notAddedBooks = () => {
    if (galleryBooks[0]) {
      return galleryBooks.filter(
        (book) =>
          shelvesContent["currentlyReading"].every((c) => c !== book.id) &&
          shelvesContent["wantToRead"].every((w) => w !== book.id) &&
          shelvesContent["read"].every((r) => r !== book.id)
      );
    } else {
      return [];
    }
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
              books={notAddedBooks()}
              filterBooks={(input) => filterGallery(input)}
              handleAddBook={(bookId, shelf) => handleAddBook(bookId, shelf)}
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
              handleMoveShelf={(bookId, newShelf) =>
                handleMoveShelf(bookId, newShelf)
              }
            />
          }
        />
      </Routes>
    </div>
  );
}

export default BooksApp;
