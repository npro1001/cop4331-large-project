import React, { useState } from "react"
import './InfoCard.css'
import { UilPen } from '@iconscout/react-unicons'
import ProfileModal from '../profileModal/ProfileModal'
import { logout, reset, getMe } from '../../features/auth/authSlice'
import { spotifyLogout } from '../../features/spotify/spotifySlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from "react"
import SongCard from "../SongCard/SongCard.jsx"
import { getTopArtist } from "../../features/spotify/spotifySlice"
import { putFavArtist, getFavArtist } from "../../features/auth/authSlice"
import loadingCir from '../../img/loading-gif.gif'
import styled from "styled-components";

const Container = styled.div`
    position: relative;
    align-self: center;
    justify-content: center;
    align-items: center;
    width: 30%;
    height: 40px;
    padding:auto;
    display:flex;
`
let loaded = false
let set = false
const InfoCard = ({ location }) => {

    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isConnected } = useSelector((store) => store.spotify)
    const user = useSelector((state) => state.auth.user)

    const [modalOpened, setModalOpened] = useState(false)
    const [topArtist, setTopArtist] = useState({});
    const [topGenre, setTopGenre] = useState(null);
    const [activeUser, setActiveUser] = useState({})
    const [topImage, setTopImage] = useState()
    const [anthem, setAnthem] = useState();
    const [spotifyLoading, setSpotifyLoading] = useState(true)
    let favArtist = {}

    const profileUsername = params.username;
    let profileUser;

    const fetchProfileUser = async () => {

        fetchTopArtist()
        if (profileUsername === user.username) {
            setActiveUser(user);
            setAnthem(user.anthem)
            getFavorite(user._id)

        }
        else {
            const res = await fetch(`/api/users/${profileUsername}`, {
                method: 'GET',
                headers: { 'Accept': 'application/json' },
            })
            profileUser = await res.json();
            setActiveUser(profileUser);
            if (profileUser.anthem) {
                setAnthem(profileUser.anthem)
            }

            getFavorite(profileUser._id)

        }
    }


    const fetchTopArtist = async () => {

        if (isConnected) {
            await dispatch(getTopArtist())
                .then(response => {

                    favArtist['name'] = response.payload.data.items[0].name;
                    favArtist['genre'] = response.payload.data.items[0].genres[1] + " "
                    favArtist['image'] = response.payload.data.items[0].images[0];
                })

            if (!set) {
                await dispatch(putFavArtist(favArtist))
                    .then(response => {
                        console.log(response)
                    })

                set = true;
            }

        }
    }

    const getFavorite = async (id) => {

        if (!loaded) {
            await dispatch(getFavArtist(id)).then(response => {
                console.log(response)
                setTopArtist(response.payload.name)
                setTopGenre(response.payload.genre)
                setTopImage(response.payload.image.url)
                setSpotifyLoading(false)
            })
        }
        loaded = true

    }

    useEffect(() => {
        fetchProfileUser()

    }, [isConnected, activeUser, anthem, user, topArtist, topGenre, topImage], []); //! Important 


    const onLogout = () => {
        dispatch(logout())
            .then(() => {
                if (isConnected) {
                    dispatch(spotifyLogout())
                }
                navigate("/", { replace: true })
            })
            .then(() => {
                dispatch(reset())
            })

    }

    return (
        <div className="InfoCard">
            <div className="InfoHead">
                <h4>Profile Info</h4>
                {user.username === activeUser.username ? (<div><UilPen width='2rem' height='1.2rem' onClick={() => setModalOpened(true)} />
                    <ProfileModal modalOpened={modalOpened}
                        setModalOpened={setModalOpened}
                        data={user} />
                </div>) : ("")
                }
            </div>
            <div className="info">
                <span>
                    <b>Anthem</b>
                </span>
                <span>
                    {anthem ?
                        <SongCard name={anthem.title} artist1={anthem.artist1} image={anthem.image} url={anthem.url}></SongCard>
                        :
                        " Anthem Not Selected"}
                </span>
            </div>
            <div className="info">
                <span>
                    <b>Top Artist</b>
                    <br></br>
                    <br></br>
                </span>
                <span>
                    {!spotifyLoading ? topArtist ? (
                        <div className="songrec">
                            <div className="topArtist">
                                <img src={topImage} alt={topArtist} className='songrecImg' />
                                <div className="songname">
                                    <span>{topArtist}</span>
                                </div>
                            </div>
                        </div>

                    ) : (
                        <div>
                            <p> Top Artist Not Found </p>
                        </div>
                    ) : <img className="loadingCircle" src={loadingCir} alt="loading" />}
                </span>
            </div >
            <div className="info">
                <span>
                    <b>Top Artist's Genre</b>
                    <br></br>
                    <br></br>
                </span>
                <span>
                    {!spotifyLoading ? topGenre ? (
                        <div>
                            -{topGenre}
                        </div>
                    ) : (
                        <div>
                            <p> Top Genre Not Found </p>
                        </div>
                    ) : <img className="loadingCircle" src={loadingCir} alt="loading" />}
                </span>
            </div>
            {(user.username === activeUser.username)
                ?
                <button className='button logout-button' onClick={onLogout}>Logout</button>
                : ""}


        </div >
    )
}

export default InfoCard