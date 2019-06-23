import React from "react";
import BookShelfChanger from "./BookShelfChanger";

class Book extends React.Component {
  render() {
    return (
      <div className="book">
        <div className="book-top">
          <img
            className="book-cover"
            alt={
              this.props.book.imageLinks
                ? `${this.props.book.title} Book Cover`
                : `No Book Cover available for ${this.props.book.title}`
            }
            src={
              this.props.book.imageLinks
                ? this.props.book.imageLinks.thumbnail
                : "./images/NoCover.jpg"
            }
          />

          <BookShelfChanger
            onShelfChanged={newShelf => {
              this.props.onChangeBookShelf(newShelf, this.props.book);
            }}
            selectedShelf={this.props.book.shelf}
          />
        </div>
        <div className="book-title">{this.props.book.title}</div>

        {this.props.book.authors && (
          <div className="book-authors">
            {this.props.book.authors.join(" and ")}
          </div>
        )}
      </div>
    );
  }
}

export default Book;
