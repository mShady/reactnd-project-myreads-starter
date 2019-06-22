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
            />
          )}
        />
        <Route
          path="/Search"
          render={() => (
            <SearchBooks
              onCloseSearch={() => {
                this.setState({ showSearchPage: false });
              }}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
