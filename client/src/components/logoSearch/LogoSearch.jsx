import React from 'react'
import Logo from '../../img/logo.png'
import { UilSearch } from '@iconscout/react-unicons'
import './LogoSearch.css'
import { useState } from 'react'

const LogoSearch = () => {

    const [results, setResults] = useState([])

    function onKeyUp(e) {
        fetch('/api/spotify/search', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({payload: e.value})
        })
        .then(res => res.json())
        .then(data => {
            let payload = data.payload
            console.log(payload)

            // If no search results, return "nothing found" or dont pop up list
                // if(payload.length() < 1) {}

            // For each result, parse for the username, maybe the profile image, and add to list
            
            // Set the 'results' state to render the list container

        })
    }

    return (
        <div className="LogoSearch">
            <img src={Logo} alt="Logo" />
            <div className="Search">
                <input type="text" onKeyUp={onKeyUp} placeholder="#Explore" />
                <div className="s-icon">
                    <UilSearch />
                </div>
            </div>
        </div>
    )
}

export default LogoSearch