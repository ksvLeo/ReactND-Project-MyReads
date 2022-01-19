import React, { useState } from "react";

function SearchInput({ filterBooks, placeholder }) {
  //Dynamic input component
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
      placeholder={placeholder}
      value={userInput}
      onChange={handleSearch}
    />
  );
}

export default SearchInput;
