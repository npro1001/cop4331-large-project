import React, { useState } from "react"
import './InfoCard.css'
import { UilPen } from '@iconscout/react-unicons'
import ProfileModal from '../profileModal/ProfileModal'
import { logout, reset } from '../../features/auth/authSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const InfoCard = () => {

    const [modalOpened, setModalOpened] = useState(false)

    const dispatch = useDispatch();
    const navigate = useNavigate()
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
                <h4>Your Info</h4>
                <div><UilPen width='2rem' height='1.2rem' onClick={() => setModalOpened(true)} /></div>
                <ProfileModal modalOpened={modalOpened}
                    setModalOpened={setModalOpened} />

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
                <span> The Strokes</span>
            </div>

            <button className='button logout-button' onClick={onLogout}>Logout</button>

        </div>
    )
}

export default InfoCard