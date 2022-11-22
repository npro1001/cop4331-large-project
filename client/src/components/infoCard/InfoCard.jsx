import React, { useState } from "react"
import './InfoCard.css'
import { UilPen } from '@iconscout/react-unicons'
import ProfileModal from '../profileModal/ProfileModal'
import { logout, reset } from '../../features/auth/authSlice'
import { spotifyLogout, connect } from '../../features/spotify/spotifySlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from "react"
import { catchErrors } from "../../utils"
import { StyledGrid } from "../styles/StyledGrid.js"
import { getTopArtists } from "../../features/spotify/spotify.js"
// import { getTopArtist } from "../../features/spotify/spotifyService"
import { getTopArtist } from "../../features/spotify/spotifySlice"


const InfoCard = () => {

    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isConnected } = useSelector((store) => store.spotify)
    const { user } = useSelector((state) => state.auth)
    
    const [modalOpened, setModalOpened] = useState(false)
    const [topArtist, setTopArtist] = useState(null);
    const [activeUser, setActiveUser] = useState({})

    const profileUsername = params.username;
    let profileUser;
    const artistImage = "";


    useEffect(() => {

        // Both run multiple times?
        // https://stackoverflow.com/questions/62631053/useeffect-being-called-multiple-times

        // //? Method 1 - using spotify.js 
        // const fetchData = async () => {
        //     const userTopArtist = await getTopArtists()
        //     if(userTopArtist) {
        //         setTopArtist(userTopArtist.data.items[0]);
        //          artistImage = topArtist.images[0].url;
        //     }
        // };
        // catchErrors(fetchData());

        // ? Method 2 - using spotifyService.js
        // A non-serializable value was detected in an action, in the path: `payload.headers`. Value: 
        // https://redux-toolkit.js.org/usage/usage-guide#working-with-non-serializable-data
        if (isConnected) {
            dispatch(getTopArtist())
                .then(response => {
                    setTopArtist(response.payload.data.items[0]);
                })
        }

        const fetchProfileUser = async () => {
            if (profileUsername === user.username) {
                setActiveUser(user);
            }

            else {
                const res = await fetch(`/api/users/${profileUsername}`, {
                    method: 'GET',
                    headers: { 'Accept': 'application/json' },
                })
                profileUser = await res.json();
                setActiveUser(profileUser);
            }
        }
        fetchProfileUser()
    }, []);


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
                <span> Eternal Summer- The Strokes</span>
            </div>

            <div className="info">
                <span>
                    <b>Top Genre</b>
                </span>
                <span> Indie Rock</span>
            </div>

            <div className="info">
                <span>
                    <b>Top Artist</b>

                </span>
                <span>
                    {topArtist ? (
                        <div className="songrec">
                            <div>
                                <img src={topArtist.images[0].url} alt={topArtist.name} className='songrecImg' />
                                {/* <img src={topArtist.images[0].url} alt={topArtist.name} className='songrecImg' /> */}
                                <div className="songname">
                                    <span>{topArtist.name}</span>
                                </div>
                            </div>
                        </div>
                        
            ) : (
            <div>
                <p> top artist not found </p>
                {/* <a className='button' href="http://localhost:5555/api/spotify/connect" target="_self" >Pre Connect To Spotify</a> */}
                {/* <a className='button' href="#" target="_self" onClick={onClick}>Connect to spotify </a> */}
            </div>
                    )}


            {/* <StyledGrid>
                <div className="grid__item__inner">
                    <div className="grid__item__img">
                        <img src={topArtist.images[0].url} alt={topArtist.name} />
                    </div>
                    <h3 class="grid__item__name overflow-ellipsis">{topArtist.name}</h3>
                </div>
            </StyledGrid>  */}

                </span>
            </div >

            <button className='button logout-button' onClick={onLogout}>Logout</button>

        </div >
    )
}

export default InfoCard