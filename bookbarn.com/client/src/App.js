import React, { Component } from 'react';
import AddBook from './components/AddBook';
import BooksByGenre from './components/BooksByGenre';
import Favorites from './components/Favorites';
import Login from './components/Login';
import ViewBooks from './components/ViewBooks';

class App extends Component {

  constructor() {
    super()
    this.state = {
      books: []
    }
  }

  fetchAllBooks = () => {
    fetch('http://localhost:8080/books')
      .then(response => response.json())
      .then(books => {
        this.setState({
          books: books
        })
      })
  }

  componentDidMount() {
    this.fetchAllBooks()
  }

  handleOnBookAdded = () => {
    this.fetchAllBooks()
  }

  handleOnBookUpdated = () => {
    console.log('called on book updated')
  }

  render() {
    return (
      <div>
        <h1>Book Barn Website</h1>
        <Login />
        <AddBook onBookAdded={this.handleOnBookAdded} />
        <BooksByGenre books={this.state.books} />
        <ViewBooks books={this.state.books} onBookUpdated={this.handleOnBookUpdated} />
        <Favorites />
      </div>
    )
  }

}

export default App