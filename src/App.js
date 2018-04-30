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
        backgroundImage: "",
        title: "",
        author: ""
      },
      {
        backgroundImage: "",
        title: "",
        author: ""
      },
      {
        backgroundImage: "",
        title: "",
        author: ""
      }
    ]
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((data) => {
        console.log(data)
      })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <div className="list-books">
            <Header />
            <div className="list-books-content">
              <div>
                <CurrentlyReading books={this.state.currentlyReading}/>
                <WantToRead books={this.state.wantToRead}/>
                <Read />
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
