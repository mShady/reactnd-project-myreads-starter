import React from "react";
// import * as BooksAPI from './BooksAPI'
import "./App.css";
import SearchBooks from "./SearchBooks";
import ListBooks from "./ListBooks";
import { Route } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";

class BooksApp extends React.Component {
  state = {
    books: [],
    searchResults: []
  };
  componentDidMount() {
    BooksAPI.getAll().then(returnedValue => {
      console.log(returnedValue);
      this.setState({ books: returnedValue });
    });
  }
  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <ListBooks
              onOpenSearch={() => {
                this.setState({ showSearchPage: true });
              }}
              books={this.state.books}
              onChangeBookShelf={(newShelf, book) => {
                this.changeBookShelf(newShelf, book);
              }}
            />
          )}
        />
        <Route
          path="/Search"
          render={() => (
            <SearchBooks
              books={this.state.searchResults}
              onChangeBookShelf={(newShelf, book) => {
                this.changeBookShelf(newShelf, book);
              }}
              onSearch={searchTerms => this.Search(searchTerms)}
            />
          )}
        />
      </div>
    );
  }

  changeBookShelf(newShelf, book) {
    const { id } = book;

    BooksAPI.update(book, newShelf).then(shelves => {
      console.log(shelves);
      if (newShelf === "none") {
        this.setState(currentState => ({
          books: currentState.books.filter(book => book.id !== id)
        }));
      } else if (shelves[newShelf].includes(id)) {
        console.log(`shelves[${newShelf}].includes(${id})`);
        this.setState(currentState => {
          if (currentState.books.filter(book => book.id === id).length > 0) {
            return {
              books: currentState.books.map(mappedBook => {
                if (mappedBook.id === id) {
                  mappedBook.shelf = newShelf;
                }
                return mappedBook;
              }),
              searchResults: currentState.searchResults.map(mappedBook => {
                if (mappedBook.id === id) {
                  mappedBook.shelf = newShelf;
                }
                return mappedBook;
              })
            };
          } else {
            console.log("else!");
            console.log(currentState.books.concat([book]));
            return {
              books: currentState.books.concat([book]),
              searchResults: currentState.searchResults.map(mappedBook => {
                if (mappedBook.id === id) {
                  mappedBook.shelf = newShelf;
                }
                return mappedBook;
              })
            };
          }
        });
      }
    });
  }

  Search(searchTerms) {
    BooksAPI.search(searchTerms).then(booksResults => {
      console.log(booksResults);
      if (booksResults && Array.isArray(booksResults)) {
        this.setState(() => ({
          searchResults: booksResults.map(bookResult => {
            let shelvedBook = this.state.books.filter(
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
          searchResults: []
        }));
      }
    });
  }
}

export default BooksApp;
