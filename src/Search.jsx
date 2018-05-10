import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book.jsx'

class Search extends Component {
  state = {
    query: "",
    bookshelf: []
  }


  updateQuery = (query) => {
    this.setState(() => ({
      query: query.trim()
    }))
    if(query === ""){
      this.setState((currentState) => ({
        bookshelf: []
      }))
    } else {
      BooksAPI.search(query)
        .then((data) => {
          this.setState((currentState) => ({
            bookshelf: data
          }))
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  render() {
    const { query, bookshelf } = this.state
    const { books, checkImage } = this.props

    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            to="/"
            className="close-search">
          </Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        {this.state.bookshelf.length >= 0 &&(
          <div className="search-books-results">
            <ol className="books-grid">
              {bookshelf.map((book) => (
                <li key={book.id}>
                  <Book
                    backgroundImage={checkImage(book)}
                    title={book.title}
                    author={book.authors || []}
                    status={"none"}
                    handleChange={this.props.handleChange}
                    book={book}
                  />
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    )
  }
}

export default Search
