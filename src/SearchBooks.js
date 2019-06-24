import React from "react";
import { Link } from "react-router-dom";
import BooksGrid from "./BooksGrid";
import * as BooksAPI from "./BooksAPI";
import { debounce } from "throttle-debounce";

class SearchBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResultsBooks: [],
      searchTerms: ""
    };
    this.SearchDebounced = debounce(400, this.Search);
  }

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
              value={this.state.searchTerms}
              onChange={e =>
                this.setState(
                  { searchTerms: e.target.value },
                  this.SearchDebounced
                )
              }
            />
          </div>
        </div>
        <div className="search-books-results">
          <BooksGrid
            books={this.state.searchResultsBooks}
            onChangeBookShelf={(newShelf, book) => {
              this.props.onChangeBookShelf(newShelf, book);
            }}
          />
        </div>
      </div>
    );
  }

  Search() {
    let { searchTerms } = this.state;
    BooksAPI.search(searchTerms).then(booksResults => {
      if (booksResults && Array.isArray(booksResults)) {
        this.setState(() => ({
          searchResultsBooks: booksResults.map(bookResult => {
            let shelvedBook = this.props.shelvedBooks.filter(
              book => book.id === bookResult.id
            );
            if (
              shelvedBook &&
              Array.isArray(shelvedBook) &&
              shelvedBook.length === 1
            ) {
              bookResult.shelf = shelvedBook[0].shelf;
            } else {
              bookResult.shelf = "none";
            }
            return bookResult;
          })
        }));
      } else {
        this.setState(() => ({
          searchResultsBooks: []
        }));
      }
    });
  }
}

export default SearchBooks;
