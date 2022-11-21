import React, { useState } from "react"
import './InfoCard.css'
import { UilPen } from '@iconscout/react-unicons'
import ProfileModal from '../profileModal/ProfileModal'
import { logout, reset } from '../../features/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from "react"
import { catchErrors } from "../../utils"
import { StyledGrid } from "../styles/StyledGrid.js"
import { getTopArtists } from "../../features/spotify/spotify.js"
// import { getTopArtist } from "../../features/spotify/spotifyService"
import { getTopArtist } from "../../features/spotify/spotifySlice"

// import * as UserApi from '../backend/controllers/userController.js'

const InfoCard = () => {

    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [modalOpened, setModalOpened] = useState(false)
    const [topArtist, setTopArtist] = useState("None");
    const { isConnected } = useSelector((store) => store.spotify)
    const { user } = useSelector((state) => state.auth)
    const [activeUser, setActiveUser] = useState({})
    const profileUsername = params.username;
    let profileUser;

    

    const artistImage = "";


    useEffect( () => {

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
        // dispatch(getTopArtist())
        // .then(response => {
        //     const userTopArtist = response;
        //     setTopArtist(userTopArtist.payload.data.items[0]);
        //     console.log(topArtist)
        // })
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
    }, [user]);


    const onLogout = () => {
        dispatch(logout())
            .then(() => {
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
                    <div className="songrec">
                        <div>
                        {/* <img src={topArtist.images[0].url} alt={topArtist.name} className='songrecImg'/>
                            <div className="songname">
                                <span>{topArtist.name}</span>
                            </div> */}
                        </div>
                    </div>
                

                {/* <StyledGrid>
                <div className="grid__item__inner">
                    <div className="grid__item__img">
                        <img src={topArtist.images[0].url} alt={topArtist.name} />
                    </div>
                    <h3 class="grid__item__name overflow-ellipsis">{topArtist.name}</h3>

                </div>
                </StyledGrid> */}
                    
                </span>
            </div>

            <button className='button logout-button' onClick={onLogout}>Logout</button>

        </div>
    )
}

export default InfoCard