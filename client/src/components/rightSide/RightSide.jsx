import React, {useState} from "react";
import './RightSide.css'
import Home from '../../img/home.png'
import Noti from '../../img/noti.png'
import Comment from '../../img/comment.png'
import { UilSetting } from '@iconscout/react-unicons'
import SwitchCard from "../switchCard/SwitchCard";
import ShareModal from "../shareModal/ShareModal";

const RightSide = () => {
    const [modalOpened , setModalOpened] = useState(false)
    
    return (
        <div className="RightSide">
            <div className="navIcons">
                <img src={Home} alt="" />
                <UilSetting/>
                <img src={Noti} alt="" />
                <img src={Comment} alt="" />
            </div>

            <SwitchCard/>

            <button className="button r-button" onClick={()=>setModalOpened(true)}>
                    Share
            </button>
            <ShareModal modalOpened={modalOpened}
                    setModalOpened={setModalOpened}/>
        </div>
    )
}

export default RightSide