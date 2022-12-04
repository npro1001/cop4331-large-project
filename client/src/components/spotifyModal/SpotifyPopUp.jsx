import { Modal, useMantineTheme } from '@mantine/core'
import { useState } from 'react';
import { useDispatch } from 'react-redux'
import React from 'react'
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
    position:relative;
    display: none;
bottom: 10px;
    filter: drop-shadow(0 0 0.3rem black);
`

const List = styled.ul`
  list-style: none;

`
const SelectButton = styled.button`
    width: 6rem;
    height: 2rem;
    align-self: flex-end;
    padding: 11px;
    font-size: 15px;
    font-weight: 500;
    border: none;
    color: white;
    background: #CDBEE0;
    border-radius: 15px;
    cursor: pointer;
    transition: all, 240ms ease-in-out;
    background: var(--purple);
    text-shadow: 0 0 2px #999;
    font-family: 'Ubuntu', sans-serif;
    position: relative;
    bottom:60px;

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
let songs;
let selected;
function SpotifyPopUp({ modalOpened, setModalOpened, getInfo }) {
    const theme = useMantineTheme();


    const dispatch = useDispatch();


    const [songList, setSongList] = useState([])
    const [searchTerm, setSearchTerm] = useState("")

    const [clicked, setClicked] = useState(null)


    const [tempAnthemId, setTempAnthemId] = useState("")
    const [tempAnthemName, setTempAnthemName] = useState("")
    const [tempAnthemImage, setTempAnthemImage] = useState("")
    const [tempAnthemArtist1, setTempAnthemArtist1] = useState("")
    const [tempAnthemUrl, setTempAnthemUrl] = useState("")



    let searching = false;



    const handleChange = async (e) => {
        e.preventDefault();
        setSearchTerm(e.target.value)

        if (e.target.value.length != 0) {
            dispatch(searchTracks(e.target.value))
                .then((response) => {
                    setSongList(response.payload.data.tracks.items)
                })
        }

    }

    const handleClick = (e, song) => {
        console.log("clicked " + song.name)
        setClicked(true);
        setTempAnthemName(song.name)
        setTempAnthemArtist1(song.artists[0].name)
        setTempAnthemImage(song.album.images[0].url)
        setTempAnthemId(song.id)
        setTempAnthemUrl(song.preview_url)
        setSearchTerm('');
        document.getElementById("searchBar").value = song.name

        songs = {
            name: song.name,
            artist: song.artists[0].name,
            image: song.album.images[0].url,
            url: song.preview_url
        }

        console.log(songs)

    }

    if (searchTerm.length > 0) {
        searching = true;
    } else {
        searching = false;
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // console.log({songs})
        // getInfo(songs)
        // setModalOpened(false)
    }

    const handleCallBack = () => {

        console.log(tempAnthemUrl)
        //if user selected a new song
        if (songs) {
            getInfo(songs)
        }

       
        else {
            songs = {
                name: tempAnthemName,
                artist: tempAnthemArtist1,
                image: tempAnthemImage,
                url: tempAnthemUrl
            }

            getInfo(songs)
        }

        setModalOpened(false)
    }



    return (
        <Modal
            overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
            overlayOpacity={0.55}
            overlayBlur={3}
            size='55%'
            opened={modalOpened}
            onClose={() => { setModalOpened(false); searching = false; }}>

            <form className='infoForm' onSubmit={handleSubmit}>
                <h3>Search for a song</h3>
                {/*display song user clicked on*/}
                {clicked ? <div className="currentAnthem">
                    <SongCard name={tempAnthemName} artist1={tempAnthemArtist1}
                        image={tempAnthemImage} ></SongCard>
                </div> : <></>}

                {/* SHOW RESULTS LIST WHEN SEARCHING */}
                {searching ? (<div className="searchContainer">
                    <input id="searchBar" type="text" className="infoInput" name="Anthem" placeholder="Search for a song..." onChange={handleChange} />
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
                                            />
                                        </Results>
                                    </List>
                                </div>
                            )
                        })}
                    </ResultsContainer>
                </div>) : (<div className="ResultsContainer">
                    {searchTerm != '' ? (<input type="text" className="infoInput" name="Anthem" placeholder="Search for a Song" onChange={handleChange} />) :
                        (<input type="text" className="infoInput" name="Anthem" placeholder={tempAnthemName} onChange={handleChange} />)}

                </div>)}

                <SelectButton className='button' onClick={handleCallBack}>Select</SelectButton>
            </form>

        </Modal>
    );
}

export default SpotifyPopUp