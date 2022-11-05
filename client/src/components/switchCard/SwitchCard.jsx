import React from "react";
import './SwitchCard.css'
import Spotify from '../../img/spotify.png'
import Apple from '../../img/applemusic.png'

const SwitchCard = () => {
    return (
        <div className="SwitchCard">
            <h3>Swap your Anthems</h3>
            <div className="Spotify">
                <img src={Spotify} alt="" />
                <button className="sp-button">Start with Spotify</button>
            </div>

            <div className="AppleMusic">
                <img src={Apple} alt="" />
                <button className="am-button">Start with Apple Music</button>
            </div>
            
        </div>
    )
}

export default SwitchCard