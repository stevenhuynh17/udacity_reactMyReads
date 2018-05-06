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
    read: [],
    status: ""
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

  handleChange = (book, event) => {
    console.log(this, "THIS")
    if(event.target.value === "currentlyReading"){
      this.setState((currentState) => ({
        status: "currentlyReading"
      }))
      BooksAPI.update(book, "currentlyReading")
    } else if(event.target.value === "wantToRead"){
      this.setState((currentState) => ({
        status: "wantToRead"
      }))
      BooksAPI.update(book, "wantToRead")
    } else if(event.target.value === "read"){
      this.setState((currentState) => ({
        status: "read"
      }))
      BooksAPI.update(book, "read")
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
                />
                <WantToRead
                  books={this.state.wantToRead}
                  handleChange={this.handleChange}
                />
                <Read
                  books={this.state.read}
                  handleChange={this.handleChange}
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
          />
        )}/>
      </div>
    )}
}

export default BooksApp
