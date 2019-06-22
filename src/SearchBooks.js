import React from "react";
import { Link } from "react-router-dom";
import BooksGrid from "./BooksGrid";
import * as BooksAPI from "./BooksAPI";

class SearchBooks extends React.Component {
  state = {
    books: []
  };

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
              onChange={e => this.Search(e.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <BooksGrid
            books={this.state.books}
            onChangeBookShelf={(newShelf, book) => {
              this.props.onChangeBookShelf(newShelf, book);
            }}
          />
        </div>
      </div>
    );
  }

  Search(searchTerms) {
    BooksAPI.search(searchTerms).then(booksResults => {
      console.log(booksResults);
      if (booksResults && Array.isArray(booksResults)) {
        this.setState(() => ({
          books: booksResults
        }));
      } else {
        this.setState(() => ({
          books: []
        }));
      }
    });
  }
}

export default SearchBooks;
