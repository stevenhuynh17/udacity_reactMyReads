import React, { Component } from 'react'
import Book from './Book.jsx'

class WantToRead extends Component {
  state ={
    status: "wantToRead"
  }

  render() {
    const { books } = this.props

    return(
      <div className="bookshelf">
        <h2 className="bookshelf-title">Want to Read</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book) => (
              <li key={book.title}>
                <Book
                  backgroundImage={book.backgroundImage}
                  title={book.title}
                  author={book.author}
                  status={this.state.status}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default WantToRead
