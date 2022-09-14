import React, { useState } from 'react'
import axios from 'axios';

const SERVER_URL = "http://localhost:5000";

const SignedInComponent = ({ logout, user }) => {

    const [userItems, setUserItems] = useState([])

    const getUserItems = () => {
        axios.get(`${SERVER_URL}/items`, { withCredentials: true }, {
        }).then((res) => {
            console.log(res)
            setUserItems(res.data)
        }).catch((e) => {
            console.log(e)
            logout();
        })
    }
    return (
        <div>
            <h1>Hi {user.name}</h1>
            {
                userItems.map((item, idx) => (
                    <p>{item}</p>
                ))
            }
            <button
                onClick={() => getUserItems()}
                className="input-btn">
                Get User Items
            </button>
            <button
                onClick={() => logout()}
                className="input-btn">
                Logout
            </button>
        </div>
    )
}

export default SignedInComponent