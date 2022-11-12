import React, { useState } from "react";
import './Post.css'
import Comment from '../../img/comment.png'
import Share from '../../img/share.png'
import Heart from '../../img/like.png'
import NotLike from '../../img/notlike.png'
import { useSelector } from 'react-redux'
import defaultPFP from '../../img/default-profile.png'
import ImageModal from '../imageModal/ImageModal'

const Post = ({data}) => {

    const [modalOpened, setModalOpened] = useState(false)
    
    const {user} = useSelector((state) => state.auth);
    return (
        <div className="Post">
            <div className="postInfo">
            <img src={user.PFP
              ? user.PFP
              : defaultPFP} alt="Profile picture" />
                <div className="content">
                    <div>
                        <span><b>{user.name}</b></span>
                        <span> @{user.username}</span>
                    </div>
                    
                    <span> {data.caption}</span>
                </div>
            </div>

            
            <img src={data.img} alt="" onClick={() => setModalOpened(true)} />

            <div className="postReact">
                <img src={data.liked?Heart: NotLike} alt="" />
                <img src={Comment} alt="" />
                <img src={Share} alt="" />
            </div>

            <span style={{color: "var(--gray)", fontSize: '13px'}}>{data.likes} likes</span>
            
            <ImageModal modalOpened={modalOpened}
                    setModalOpened={setModalOpened} />

        </div>
    )
}

export default Post