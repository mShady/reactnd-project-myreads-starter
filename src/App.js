import React from "react";
// import * as BooksAPI from './BooksAPI'
import "./App.css";
import SearchBooks from "./SearchBooks";
import ListBooks from "./ListBooks";
import { Route } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";

class BooksApp extends React.Component {
  state = {
    books: []
  };
  componentDidMount() {
    BooksAPI.getAll().then(returnedValue => {
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
              shelvedBooks={this.state.books}
              onChangeBookShelf={(newShelf, book) => {
                this.changeBookShelf(newShelf, book);
              }}
            />
          )}
        />
      </div>
    );
  }

  changeBookShelf(newShelf, book) {
    const { id } = book;

    BooksAPI.update(book, newShelf).then(shelves => {
      if (newShelf === "none") {
        this.setState(currentState => ({
          books: currentState.books.filter(book => book.id !== id)
        }));
      } else if (shelves[newShelf].includes(id)) {
        this.setState(currentState => {
          if (currentState.books.filter(book => book.id === id).length > 0) {
            return {
              books: currentState.books.map(mappedBook => {
                if (mappedBook.id === id) {
                  mappedBook.shelf = newShelf;
                }
                return mappedBook;
              })
            };
          } else {
            book.shelf = newShelf;
            return {
              books: currentState.books.concat([book])
            };
          }
        });
      }
    });
  }
}

export default BooksApp;
