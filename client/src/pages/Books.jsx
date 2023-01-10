import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8800/books");
        setBooks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBooks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:8800/books/" + id);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h1>Bookstore</h1>
      <div className="books">
        {books.map((book) => (
          <div className="book" key={book.id}>
            {book.cover && <img src={book.cover} alt="" />}
            <div className="book-container">
              <h3>{book.title}</h3>
              <p>{book.author}</p>
              <span>$ {book.price}</span>
            </div>
            <div className="book-footer">
              <button className="button delete" onClick={() => handleDelete(book.id)}>
                Delete
              </button>
              <button className="button update">
                <Link to={`/update/${book.id}`}>Update</Link>
              </button>
            </div>
          </div>
        ))}
      </div>
      <button className="add">
        <Link to="/add">Add new book</Link>
      </button>
    </>
  );
};

export default Books;
