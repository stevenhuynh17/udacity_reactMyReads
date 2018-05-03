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
        console.log(data)
        data.forEach((book) => {
          if(book.shelf === "wantToRead"){
            this.moveToRead(book)
          } else if(book.shelf === "currentlyReading"){
            this.moveToCurrentRead(book)
          } else if(book.shelf === "read"){
            this.moveToRead(book)
          }
        })
      })
  }

  deleteCurrent = (book) => {
    if(book.status === "wantToRead"){
      this.setState((currentState) => ({
        wantToRead: currentState.wantToRead.filter((content) => {
          return content.title !== book.title
        })
      }))
    } else if(book.status === "currentlyReading"){
      this.setState((currentState) => ({
        currentlyReading: currentState.currentlyReading.filter((content) => {
          return content.title !== book.title
        })
      }))
    } else if(book.status === "read"){
      this.setState((currentState) => ({
        read: currentState.read.filter((content) => {
          return content.title !== book.title
        })
      }))
    }
  }

  moveToCurrentRead = (book) => {
    this.setState((currentState) => ({
      currentlyReading: currentState.currentlyReading.concat([book])
    }))
    this.deleteCurrent(book)
  }

  moveToWantRead = (book) => {
    this.setState((currentState) => ({
      wantToRead: currentState.wantToRead.concat([book])
    }))
    this.deleteCurrent(book)
  }

  moveToRead = (book) => {
    this.setState((currentState) => ({
      read: currentState.read.concat([book])
    }))
    this.deleteCurrent(book)
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
                  moveToWantRead={this.moveToWantRead}
                  moveToRead={this.moveToRead}
                />
                <WantToRead
                  books={this.state.wantToRead}
                  moveToCurrentRead={this.moveToCurrentRead}
                  moveToRead={this.moveToRead}
                />
                <Read
                  books={this.state.read}
                  moveToWantRead={this.moveToWantRead}
                  moveToCurrentRead={this.moveToCurrentRead}
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
            moveToWantRead={this.moveToWantRead}
            moveToCurrentRead={this.moveToCurrentRead}
            moveToRead={this.moveToRead}
          />
        )}/>
      </div>
    )}
}

export default BooksApp
