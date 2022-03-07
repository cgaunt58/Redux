import React, { useState } from "react"
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actionCreators from '../store/creators/actionCreators'

function Login(props) {

    const [user, setUser] = useState()
    const navigate = useNavigate()

    const handleTextChange = (event) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        })
    }

    const handleLogin = () => {
        fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then(response => response.json())
            .then(result => {
                if (result.message === 'SUCCESS') {
                    props.onLogin(result.username)
                    alert('You are logged in!')
                    // put username in global state
                    // result.username
                    navigate('/view-books')
                } else {
                    alert('Error: please check your username and password.')
                }
            })


    }

    return (
        <div>
            <input type="text" placeholder="Username" name='username' onChange={handleTextChange} />
            <input type="password" placeholder="Password" name='password' onChange={handleTextChange} />
            <button onClick={handleLogin}>Login</button>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogin: (username) => dispatch(actionCreators.logIn(username))
    }
}


export default connect(null, mapDispatchToProps)(Login)

