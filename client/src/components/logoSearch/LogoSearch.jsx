import React from 'react'
import { UilSearch } from '@iconscout/react-unicons'
import './LogoSearch.css'
import { useState } from 'react'
import styled from "styled-components";
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const SearchContainer = styled.div`
    position: absolute;
    background: white;
    height: 20%;
    width: 200px;
    z-index:10;
    align-self: center;
    border-radius:10px;
    overflow-y: auto;
    overflow-x: hidden;
    display:none;
    top: 40px;
    filter: drop-shadow(0 0 0.3rem black);

`


const List = styled.ul`
  list-style: none;

`

const Results = styled.li`
    text-decoration: none;

`
const Username = styled.a`
text-decoration: none;
cursor: pointer;

&:hover {
        color:rgba(104,59,159,1);
    }

`

const LogoSearch = () => {
    const navigate = useNavigate();
    let searching = false;
    let results = false;
    const [term, setTerm] = useState("");
    let [users, setUsers] = useState([]);
    useEffect(() =>
    {
        const fetchData = async({term}) =>
        {
            const res = await fetch('/api/users/search', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ payload: term.value })
            })
            const userArray = await res.json();
            setUsers(userArray.payload);
        }

        fetchData({term})
    },[term])

  
    if (term.length > 0) {
        searching = true;
        const lowerCase = term.toLowerCase();
        users = users.filter((index) => {
            if (index.username.toLowerCase().match(lowerCase) || index.username.toLowerCase().match(term)) {
                results = true;
            }

            return index.username.toLowerCase().includes(lowerCase);
        })
    }

    else {
        searching = false;
    }
    

    if (!results) {
        return (
            <div className="LogoSearch">
                <div className="Search">
                    <input type="text" placeholder="#Explore" onChange={e => setTerm(e.target.value.replace(/[^a-z]/gi, ' '))} />
                    <SearchContainer style={{ display: searching ? "inline" : "none" }}>
                        <List>
                            <Results>
                                No users found
                            </Results>
                        </List>
                    </SearchContainer>
                    <div className="s-icon">
                        <UilSearch />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="LogoSearch">
            <div className="Search">
                <input type="text" placeholder="#Explore" onChange={e=> setTerm(e.target.value.replace(/[^a-z]/gi, ' '))} />
                <SearchContainer style={{ display: searching ? "inline" : "none" }}>
                    {users.map((searchee, index) => {
                        return (
                            <div key={index}>
                                <List>
                                    <Results>
                                        <Username onClick={() => {
                                            navigate(
                                                `/profile/${searchee.username}`)
                                                window.location.reload();
                                        }}>{searchee.username}</Username>
                                    </Results>
                                </List>
                            </div>
                        )
                    })}
                </SearchContainer>
                <div className="s-icon">
                    <UilSearch />
                </div>
            </div>
        </div>
    )
}

export default LogoSearch