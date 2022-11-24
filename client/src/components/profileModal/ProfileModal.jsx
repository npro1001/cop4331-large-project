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
    const [tempAnthem, setTempAnthem] = useState(null)
    const [songList, setSongList] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    let searching = false;
    let results = false;

    useEffect(() => {
        setTempName(user.name);
        setTempUsername(user.username);
        setTempAnthem(user.anthem);
        searching = false;
    })

    const handleChange = async (e) => {
        e.preventDefault();
        // const res = await fetch('/api/users/search', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ payload: e.value })
        // })
        // console.log(e.value)
        // console.log(e.target.value)
        setSearchTerm(e.target.value)
        dispatch(searchTracks(e.target.value))
        .then((response) => {
            setSongList(response.payload.data.tracks.items)
            console.log(response)
            // console.log(response.payload.data.tracks.items)
            // const songArray = response.json()
        })
        // setTerm(e.target.value.replace(/[^a-z]/gi, ' '));
    }

    const onClick = (e) => {
        console.log("clicked " + e)
    }

    if (searchTerm.length > 0) {
        searching = true;
    } else {
        searching = false;
    }
    

    return(
        <Modal
            overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
            overlayOpacity={0.55}
            overlayBlur={3}
            size='55%'
            opened = {modalOpened}
            onClose={() => {setModalOpened(false); searching=false;}}>

            {tempName && tempUsername ? 
            (<form className='infoForm'>
                <h3>Update your info</h3>
                <div>
                    <input type="text" className="infoInput" name="Name" placeholder={tempName}/>
                    <input type="text" className="infoInput" name="Username" placeholder={tempUsername}/>
                </div>
                    {searching ? (<div className="searchContainer">
                        <input type="text" className="infoInput" name="Anthem" placeholder={tempAnthem} onChange={handleChange}/>
                        <ResultsContainer style={{ display: searching ? "inline" : "none" }}>
                        {songList.map((song, index) => {
                        return (
                            <div key={index} onClick={onClick}>
                                <List>
                                    <Results>
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
                        <input type="text" className="infoInput" name="Anthem" placeholder={tempAnthem} onChange={handleChange}/>
                    </div>)}
                <div>
                    Profile image 
                    <input type="file" name='profileImg'/>
                    Cover image 
                    <input type="file" name='coverImg'/>
                </div>
                <button className='button infoButton'>Update</button>
            </form>) : (<form className='infoForm'>
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
                <button className='button infoButton'>Update</button>
            </form>) }
        </Modal>
    );
}

export default ProfileModal