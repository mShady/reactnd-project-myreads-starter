import React from "react";
import BookShelfChanger from "./BookShelfChanger";

class Book extends React.Component {
  render() {
    return (
      <div className="book">
        <div className="book-top">
          <img
            className="book-cover"
            alt="Book Cover"
            src={this.props.book.imageLinks.thumbnail}
          />

          <BookShelfChanger
            onShelfChanged={newShelf => {
              this.props.onChangeBookShelf(newShelf, {
                id: this.props.book.id
              });
            }}
          />
        </div>
        <div className="book-title">{this.props.book.title}</div>
        <div className="book-authors">
          {this.props.book.authors.join(" and ")}
        </div>
      </div>
    );
  }
}

export default Book;
