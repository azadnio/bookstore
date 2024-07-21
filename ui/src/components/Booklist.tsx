import Book from '../types/Book';

interface BookListProps {
  books: Array<Book>;
  setSelectedBook: (book: Book) => void;
  setIsEditing: (isEditing: boolean) => void;
  onDeleteBook: (bookId: number) => void;
}

const BookList = ({ books, setSelectedBook, setIsEditing, onDeleteBook }: BookListProps) => {
  return (
    <div>
      <h1>Book List</h1>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Publication Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book: Book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.publication_date}</td>
              <td>
                <button
                  onClick={() => {
                    setSelectedBook(book);
                    setIsEditing(true);
                  }}>
                  Edit
                </button>
                <button onClick={() => onDeleteBook(book.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookList;
