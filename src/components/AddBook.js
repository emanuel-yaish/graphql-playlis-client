import React from "react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation } from "@apollo/client";
import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery,
} from "../queries/queries";

function AddBook() {
  const onsubmit = (formData, event) => {
    addBook({
      variables: {
        name: formData.bookName,
        genre: formData.genre,
        authorId: formData.authorId,
      },
      refetchQueries: [{ query: getBooksQuery }],
    });
    event.target.reset();
  };

  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      bookName: "",
      genre: "",
      authorId: "Select author",
    },
  });

  const [addBook] = useMutation(addBookMutation);
  const { loading, error, data } = useQuery(getAuthorsQuery);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <form id="add-book" onSubmit={handleSubmit(onsubmit)}>
      <div className="field">
        <label>Book Name:</label>
        <input
          type="text"
          name="bookName"
          ref={register({ required: "Book Name Is Required" })}
        />
        {errors.bookName && (
          <p className="error-message">*{errors.bookName.message}</p>
        )}
      </div>

      <div className="field">
        <label>Genre:</label>
        <input
          type="text"
          name="genre"
          ref={register({ required: "Genre Is Required" })}
        />
        {errors.genre && (
          <p className="error-message">*{errors.genre.message}</p>
        )}
      </div>
      <div className="field">
        <label>Author:</label>
        <select name="authorId" ref={register}>
          <option>Select author</option>
          {data.authors.map((author) => {
            return (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            );
          })}
        </select>
      </div>

      <button type="submit">+</button>
    </form>
  );
}

export default AddBook;
