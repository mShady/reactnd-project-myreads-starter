import React from "react";
import BooksGrid from "./BooksGrid";

class Bookshelf extends React.Component {
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.bookshelfTitle}</h2>
        <div className="bookshelf-books">
          <BooksGrid
            books={this.props.books.filter(
              book => book.shelf === this.props.shelf
            )}
            onChangeBookShelf={(newShelf, book) => {
              this.props.onChangeBookShelf(newShelf, book);
            }}
          />
        </div>
      </div>
    );
  }
}

export default Bookshelf;
