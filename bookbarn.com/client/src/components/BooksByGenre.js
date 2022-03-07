import React, { Component } from 'react';

class BooksByGenre extends Component {
    constructor() {
        super()
        this.state = {
            genre: ''
        }
    }

    getBooksByGenre = (event) => {
        this.setState({
            genre: event.target.value
        })
    }

    render() {
        const booksbyGenre = this.props.books.map(book => {
            if (this.state.genre === '') {
                return null;
            } else if (book.genre === this.state.genre) {
                return <div key={book.id}><b>{book.title}</b> - {book.genre} - {book.publisher} - {book.year} <button onClick={this.updateBook}>Update</button><button onClick={this.deleteBook}>Delete</button><div><img src={book.imageURL} width='10%' alt="" /></div></div>
            }
        })

        const genreArray = []
        const getGenres = this.props.books.map(book => {
            if (genreArray.includes(book.genre)) {
                return null;
            } else {
                genreArray.push(book.genre);
                return <option key={book.id}>{book.genre}</option>;
            }
        })
        return (
            <div>
                <h2>Filter books by genre:</h2>
                <select onChange={this.getBooksByGenre}>
                    {getGenres}
                </select>
                {booksbyGenre}
            </div>
        )
    }
}

export default BooksByGenre