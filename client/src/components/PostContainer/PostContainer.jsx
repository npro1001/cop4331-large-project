import React from "react";
import './PostContainer.css'
import Post from "../Post/Post";
import { useSelector } from "react-redux";
import styled from "styled-components";

const EmptyFeed = styled.h1`
    
    align-self: center;
    font-size: 40px;
    color: #391F59;
`
const AddOn = styled.h3`
    align-self: center;
    font-size: 20px;
    color: #391F59;
    bottom: 50px;
    position: relative;
`

const Posts = () => {
    const { PostData, id, author, post } = useSelector((state) => state.post)

    //if there are no posts to display
    if (PostData.length < 1) {
        return (
            <><EmptyFeed> No posts to display...</EmptyFeed><AddOn>Try posting something!</AddOn></>
        )
    }
    return (
        <div className="Posts">
            {PostData.map((post, id) => {
                return <div>
                    <Post data={post} id={id} /></div>
            })}
        </div>
    )
}

export default Posts