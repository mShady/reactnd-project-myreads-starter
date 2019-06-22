import React from "react";
// import * as BooksAPI from './BooksAPI'
import "./App.css";
import SearchBooks from "./SearchBooks";
import ListBooks from "./ListBooks";
import { Route } from "react-router-dom";

class BooksApp extends React.Component {
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
