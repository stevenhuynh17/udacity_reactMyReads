import React, { Component } from 'react'
import Book from './Book.jsx'

class Read extends Component {
  render() {
    const { books } = this.props

    return(
      <div className="bookshelf">
        <h2 className="bookshelf-title">Read</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book) => (
              <li key={book.title}>
                <Book
                  backgroundImage={book.backgroundImage}
                  title={book.title}
                  author={book.author}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default Read
