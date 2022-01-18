import React, { useState } from "react";

function SearchInput({ filterBooks }) {
  const [userInput, setInput] = useState("");

  const handleSearch = (event) => {
    event.preventDefault();
    const input = event.target.value;

    setInput(input);

    filterBooks(input);
  };

  return (
    <input
      type="text"
      placeholder="Search by title or author"
      value={userInput}
      onChange={handleSearch}
    />
  );
}

export default SearchInput;
