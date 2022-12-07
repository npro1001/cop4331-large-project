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



const InfoCard = ({ location }) => {

    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isConnected } = useSelector((store) => store.spotify)
    const user = useSelector((state) => state.auth.user)

    const [modalOpened, setModalOpened] = useState(false)
    const [topArtist, setTopArtist] = useState({});
    const [topGenres, setTopGenres] = useState(null);
    const [activeUser, setActiveUser] = useState({})
    const [fav, setFav] = useState()
    const [anthem, setAnthem] = useState();
    const [spotifyLoading, setSpotifyLoading] = useState(true)
    let favArtist = {}

    const profileUsername = params.username;
    let profileUser;

    const fetchProfileUser = async () => {
        if (profileUsername === user.username) {
            setActiveUser(user);
            setAnthem(user.anthem)
            fetchTopArtist()
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

            if (profileUser.topArtist) {
                setTopArtist(profileUser.topArtist)
                setTopGenres(profileUser.topArtist.genre)
            }

        }

        fetchTopArtist();
    }


    const fetchTopArtist = async () => {

        console.log(user._id)
        if (isConnected) {
            await dispatch(getTopArtist())
                .then(response => {
                    let genres = [response.payload.data.items[0].genres[1] + " "]
                    setTopGenres(genres)
                    setTopArtist(response.payload.data.items[0]);

                    favArtist['name'] = response.payload.data.items[0].name;
                    favArtist['genre'] = genres[0];
                    favArtist['image'] = response.payload.data.items[0].images[0];
                })
                .then(res => {
                    dispatch(putFavArtist(favArtist))
                    setSpotifyLoading(false);
                })
                .then(ressy => {
                    dispatch(getFavArtist(activeUser._id))
                    console.log(ressy)

                })


        }
    }

    const getFavorite = async (id) => {
        dispatch(getFavArtist(id)).then(response => {
            console.log(response);
        })
    }

    useEffect(() => {
        fetchTopArtist()
        fetchProfileUser()

    }, [isConnected, activeUser, anthem, user], []); //! Important 


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
                                <img src={topArtist.images[0].url} alt={topArtist.name} className='songrecImg' />
                                <div className="songname">
                                    <span>{topArtist.name}</span>
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
                    {!spotifyLoading ? topGenres ? (
                        <div>
                            -{topGenres}
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