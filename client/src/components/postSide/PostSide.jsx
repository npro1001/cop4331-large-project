import React from "react";
import PostContainer from "../PostContainer/PostContainer";
import PostShare from "../postShare/PostShare";
import './PostSide.css';

const PostSide = () => {
    return (
        <div className="PostSide">
            <PostShare/>
            <PostContainer/>
        </div>
    )
}


export default PostSide