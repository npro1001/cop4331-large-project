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
import loadingCir from '../../img/loading-gif.gif'



const InfoCard = () => {

    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isConnected } = useSelector((store) => store.spotify)
    const user = useSelector((state) => state.auth.user)

    const [modalOpened, setModalOpened] = useState(false)
    const [topArtist, setTopArtist] = useState(null);
    const [topGenres, setTopGenres] = useState(null);
    const [activeUser, setActiveUser] = useState({})
    const [anthem, setAnthem] = useState();
    const [spotifyLoading, setSpotifyLoading] = useState(true)

    const profileUsername = params.username;
    let profileUser;

    const fetchProfileUser = async () => {
        if (profileUsername === user.username) {
            setActiveUser(user);
            setAnthem(user.anthem)
        }

        else {
            const res = await fetch(`/api/users/${profileUsername}`, {
                method: 'GET',
                headers: { 'Accept': 'application/json' },
            })
            profileUser = await res.json();
            setActiveUser(profileUser);
            setAnthem(profileUser.anthem)
        }


    }

    useEffect(() => {

        if (isConnected) {
            dispatch(getTopArtist())
                .then(response => {
                    let genres = [response.payload.data.items[0].genres+" ", response.payload.data.items[1].genres+""]
                    setTopGenres(genres)
                    setTopArtist(response.payload.data.items[0]);
                    setSpotifyLoading(false);

                })

        }
   
        fetchProfileUser()

    }, [isConnected], [activeUser], [anthem],[topGenres], [topArtist],[user]); //! Important


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
                    <b>Top Genres</b>
                </span>
                <span>
                    {!spotifyLoading ?
                        user.username === activeUser.username && topGenres ? (
                            <div>
                                {topGenres.map((genres, index) => {

                                    return (
                                        <div key={index}>
                                            <><span>{genres}</span></>
                                            
                                        </div>
                                    )

                                })}
                            </div>
                        ) : (
                            <div>
                                <p> Top Genre Not Found </p>
                            </div>
                        ) : <img className="loadingCircle" src={loadingCir} alt="loading" />}
                </span>
            </div>
            <div className="info">
                <span>
                    <b>Top Artist</b>
                </span>
                <span>
                    {!spotifyLoading ? user.username === activeUser.username && topArtist ? (
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

            <button className='button logout-button' onClick={onLogout}>Logout</button>

        </div >
    )
}

export default InfoCard