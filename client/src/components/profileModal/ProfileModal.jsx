import { Modal, useMantineTheme } from '@mantine/core'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import './ProfileModal.css'
import React from 'react'
import Logo from '../../img/logo.png'
import { UilSearch } from '@iconscout/react-unicons'
import styled from "styled-components";
import { searchTracks } from "../../features/spotify/spotifySlice"
import { updateUser } from "../../features/auth/authSlice"
import SongCard from "../SongCard/SongCard.jsx" 

const ResultsContainer = styled.div`
    /* margin-top: ; */
    background: white;
    /* height: 20%; */
    width: 100%;
    z-index:1;
    align-self: center;
    border-radius:10px;
    display: none;
    /* top: 40px;
    left:150px; */
    filter: drop-shadow(0 0 0.3rem black);
`

const List = styled.ul`
  list-style: none;

`

const Results = styled.li`
    text-decoration: none;
`
const Songs = styled.a`
text-decoration: none;
cursor: pointer;

&:hover {
        color:rgba(104,59,159,1);
    }

`

function ProfileModal({modalOpened, setModalOpened}) {
    const theme = useMantineTheme();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth)
    const [tempName, setTempName] = useState(null)
    const [tempUsername, setTempUsername] = useState(null)
    const [songList, setSongList] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    let searching = false;
    let results = false;
    const [tempAnthemId, setTempAnthemId] = useState(null)
    const [tempAnthemName, setTempAnthemName] = useState(null)
    const [tempAnthemImage, setTempAnthemImage] = useState(null)
    const [tempAnthemArtist1, setTempAnthemArtist1] = useState(null)
    const [tempAnthemUrl, setTempAnthemUrl] = useState(null)


    useEffect(() => {
        setTempName(user.name);
        setTempUsername(user.username);
        // if(user.anthem) {
        //     setTempAnthemName(user.anthem.name)
        //     // setTempAnthemImage(user.anthem.image)
        //     setTempAnthemName(user.anthem.name)
        // }
        searching = false;
    }) //[tempAnthemName])

    const handleChange = async (e) => {
        e.preventDefault();
        setSearchTerm(e.target.value)
        dispatch(searchTracks(e.target.value))
        .then((response) => {
            setSongList(response.payload.data.tracks.items)
            console.log(response)     
        })
    }

    const handleClick = (e, song) => {
        console.log("clicked " + song.name)
        // TODO Only choose song on a double click
        // if (e.detail === 2) {
            // console.log('double clicked!')
            setTempAnthemName(song.name)
            setTempAnthemArtist1(song.artists[0].name)
            setTempAnthemImage(song.album.images[0].url)
            setTempAnthemId(song.id)
            setTempAnthemUrl(song.preview_url)
            setSearchTerm('');
            
    }

    if (searchTerm.length > 0) {
        searching = true;
    } else {
        searching = false;
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        dispatch(updateUser({
            name: tempName,
            username: tempUsername,
            anthemId: tempAnthemId,
            anthemTitle: tempAnthemName,
            anthemArtist1: tempAnthemArtist1,
            anthemImage: tempAnthemImage,
            anthemUrl: tempAnthemUrl}))
        .then((response) => {
            // console.log(JSON.stringify(response))
            window.location.reload()
        })
    }
    

    return(
        <Modal
            overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
            overlayOpacity={0.55}
            overlayBlur={3}
            size='55%'
            opened = {modalOpened}
            onClose={() => {setModalOpened(false); searching=false;}}>
            
            {/* FILL PLACEHOLDERS WITH CURRENT NAME AND USERNAME*/}
            {tempName && tempUsername ? 
            (<form className='infoForm' onSubmit={handleSubmit}>
                <h3>Update your info</h3>
                <div>
                    <input type="text" className="infoInput" name="Name" value={tempName} placeholder={tempName} />
                    <input type="text" className="infoInput" name="Username" value={tempUsername} placeholder={tempUsername} />
                </div>

                {/* IF ANTHEM EXISTS/SELECTED ... SHOW ON FORM */}
                {tempAnthemName ? <div className="currentAnthem">
                    <SongCard name={tempAnthemName} artist1={tempAnthemArtist1} 
                            image={tempAnthemImage} ></SongCard>
                            </div> : <></>}

                {/* SHOW RESULTS LIST WHEN SEARCHING */}
                {searching ? (<div className="searchContainer">
                    <input type="text" className="infoInput" value={searchTerm} name="Anthem" placeholder="Search for a song..." onChange={handleChange}/>
                    <ResultsContainer style={{ display: searching ? "inline" : "none" }}>
                    {songList.map((song, index) => {
                        return (
                            <div key={index}>
                                <List>
                                    <Results onClick={(e) => handleClick(e, song)}>
                                        <SongCard 
                                        name={song.name} 
                                        artist1={song.artists[0].name} 
                                        image={song.album.images[0].url} 
                                        url={song.url}
                                        ></SongCard>
                                    </Results>
                                </List>
                            </div>
                        )
                        })}
                    </ResultsContainer>
                    </div>) : (<div className="ResultsContainer">
                        <input type="text" className="infoInput" name="Anthem" placeholder={tempAnthemName} onChange={handleChange}/>
                    </div>)}
                <div>
                    Profile image 
                    <input type="file" name='profileImg'/>
                    Cover image 
                    <input type="file" name='coverImg'/>
                </div>
                <button type='submit' className='button infoButton'>Update</button>
            </form>) 
            : // IF SOMETHING GOES WRONG
            (<form className='infoForm'>
                <h3>Your info</h3>
                <div>
                    <input type="text" className="infoInput" name="Name" placeholder="Name"/>
                    <input type="text" className="infoInput" name="Username" placeholder="Username"/>
                </div>
                <div>
                    <input type="text" className="infoInput" name="Anthem" placeholder="Your Anthem"/>
                </div>
                <div>
                    Profile image 
                    <input type="file" name='profileImg'/>
                    Cover image 
                    <input type="file" name='coverImg'/>
                </div>
                <button type='submit' className='button infoButton'>Update</button>
            </form>) }
        </Modal>
    );
}

export default ProfileModal