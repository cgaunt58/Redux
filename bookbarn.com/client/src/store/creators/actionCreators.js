

import * as actionTypes from '../actions/actionTypes'

export const logIn = (username) => {
    return {
        type: actionTypes.LOGGED_IN,
        payload: username
    }
}

export const logOut = () => {
    return {
        type: actionTypes.LOGGED_OUT
    }
}

export const addToCart = () => {
    return {
        type: actionTypes.ADD_TO_CART
    }
}

export const addFavorite = (bookTitle) => {
    return {
        type: actionTypes.ADD_FAVORITE,
        payload: bookTitle
    }
}

export const getAllBooks = () => {
    return (dispatch) => {
        fetch('http://localhost:8080/books')
            .then(response => response.json())
            .then(books => {
                dispatch({
                    type: actionTypes.ALL_BOOKS,
                    payload: books
                })
            })
    }
}