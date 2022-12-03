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
import { getMe, uploadPFP } from '../../features/auth/authSlice';


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

function ProfileModal({ modalOpened, setModalOpened, data }) {
    const theme = useMantineTheme();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userCall = useSelector((state) => state.auth.user)
    const [user, setUser] = useState({})
    const [profileImage, setProfileImage] = useState(null)
    const [coverImage, setCoverImage] = useState(null)
    const [songList, setSongList] = useState([])
    const [searchTerm, setSearchTerm] = useState("")

    const [tempName, setTempName] = useState(null)
    const [tempUsername, setTempUsername] = useState(null)

    const [tempAnthemId, setTempAnthemId] = useState(null)
    const [tempAnthemName, setTempAnthemName] = useState(null)
    const [tempAnthemImage, setTempAnthemImage] = useState(null)
    const [tempAnthemArtist1, setTempAnthemArtist1] = useState(null)
    const [tempAnthemUrl, setTempAnthemUrl] = useState(null)

    const [holdName, setHoldName] = useState(null)
    const [holdUsername, setHoldUsername] = useState(null)

    let creds;
    let searching = false;

    useEffect(() => {

        const fetchProfileUser = async () => {

            setUser(userCall);
            setHoldName(data.name);
            setHoldUsername(data.username);

            searching = false;
        }
        fetchProfileUser()

    }, [user])


    const picUpload = () => {
        const prof = new FormData();
        prof.append("picture", profileImage);
        prof.append("id", user._id)
        dispatch(uploadPFP(prof))
    }

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];

            event.target.name === "picture" ? setProfileImage(img) : setCoverImage(img)
        }
    };

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




        //user didnt change anything
        if (tempName == null && tempUsername == null && tempAnthemName == null && profileImage == null) {
            creds = {
                name: data.name,
                username: data.username,
                anthemId: data.anthem.id,
                anthemTitle: data.anthem.title,
                anthemArtist1: data.anthem.artist1,
                anthemImage: data.anthem.image,
                anthemUrl: data.anthem.url
            }
        }

        //user changes everything
        else if (tempName != null && tempUsername != null && tempAnthemName != null) {

            creds = {
                name: tempName,
                username: tempUsername,
                anthemId: tempAnthemId,
                anthemTitle: tempAnthemName,
                anthemArtist1: tempAnthemArtist1,
                anthemImage: tempAnthemImage,
                anthemUrl: tempAnthemUrl
            }

        }

        //user changes their name and anthem
        else if (tempUsername == null && tempName != null && tempAnthemName != null) {
            creds = {
                name: tempName,
                username: data.username,
                anthemId: tempAnthemId,
                anthemTitle: tempAnthemName,
                anthemArtist1: tempAnthemArtist1,
                anthemImage: tempAnthemImage,
                anthemUrl: tempAnthemUrl
            }
        }

        //user changes their username and anthem
        else if (tempName == null && tempAnthemName != null && tempUsername != null) {
            creds = {
                name: data.name,
                username: tempUsername,
                anthemId: tempAnthemId,
                anthemTitle: tempAnthemName,
                anthemArtist1: tempAnthemArtist1,
                anthemImage: tempAnthemImage,
                anthemUrl: tempAnthemUrl
            }
        }

        //user changes their name and username
        else if (tempAnthemName == null && tempUsername != null && tempName != null) {
            creds = {
                name: tempName,
                username: tempUsername,
                anthemId: data.anthem.id,
                anthemTitle: data.anthem.title,
                anthemArtist1: data.anthem.artist1,
                anthemImage: data.anthem.image,
                anthemUrl: data.anthem.url
            }
        }

        //user changes only their anthem
        else if (tempName == null && tempUsername == null && tempAnthemName != null) {
            creds = {
                name: data.name,
                username: data.username,
                anthemId: tempAnthemId,
                anthemTitle: tempAnthemName,
                anthemArtist1: tempAnthemArtist1,
                anthemImage: tempAnthemImage,
                anthemUrl: tempAnthemUrl
            }
        }

        //user changes only their name
        else if (tempUsername == null && tempAnthemName == null && tempName != null) {
            creds = {
                name: tempName,
                username: data.username,
                anthemId: data.anthem.id,
                anthemTitle: data.anthem.title,
                anthemArtist1: data.anthem.artist1,
                anthemImage: data.anthem.image,
                anthemUrl: data.anthem.url
            }
        }


        //user changes only their username
        else if (tempName == null && tempAnthemName == null && tempUsername != null) {
            creds = {
                name: data.name,
                username: tempUsername,
                anthemId: data.anthem.id,
                anthemTitle: data.anthem.title,
                anthemArtist1: data.anthem.artist1,
                anthemImage: data.anthem.image,
                anthemUrl: data.anthem.url
            }
        }

        dispatch(updateUser(
            creds))
            .then(async (updateUserRes) => {
                if (profileImage) {
                    picUpload();
                }

                setUser(updateUserRes.payload)
                // setModalOpened(false);
                navigate(
                    `/profile/${updateUserRes.payload.username}`)

                // window.location.reload();


            })
    }


    return (
        <Modal
            overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
            overlayOpacity={0.55}
            overlayBlur={3}
            size='55%'
            opened={modalOpened}
            onClose={() => { setModalOpened(false); searching = false; }}>

            {/* FILL PLACEHOLDERS WITH CURRENT NAME AND USERNAME*/}
            {holdName && holdUsername ?
                (<form className='infoForm' onSubmit={handleSubmit}>
                    <h3>Update your info</h3>
                    <div>
                        <input type="text" className="infoInput" name="Name" placeholder={user.name} onChange={(e) => setTempName(e.target.value)} />
                        <input type="text" className="infoInput" name="Username" placeholder={user.username} onChange={(e) => setTempUsername(e.target.value)} />
                    </div>

                    {/* IF ANTHEM EXISTS/SELECTED ... SHOW ON FORM */}
                    {user.anthem ? <div className="currentAnthem">
                        <SongCard name={user.anthem.title} artist1={user.anthem.artist1}
                            image={user.anthem.image} ></SongCard>
                    </div> : <></>}

                    {/* SHOW RESULTS LIST WHEN SEARCHING */}
                    {searching ? (<div className="searchContainer">
                        <input type="text" className="infoInput" value={searchTerm} name="Anthem" placeholder="Search for a song..." onChange={handleChange} />
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
                        {searchTerm != '' ? (<input type="text" className="infoInput" name="Anthem" placeholder={data.anthem.title} onChange={handleChange} />) :
                            (<input type="text" className="infoInput" name="Anthem" value={tempAnthemName} placeholder={tempAnthemName} onChange={handleChange} />)}

                    </div>)}
                    <div>
                        Profile image
                        <input type="file" name='picture' onChange={onImageChange} />
                        Cover image
                        <input type="file" name='coverImg' onChange={onImageChange} />
                    </div>
                    <button type='submit' className='button infoButton'>Update</button>
                </form>)
                : // IF SOMETHING GOES WRONG
                (<form className='infoForm'>
                    <h3>Your info</h3>
                    <div>
                        <input type="text" className="infoInput" name="Name" placeholder="Name" />
                        <input type="text" className="infoInput" name="Username" placeholder="Username" />
                    </div>
                    <div>
                        <input type="text" className="infoInput" name="Anthem" placeholder="Your Anthem" />
                    </div>
                    <div>
                        Profile image
                        <input type="file" name='picture' />
                        Cover image
                        <input type="file" name='coverImg' />
                    </div>
                    <button type='submit' className='button infoButton'>Update</button>
                </form>)}
        </Modal>
    );
}

export default ProfileModal