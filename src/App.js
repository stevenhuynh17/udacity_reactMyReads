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
    currentlyReading: [
      {
        backgroundImage: "http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api",
        title: "To Kill a Mockingbird",
        author: "Harper Lee"
      },
      {
        backgroundImage: "http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api",
        title: "Ender's Game",
        author: "Orson Scott Card"
      }
    ],
    wantToRead: [
      {
        backgroundImage: "http://books.google.com/books/content?id=uu1mC6zWNTwC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73pGHfBNSsJG9Y8kRBpmLUft9O4BfItHioHolWNKOdLavw-SLcXADy3CPAfJ0_qMb18RmCa7Ds1cTdpM3dxAGJs8zfCfm8c6ggBIjzKT7XR5FIB53HHOhnsT7a0Cc-PpneWq9zX&source=gbs_api",
        title: "1776",
        author: "David McCullough"
      },
      {
        backgroundImage: "http://books.google.com/books/content?id=wrOQLV6xB-wC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72G3gA5A-Ka8XjOZGDFLAoUeMQBqZ9y-LCspZ2dzJTugcOcJ4C7FP0tDA8s1h9f480ISXuvYhA_ZpdvRArUL-mZyD4WW7CHyEqHYq9D3kGnrZCNiqxSRhry8TiFDCMWP61ujflB&source=gbs_api",
        title: "Harry Potter and the Sorcerer's Stone",
        author: "J.K. Rowling"
      }
    ],
    read: [
      {
        backgroundImage: "http://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70Rw0CCwNZh0SsYpQTkMbvz23npqWeUoJvVbi_gXla2m2ie_ReMWPl0xoU8Quy9fk0Zhb3szmwe8cTe4k7DAbfQ45FEzr9T7Lk0XhVpEPBvwUAztOBJ6Y0QPZylo4VbB7K5iRSk&source=gbs_api",
        title: "The Hobbit",
        author: "J.R.R. Tolkien"
      },
      {
        backgroundImage: "http://books.google.com/books/content?id=1q_xAwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE712CA0cBYP8VKbEcIVEuFJRdX1k30rjLM29Y-dw_qU1urEZ2cQ42La3Jkw6KmzMmXIoLTr50SWTpw6VOGq1leINsnTdLc_S5a5sn9Hao2t5YT7Ax1RqtQDiPNHIyXP46Rrw3aL8&source=gbs_api",
        title: "Oh the Places You'll Go!",
        author: "Dr. Seuss"
      },
      {
        backgroundImage: "http://books.google.com/books/content?id=32haAAAAMAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72yckZ5f5bDFVIf7BGPbjA0KYYtlQ__nWB-hI_YZmZ-fScYwFy4O_fWOcPwf-pgv3pPQNJP_sT5J_xOUciD8WaKmevh1rUR-1jk7g1aCD_KeJaOpjVu0cm_11BBIUXdxbFkVMdi&source=gbs_api",
        title: "The Adventures of Tom Sawyer",
        author: "Mark Twain"
      }
    ],
    bookshelf: []
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((data) => {
        console.log(data)
        // this.setState(() => ({
        //   data
        // }))
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
    const blah = {
      backgroundImage: "",
      title: "To Kill a Mockingbird",
      author: "TESTING"
    }

    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <div className="list-books">
            <Header />
            <div className="list-books-content">
              <div>
                <button onClick={() => this.moveToCurrentRead(blah)}>TESTING</button>
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
          <Search />
        )}/>
      </div>
    )}
}

export default BooksApp
