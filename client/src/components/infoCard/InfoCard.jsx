import React, { useState } from "react"
import './InfoCard.css'
import { UilPen } from '@iconscout/react-unicons'
import ProfileModal from '../profileModal/ProfileModal'
import { logout, reset } from '../../features/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react"
import { catchErrors } from "../../utils"
import { StyledGrid } from "../styles/StyledGrid.js"

import { getTopArtists } from "../../features/spotify/spotify.js"
// import { getTopArtist } from "../../features/spotify/spotifyService"
import { getTopArtist } from "../../features/spotify/spotifySlice"

// import * as UserApi from '../backend/controllers/userController.js'

const InfoCard = () => {

    const [modalOpened, setModalOpened] = useState(false)
    const [topArtist, setTopArtist] = useState("None");
    const { isConnected } = useSelector((store) => store.spotify)

    const dispatch = useDispatch();
    const navigate = useNavigate();

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
        dispatch(getTopArtist())
        .then(response => {
            const userTopArtist = response;
            setTopArtist(userTopArtist.payload.data.items[0]);
            console.log(topArtist)
        })


    });

    const onLogout = () => {
        dispatch(logout())
            .then(() => {
                navigate("/", { replace: true })
            })
            .then(() => {
                dispatch(reset())
            })

    }

    // const params = useParams();

    // const profileUserId = params.dispatchconst[profileUser , setProfileUser] = useState({})
    // const {user} = useSelector((state)=>state.authReducer.authData)

    // useEffect(()=> {
    //     const fetchProfileUser = async()=> {
    //         if(profileUserId === user._id) {
    //             setProfileUser(user)
    //         }
    //         else{
    //             const profileUser = await UserApi.getUserProfile(profileUserId)
    //             setProfileUser(profileUser)
    //         }
    //     }
    //     fetchProfileUser();
    // }, [user])

    return (
        <div className="InfoCard">
            <div className="InfoHead">
                <h4>Your Info</h4>
                <div><UilPen width='2rem' height='1.2rem' onClick={() => setModalOpened(true)} /></div>
                {/* <ProfileModal modalOpened={modalOpened}
                    setModalOpened={setModalOpened} /> */}

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
                        <img src={topArtist.images[0].url} alt={topArtist.name} className='songrecImg'/>
                            <div className="songname">
                                <span>{topArtist.name}</span>
                            </div>
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