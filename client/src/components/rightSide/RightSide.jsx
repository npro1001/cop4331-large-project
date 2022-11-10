import React, { useState } from "react";
import './RightSide.css';
import { UilSetting } from '@iconscout/react-unicons'
import { UilHome } from '@iconscout/react-unicons'
import { UilBell } from '@iconscout/react-unicons'
import { UilMessage } from '@iconscout/react-unicons'
import SwitchCard from "../switchCard/SwitchCard";
import ShareModal from "../shareModal/ShareModal";
import { Link } from "react-router-dom";


const RightSide = () => {
    const [modalOpened, setModalOpened] = useState(false)

    return (
        <div className="RightSide">
            <div className="navIcons">
                <Link to='../Home'>
                    <UilHome className="home"></UilHome>
                </Link>
                <UilSetting className="setting" />
                <UilBell className="bell"></UilBell>
                <UilMessage className="message"></UilMessage>
            </div>

           { /*<SwitchCard />*/}

            <button className="button r-button" onClick={() => setModalOpened(true)}>
                Share</button>
            <ShareModal modalOpened={modalOpened}
                    setModalOpened={setModalOpened}/>
        </div>
    )
}

export default RightSide