import React from 'react'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import CurrentlyReading from './CurrentlyReading.jsx'
import WantToRead from './WantToRead.jsx'
import Read from './Read.jsx'
import Header from './Header.jsx'
import Search from './Search.jsx'


class BooksApp extends React.Component {
  state = {
    currentlyReading: [],
    wantToRead: [],
    read: []
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((data) => {
        data.forEach((book) => {
          if(book.shelf === "wantToRead"){
            this.setState((currentState) => ({
              wantToRead: currentState.wantToRead.concat([book])
            }))
          } else if(book.shelf === "currentlyReading"){
            this.setState((currentState) => ({
              currentlyReading: currentState.currentlyReading.concat([book])
            }))
          } else if(book.shelf === "read"){
            this.setState((currentState) => ({
              read: currentState.read.concat([book])
            }))
          }
        })
      })
  }

  deleteOld = (previous, currentBook) => {
    if(previous === "wantToRead"){
      this.setState((currentState) => ({
        wantToRead: currentState.wantToRead.filter((book) => {
          return book !== currentBook
        })
      }))
    } else if(previous === "read"){
      this.setState((currentState) => ({
        read: currentState.read.filter((book) => {
          return book !== currentBook
        })
      }))
    } else if(previous === "currentlyReading"){
      this.setState((currentState) => ({
        currentlyReading: currentState.currentlyReading.filter((book) => {
          return book !== currentBook
        })
      }))
    }
  }

  handleChange = (book, event) => {
    if(event.target.value === "currentlyReading"){
      BooksAPI.update(book, "currentlyReading")
        .then(() => {
          const previous = book.shelf
          this.setState((currentState) => ({
            currentlyReading: currentState.currentlyReading.concat([book])
          }), this.deleteOld(previous, book))
        })
    } else if(event.target.value === "wantToRead"){
      BooksAPI.update(book, "wantToRead")
        .then(() => {
          const previous = book.shelf
          this.setState((currentState) => ({
            wantToRead: currentState.wantToRead.concat([book])
          }), this.deleteOld(previous, book))
        })
    } else if(event.target.value === "read"){
      BooksAPI.update(book, "read")
        .then(() => {
          const previous = book.shelf
          this.setState((currentState) => ({
            read: currentState.read.concat([book])
          }), this.deleteOld(previous, book))
        })
    }
  }

  checkImage = (book) => {
    if(book.imageLinks === undefined){
      console.log("NO IMAGE")
    } else {
      return book.imageLinks.thumbnail
    }
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <div className="list-books">
            <Header />
            <div className="list-books-content">
              <div>
                <CurrentlyReading
                  books={this.state.currentlyReading}
                  handleChange={this.handleChange}
                  checkImage={this.checkImage}
                />
                <WantToRead
                  books={this.state.wantToRead}
                  handleChange={this.handleChange}
                  checkImage={this.checkImage}
                />
                <Read
                  books={this.state.read}
                  handleChange={this.handleChange}
                  checkImage={this.checkImage}
                />
              </div>
            </div>
            <div className="open-search">
              <Link
                to="/search">
                Add a Book
              </Link>
            </div>
          </div>
        )}/>
        <Route path="/search" render={() => (
          <Search
            books={this.state.bookshelf}
            handleChange={this.handleChange}
            checkImage={this.checkImage}
          />
        )}/>
      </div>
    )}
}

export default BooksApp
