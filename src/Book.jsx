import React, { Component } from 'react'

class Book extends Component {
  state = {
    status: this.props.status
  }

  handleChange = (event) => {
    if(event.target.value === "currentlyReading"){
      this.props.moveToCurrentRead(this.props)
      event.persist()
      this.setState((currentState) => ({
        status: event.target.value
      }))
    } else if(event.target.value === "wantToRead"){
      this.props.moveToWantRead(this.props)
      event.persist()
      this.setState((currentState) => ({
        status: event.target.value
      }))
    } else if(event.target.value === "read"){
      this.props.moveToRead(this.props)
      event.persist()
      this.setState((currentState) => ({
        status: event.target.value
      }))
    }
  }

  render() {
    const { backgroundImage, title, author } = this.props

    return(
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url(${backgroundImage})` }}></div>
          <div className="book-shelf-changer">
            <select value={this.state.status} onChange={this.handleChange}>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read" >Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{author}</div>
      </div>
    )
  }
}

export default Book
