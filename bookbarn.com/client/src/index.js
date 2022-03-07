
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import AddBook from './components/AddBook';
import ViewBooks from './components/ViewBooks';
import Register from './components/Register';
import Login from './components/Login';
import BaseLayout from './components/BaseLayout';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import { Provider } from 'react-redux';
import Favorites from './components/Favorites';
import userReducer from './store/reducers/user'
import cartReducer from './store/reducers/cart'
import favoritesReducer from './store/reducers/favorites'
import booksReducer from './store/reducers/books'
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  userReducer: userReducer,
  cartReducer: cartReducer,
  favoritesReducer: favoritesReducer,
  booksReducer: booksReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <BaseLayout>
          <Routes>
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/add-book' element={<AddBook />} />
            <Route path='/view-books' element={<ViewBooks />} />
            <Route path='/favorites' element={<Favorites />} />
          </Routes>
        </BaseLayout>

      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();