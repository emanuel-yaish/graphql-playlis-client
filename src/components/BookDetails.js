import React from "react";
import { useQuery } from "@apollo/client";
import { getBookQuery } from "../queries/queries";

function BookDetails(props) {
  const bookID = props.bookID;
  const { loading, error, data } = useQuery(getBookQuery, {
    variables: { id: bookID },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p> </p>;

  const { book } = data;
  if (book) {
    return (
      <div className="book-details">
        <h2>{book.name}</h2>
        <p>{book.genre}</p>
        <p>{book.author.name}</p>
        <p>All Books by this author:</p>
        <ul>
          {book.author.books.map((item) => {
            return <li key={item.id}>{item.name}</li>;
          })}
        </ul>
      </div>
    );
  } else {
    return <div className="book-details">No book selected...</div>;
  }
}

export default BookDetails;
