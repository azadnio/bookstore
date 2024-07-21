// src/App.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import BookList from './components/Booklist';
import BookForm from './components/Bookform';
import './App.css';
import Book from './types/Book';
import { BE_API } from './config';

const App = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = () => {
    axios
      .get(`${BE_API}/api/books/`)
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the books!', error);
      });
  };

  const handleAddBook = (newBook: Book) => {
    setBooks([...books, newBook]);
    fetchBooks();
  };

  const handleUpdateBook = (updatedBook: Book) => {
    setBooks(books.map((book) => (book.id === updatedBook.id ? updatedBook : book)));
    fetchBooks();
  };

  const handleDeleteBook = (bookId: number) => {
    confirm('Are you sure you want to delete this book?') &&
      axios
        .delete(`${BE_API}/api/books/${bookId}/`)
        .then(() => {
          fetchBooks();
        })
        .catch((error) => {
          console.error('There was an error deleting the book!', error);
        });
  };

  return (
    <div className="App">
      <h1>Book Management App</h1>
      <BookForm
        selectedBook={selectedBook}
        setSelectedBook={setSelectedBook}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        onAddBook={handleAddBook}
        onUpdateBook={handleUpdateBook}
      />
      <BookList
        books={books}
        setSelectedBook={setSelectedBook}
        setIsEditing={setIsEditing}
        onDeleteBook={handleDeleteBook}
      />
    </div>
  );
};

export default App;
