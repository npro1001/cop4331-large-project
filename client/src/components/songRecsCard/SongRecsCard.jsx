import React from 'react'
import './SongRecsCard.css'
import { SongRecs } from '../../Data/SongRecsData'

const SongRecsCard = () => {
    return (
        <div className="SongRecsCard">
            <h3>You might like...</h3>

            {SongRecs.map((songrec, id)=>{
                 return(
                    <div className="songrec" key={id}>
                        <div>
                        <img src={songrec.img} alt="" className='songrecImg'/>
                            <div className="songname">
                                <span>{songrec.songname}</span>
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

export default SongRecsCard