import React, { Component } from 'react'
import Book from './Book.jsx'

class currentlyReading extends Component {
  state = {
    status: "currentlyReading"
  }

  checkImage = (book) => {
    if(book.imageLinks === undefined){
      console.log("NO IMAGE")
    } else {
      return book.imageLinks.thumbnail
    }
  }

  render() {
    const { books, checkImage } = this.props

    return(
      <div className="bookshelf">
        <h2 className="bookshelf-title">Currently Reading</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book) => (
              <li key={book.title}>
                <Book
                  backgroundImage={checkImage(book)}
                  title={book.title}
                  author={book.authors}
                  status={this.state.status}
                  handleChange={this.props.handleChange}
                  book={book}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default currentlyReading
