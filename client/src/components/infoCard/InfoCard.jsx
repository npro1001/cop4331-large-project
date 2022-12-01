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
import { getTopArtist} from "../../features/spotify/spotifySlice"



const InfoCard = () => {

    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isConnected } = useSelector((store) => store.spotify)
    const [user, setUser] = useState({})
    
    const [modalOpened, setModalOpened] = useState(false)
    const [topArtist, setTopArtist] = useState(null);
    const [topGenres, setTopGenres] = useState(null);
    const [activeUser, setActiveUser] = useState({})
    const [anthem, setAnthem] = useState();
    const [username, setUsername] =useState();

    const profileUsername = params.username;
    let profileUser;

    useEffect(() => {

        dispatch(getMe())
                .then((response) => {
                    setUser(response.payload);
                    setUsername(response.payload.username)
                })
//
        if (isConnected) {
            dispatch(getTopArtist())
                .then(response => {
                    setTopGenres(response.payload.data.items[0].genres)
                    setTopArtist(response.payload.data.items[0]);

                })

        }

        const fetchProfileUser = async () => {
            console.log("CHECKING USER SHIT")
            console.log(user.username);
            if (profileUsername === username) {
                console.log("same name")
                dispatch(getMe())
                .then((response) => {
                    setActiveUser(response.payload);
                    setAnthem(response.payload.anthem)
                })

                console.log("CHECKING SHIT...")
                console.log(activeUser)
                console.log(anthem)
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
        fetchProfileUser()
    }, [isConnected], [activeUser],[user],[anthem], [username]); //! Important


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
                        data={activeUser} />
                </div>) : ("")
                }
            </div>
            <div className="info">
                <span>
                    <b>Anthem</b>
                </span>
                <span> 
                    {anthem ?
                    <SongCard name={anthem.title} artist1={anthem.artist1} image={anthem.image}></SongCard>
                    : 
                    " Anthem Not Selected"}</span>
            </div>
            <div className="info">
                <span>
                    <b>Top Genres</b>
                </span>
                <span>
                    
                    {user.username === activeUser.username && topGenres ? (
                        <div>
                                {topGenres.map((genres, index) => {
                                    <div key ={index}>
                                    return (
                                        <><span>{genres}  </span></>
                                    )
                                    </div>
                                })}
                        </div>
                    ) : (
                        <div>
                            <p> Top Genre Not Found </p>
                        </div>
                    )}
                </span>
            </div>
            <div className="info">
                <span>
                    <b>Top Artist</b>
                </span>
                <span>
                    { user.username === activeUser.username && topArtist ? (
                        <div className="songrec">
                            <div>
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
                    )}
                </span>
            </div >

            <button className='button logout-button' onClick={onLogout}>Logout</button>

        </div >
    )
}

export default InfoCard