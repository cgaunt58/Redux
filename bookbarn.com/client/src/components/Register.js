import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Register() {
    const [user, setUser] = useState()
    const navigate = useNavigate()

    const handleTextChange = (event) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        })
    }

    const handleRegister = () => {
        fetch('http://localhost:8080/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then(response => response.json())
            .then(() => {
                navigate('/login')
            })
    }

    return (
        <div>
            <input type="text" placeholder="Username" name='username' onChange={handleTextChange} />
            <input type="password" placeholder="Password" name='password' onChange={handleTextChange} />
            <button onClick={handleRegister}>Register</button>
        </div>
    )
}

export default Register