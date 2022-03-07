
import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Menu extends Component {
    render() {
        return (
            <div>
                <h3><NavLink to='/'>Home</NavLink></h3>
                <h3><NavLink to='/add-book'>Add Book</NavLink></h3>
                <h3><NavLink to='/books'>View Books</NavLink></h3>
            </div>
        )
    }
}

export default Menu