// src/components/BookForm.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Book from '../types/Book';
import { BE_API } from '../config';

interface BookFormProps {
    selectedBook: Book | null;
    setSelectedBook: (book: Book | null) => void;
    isEditing: boolean;
    setIsEditing: (isEditing: boolean) => void;
    onAddBook: (book: Book) => void;
    onUpdateBook: (book: Book) => void;
}

const BookForm = ({ selectedBook, setSelectedBook, isEditing, setIsEditing, onAddBook, onUpdateBook }: BookFormProps) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publishedDate, setPublishedDate] = useState('');

    useEffect(() => {
        if (selectedBook) {
            setTitle(selectedBook.title);
            setAuthor(selectedBook.author);
            setPublishedDate(selectedBook.publication_date);
        } else {
            setTitle('');
            setAuthor('');
            setPublishedDate('');
        }
    }, [selectedBook]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const bookData = { title, author, publication_date: publishedDate };

        if (isEditing && selectedBook) {
            axios.put(`${BE_API}/api/books/${selectedBook.id}/`, bookData)
                .then(response => {
                    onUpdateBook(response.data);
                    setSelectedBook(null);
                    setIsEditing(false);
                })
                .catch(error => {
                    console.error('There was an error updating the book!', error);
                });
        } else {
            axios.post(`${BE_API}/api/books/`, bookData)
                .then(response => {
                    onAddBook(response.data);
                    setSelectedBook(null);
                })
                .catch(error => {
                    console.error('There was an error creating the book!', error);
                });
        }

        setTitle('');
        setAuthor('');
        setPublishedDate('');
    };

    return (
        <div>
            <h2>{isEditing ? 'Edit Book' : 'Add New Book'}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Author</label>
                    <input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Published Date</label>
                    <input
                        type="date"
                        value={publishedDate}
                        onChange={(e) => setPublishedDate(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">{isEditing ? 'Update' : 'Add'} Book</button>
            </form>
        </div>
    );
};

export default BookForm;
