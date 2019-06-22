import React from "react";
import Book from "./Book";

class BooksGrid extends React.Component {
  render() {
    return (
      <ol className="books-grid">
        {this.props.books.map(book => (
          <li key={book.id}>
            <Book
              book={book}
              onChangeBookShelf={(newShelf, book) => {
                this.props.onChangeBookShelf(newShelf, book);
              }}
            />
          </li>
        ))}
      </ol>
    );
  }
}

export default BooksGrid;
