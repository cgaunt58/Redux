import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreators from '../store/creators/actionCreators'

function MenuLoggedOut() {
    // edit menu component - use ternary operator

    return (
        <div>
            {/* <div><NavLink to='/'>Home</NavLink></div> */}
            <div><NavLink to='/register'>Register</NavLink></div>
            <div><NavLink to='/login'>Login</NavLink></div>
            <div><NavLink to='/add-book'>Add Book</NavLink></div>
            <div><NavLink to='/view-books'>View All Books</NavLink></div>
        </div>
    )
}

function MenuLoggedIn() {
    return (
        <div>
            <div><NavLink to='/add-book'>Add Book</NavLink></div>
            <div><NavLink to='/view-books'>View All Books</NavLink></div>
            <div><NavLink to='/favorites'>Favorites</NavLink></div>
        </div>
    )
}

function BaseLayout(props) {
    // check if authenticated
    if (props.isAuthenticated) {
        return (
            <div>
                <MenuLoggedIn />
                <h3>Cart: {props.cart}</h3>
                <button onClick={() => props.onLogout()}>Logout</button>
                {props.children}

            </div>
        )
    } else if (!props.isAuthenticated) {
        return (
            <div>
                <MenuLoggedOut />
                {props.children}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.userReducer.isAuthenticated,
        cart: state.cartReducer.cart
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: () => dispatch(actionCreators.logOut())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BaseLayout)