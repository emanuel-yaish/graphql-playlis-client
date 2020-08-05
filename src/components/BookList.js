import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { getBooksQuery } from "../queries/queries";

import BookDetails from "./BookDetails";

function BookList() {
  function handleBookClicked(clickedBookID) {
    setBookID(clickedBookID);
  }

  const [bookID, setBookID] = useState("");
  const { loading, error, data } = useQuery(getBooksQuery);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <ul id="book-list">
        {data.books.map((book) => {
          return <li key={book.id} onClick={() => handleBookClicked(book.id)}> {book.name}</li>;
        })}
      </ul>
      <BookDetails bookID={bookID} />
    </div>
  );
}

export default BookList;
