import React from 'react'
import Logo from '../../img/logo.png'
import { UilSearch } from '@iconscout/react-unicons'
import './LogoSearch.css'
import { useState } from 'react'
import styled from "styled-components";
import { useNavigate } from 'react-router-dom'

const SearchContainer = styled.div`
    position: absolute;
    background: white;
    height: 20%;
    width: 13%;
    z-index:10;
    align-self: center;
    border-radius:10px;
    overflow-y: auto;
    overflow-x: hidden;
    display:none;
    top: 80px;
    left:220px;
    filter: drop-shadow(0 0 0.3rem black);

`

// const SearchBar = styled.input`
//     position: absolute;
//     width: 100%;
//     padding: 0.5em;
//     margin: 0.5em;
//     /* color: ${props => props.inputColor || "palevioletred"}; */
//     /* background: papayawhip; */
//     border: none;
//     border-radius: 3px;
// `

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
    const [term, setTerm] = useState('');
    let [users, setUsers] = useState([]);
    const [search, setSearch] = useState(false);

    const handleChange = async (e) => {
        e.preventDefault();
        const res = await fetch('/api/users/search', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ payload: e.value })
        })
        console.log('New Search submit:', e.target.value);
        const userArray = await res.json();
        setUsers(userArray.payload);
        setTerm(e.target.value.replace(/[^a-z]/gi, ' '));
    }
    console.log({users});
    if (term.length > 0) {
        searching = true;
        const lowerCase = term.toLowerCase();
        users = users.filter((index) => {

            if (index.name.toLowerCase().match(lowerCase) || index.name.toLowerCase().match(term)) {
                results = true;
            }

            return index.name.toLowerCase().includes(lowerCase);
        })
    }

    else {
        searching = false;
    }

    if (!results) {
        return (
            <div className="LogoSearch">
                {/* <img src={Logo} alt="Logo" /> */}
                <div className="Search">
                    <input type="text" placeholder="#Explore" onChange={handleChange} />
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
            {/* <img src={Logo} alt="Logo" /> */}
            <div className="Search">
                <input type="text" placeholder="#Explore" onChange={handleChange} />
                <SearchContainer style={{ display: searching ? "inline" : "none" }}>
                    {users.map((searchee, index) => {
                        return (
                            <div key={index}>
                                <List>
                                    <Results>
                                        <Username onClick={() => {
                                            console.log(searchee._id);
                                            console.log(searchee.name);
                                            navigate(
                                                `/Profile/${searchee.username}`)
                                        }}>{searchee.name}</Username>
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