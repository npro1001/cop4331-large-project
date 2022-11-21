import React, { useRef, useEffect, useCallback } from 'react';
import { useSpring, animated } from 'react-spring';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import { logout, reset } from '../../features/auth/authSlice'
import { connect } from '../../features/spotify/spotifySlice'


const Background = styled.div`
  width: 100%;
  height: 100%;
  /* left: -5%;
  top: -5%; */
  background: rgba(0, 0, 0, 0.8);
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div`
  width: 50%;
  height: 50%;
  margin: auto;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  display: grid;
  grid-template-columns: 1fr 1fr;
  position: relative;
  z-index: 10;
  border-radius: 10px;
  object-fit: fill;
`;

const ModalImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: fill;
  border-radius: 10px 0 0 10px;
  background: #000;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.8;
  color: #141414;
  object-fit: fill;
  padding: 5%;
  h1 {
    text-align: center;
  }
  p {
    margin-bottom: 1rem;
    text-align: center;
  }
  button {
    width: 70%;
    padding: 10px 24px;
    background: #1DB954;
    color: #fff;
    border: none;
    border-radius: 10px;
    margin-bottom: 2%;
}
a {
    width: 70%;
    padding: 10px 24px;
    text-decoration: none;
    border: none;
    border-radius: 10px;
    margin-bottom: 2%;
}
 .connect-button {
    width: 75%;
    padding: 11px;
    font-size: 15px;
    color: #fff;
    font-weight: 500;
    border: none;
    background: #1DB954;
    border-radius: 15px;
    cursor: pointer;
    transition: all, 240ms ease-in-out;
    align-self: center;
    text-shadow: 0 0 2px #999;
  }
  .connect-button:hover {
    background: #1db954;
    filter: brightness(1.2);
}
  .logout-button {
    width: 75%;
    padding: 11px;
    font-size: 15px;
    color: white;
    font-weight: 500;
    border: none;
    background: #CDBEE0;
    border-radius: 15px;
    cursor: pointer;
    transition: all, 240ms ease-in-out;
    background: var(--purple);
    align-self: center;
    text-shadow: 0 0 2px #999;
}
.logout-button:hover {
    background: rgba(93, 48, 149, 1);
    filter: brightness(1.2);
}
`;

const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`;


export const Modal = ({ showModal, setShowModal }) => {
  const { user } = useSelector((store) => store.auth)
  const modalRef = useRef();
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const animation = useSpring({
    config: {
      duration: 250
    },
    opacity: showModal ? 1 : 0,
    transform: showModal ? `translateY(0%)` : `translateY(-100%)`
  });

  const onLogout = () => {
    dispatch(logout())
        .then(() => {
            navigate("/", { replace: true })
        })
        .then(() => {
            dispatch(reset())
        })
    }

    const onClick = (e) => {
        e.preventDefault() 

        // window.open('http://localhost:5555/api/spotify/connect', '_self');
        // window.location.href = 'http://localhost:5555/api/spotify/connect'
        
        dispatch(connect())
        // .then(() => {
        //     navigate("/home", { replace: true})
        // })
        return true
    }

  return (
    <>
      {showModal ? (
        <Background ref={modalRef}>
          <animated.div style={animation}>
            <ModalWrapper showModal={showModal}>
              <ModalImg src={require('./spotify_modal4.png')} alt='camera' />
              <ModalContent>
                <p>Hey, {user.name}</p>
                <h1>You are not connected to Spotify!</h1>
                <p>Please connect to use the full features of Anthem</p>
                <a className="button connect-button" href="http://localhost:5555/api/spotify/connect" target="_self" >Connect to Spotify</a>
                {/* <button className="button connect-button" onClick={onClick} >2. Connect to Spotify</button> */}
                <button className="button logout-button" onClick={onLogout}>Logout</button>
              </ModalContent>
            </ModalWrapper>
          </animated.div>
        </Background>
      ) : null}
    </>
  );
};