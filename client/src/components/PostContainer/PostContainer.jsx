import React from "react";
import './PostContainer.css'
import Post from "../Post/Post";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getPosts } from "../../features/post/postSlice"
import {  useEffect, useState } from "react"
const asyncHandler = require('express-async-handler')

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
    const user  = useSelector((state) => state.auth.user)
    const dispatch = useDispatch()
    var [displayPosts, setDisplayPosts] = useState()
    var posts = []

    useEffect( () => {
        if (user.following.length != 0)
        {
            const fetchData = async() => {
                await dispatch(getPosts(user._id))
                .then(response => {
                    console.log(response.payload)   
                    posts = response.payload
                })
            }
            fetchData()      
        }
        console.log(posts)
    }, [displayPosts], []); //! Important

    //if there are no posts to display
    if (PostData.length < 1) {
        return (
            <><EmptyFeed> No posts to display...</EmptyFeed><AddOn>Try posting something!</AddOn></>
        )
    }
    return (
        <div className="Posts">
            {posts.map((post, id) => {
                return <div key = {id}>
                    <Post data={post}/></div>
            })}
        </div>
    )
}

export default Posts