import React from "react";
import { Link } from "react-router-dom";
import BooksGrid from "./BooksGrid";

class SearchBooks extends React.Component {
  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={e => this.props.onSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <BooksGrid
            books={this.props.books}
            onChangeBookShelf={(newShelf, book) => {
              this.props.onChangeBookShelf(newShelf, book);
            }}
          />
        </div>
      </div>
    );
  }
}

export default SearchBooks;
