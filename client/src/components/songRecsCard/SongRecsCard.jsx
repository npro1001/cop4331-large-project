import React from 'react'
import './SongRecsCard.css'
import { useDispatch } from 'react-redux'
import { getRecommended } from '../../features/spotify/spotifySlice'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useState } from 'react'
import loadingCir from '../../img/loading-gif.gif'



const SongRecsCard = () => {
    const { isConnected } = useSelector((store) => store.spotify)

    const dispatch = useDispatch()
    const [list, setList] = useState();
    const [spotifyLoading, setSpotifyLoading] = useState(true)
    let loaded = false


    let tracks = [];

    useEffect(() => {

        if (isConnected) {
            if(loaded)
            {
                dispatch(getRecommended())
                .then(response => {
                    console.log(response)

                    //randomly choice 3 numbers 
                    let choices = Array.from(Array(20),(x,i)=>i)
                    var num = Math.floor(Math.random() * choices.length);
                    
                    var pick = choices.splice(num,1)
                    let one = pick;
                    console.log(one)

                    num = Math.floor(Math.random() * choices.length);
                    let two = choices.splice(num,1)
                    console.log(two)

                    num = Math.floor(Math.random() * choices.length);
                    let three = choices.splice(num,1)
                    console.log(three)


                    tracks = [
                        { name: response.payload.data.tracks[one].name, artist: response.payload.data.tracks[one].artists[0].name, img: response.payload.data.tracks[one].album.images[0].url },
                        { name: response.payload.data.tracks[two].name, artist: response.payload.data.tracks[two].artists[0].name, img: response.payload.data.tracks[two].album.images[0].url },
                        { name: response.payload.data.tracks[three].name, artist: response.payload.data.tracks[three].artists[0].name, img: response.payload.data.tracks[three].album.images[0].url },
                    ]

                    setList(tracks);
                    setSpotifyLoading(false)
                })
            }
            loaded = true;

        }
    }, [], [], []); //! Important


    if (list && !spotifyLoading) {
        return (
            <div className="SongRecsCard">
                <h3>You might like...</h3>

                {list.map((songrec, id) => {
                    return (
                        <div className="songrec" key={id}>
                            <div>
                                <img src={songrec.img} alt="" className='songrecImg' />
                                <div className="songname">
                                    <span>{songrec.name}</span>
                                    <span>{songrec.artist}</span>
                                </div>
                            </div>
                            {/*<button className='button sr-button'></button>*/}
                        </div>
                    )
                })}
            </div>
        )
    }

    else {
        return (<img className="loadingCircle" src={loadingCir} alt="loading" />)
    }
}

export default SongRecsCard