import React from "react";
import './Post.css'
import Comment from '../../img/comment.png'
import Share from '../../img/share.png'
import Heart from '../../img/like.png'
import NotLike from '../../img/notlike.png'
import PFP from '../../img/pfp.jpg'

const Post = ({data}) => {
    return (
        <div className="Post">
            {/*<img src={PFP} alt="" />*/}
            <div className="detail">
                <div>
                    <span><b>{data.name}</b></span>
                </div>
                
                <span> {data.desc}</span>
            </div>

            
            <img src={data.img} alt="" />

            <div className="postReact">
                <img src={data.liked?Heart: NotLike} alt="" />
                <img src={Comment} alt="" />
                <img src={Share} alt="" />
            </div>

            <span style={{color: "var(--gray)", fontSize: '13px'}}>{data.likes} likes</span>
            


        </div>
    )
}

export default Post