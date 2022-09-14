import React, { useState } from 'react'

const LoginComponent = ({ login }) => {

    const [user, setUsername] = useState('');
    const [pass, setPassword] = useState('');

    return (
        <div className="container">
            <input
                onChange={(text) => setUsername(text.target.value)}
                type="text" name="username" className="input-ctrl" placeholder="Username" />
            <input
                onChange={(text) => setPassword(text.target.value)}
                type="password" name="password" className="input-ctrl" placeholder="Password" />
            <button
                onClick={() => login(user, pass)}
                className="input-btn">
                Login
            </button>
        </div>
    )
}

export default LoginComponent