import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../store/creators/actionCreators'

class ViewBooks extends Component {

    constructor() {
        super()
        this.state = {
            books: []
        }
    }

    handleBookDelete = (bookId) => {
        fetch(`http://localhost:8080/delete-book/${bookId}`, {
            method: 'DELETE'
        }).then(response => response.json())
            .then(result => {
                if (result.success) {
                    this.fetchAllBooks()
                }
            })
    }

    // fetchAllBooks = () => {
    //     fetch('http://localhost:8080/books')
    //         .then(response => response.json())
    //         .then(books => {
    //             this.setState({
    //                 books: books
    //             })
    //         })
    // }

    componentDidMount() {
        //this.fetchAllBooks()
        this.props.getAllBooks()
    }

    handleCartAdd = () => {
        this.props.onCartAdd()
    }

    render() {
        const bookItems = this.props.books.map(book => {
            return <div key={book.id}><b>{book.title}</b> - {book.genre} - {book.publisher} - {book.year} <button onClick={() => this.props.onFavorited(book.title)}>Favorite</button><button onClick={() => this.props.onCartAdd()}>Add to Cart</button> <button onClick={() => this.handleBookDelete(book.id)}>Delete</button><div><img src={book.imageURL} width='10%' alt="" /></div></div>
        })

        return (
            <div>
                <h1>Books</h1>
                {bookItems}

            </div>
        )
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        onCartAdd: () => dispatch(actionCreators.addToCart()),
        onFavorited: (bookTitle) => dispatch(actionCreators.addFavorite(bookTitle)),
        getAllBooks: () => dispatch(actionCreators.getAllBooks())
    }
}

const mapStateToProps = (state) => {
    return {
        books: state.booksReducer.books
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ViewBooks)