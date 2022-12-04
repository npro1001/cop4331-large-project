import React from 'react'
import './SongCard.css'
import styled from "styled-components";
import { Howl } from "howler"
import { useState } from 'react';

var audio = null;
// id?
const SongCard = ({ name, artist1, image, url }) => {

    const soundPlay = () => {

        //check if its already playing, if it is then stop
        if (audio != null) {
           
            audio.stop();
            audio.unload();
            audio = null;
        }

        //if not play the song
        else{
            audio = new Howl({
                src: [url],
                html5: true
            })
            audio.play();
            audio.fade(2.0,0);
        }
        
        
    }

    
    return (
        <div className="SongCard">
            <div className="song">
                <div onClick={soundPlay}>
                    <img src={image} alt="" className='songImg' />
                    <div className="songnameInfo">
                        <span>{name}</span>
                        <span>{artist1}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SongCard