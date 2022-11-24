import React from 'react'
import './SongCard.css'
import styled from "styled-components";


const SongCard = ({name, artist1, image, url}) => {
    return (
        <div className="SongCard">
            <div className="song">
                <div>
                <img src={image} alt="" className='songImg'/>
                        <div className="songname">
                                <span>{name}</span>
                                <span>{artist1}</span>
                        </div>
                </div>
                {/*<button className='button sr-button'></button>*/}
            </div>
        </div>
    )
}

export default SongCard