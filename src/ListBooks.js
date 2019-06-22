import React from "react";
import { Link } from "react-router-dom";
import Bookshelf from "./Bookshelf";

class ListBooks extends React.Component {
  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Bookshelf
              bookshelfTitle="Currently Reading"
              shelf="currentlyReading"
              books={this.props.books}
            />
            <Bookshelf
              bookshelfTitle="Want to Read"
              shelf="wantToRead"
              books={this.props.books}
            />
            <Bookshelf
              bookshelfTitle="Read"
              shelf="read"
              books={this.props.books}
            />
          </div>
        </div>
        <div className="open-search">
          <Link to="/Search">Add a book</Link>
        </div>
      </div>
    );
  }
}

export default ListBooks;
