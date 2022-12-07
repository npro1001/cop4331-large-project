import { Modal, useMantineTheme } from '@mantine/core'
import { useParams } from 'react-router-dom';
import './DeleteModal.css'
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deletePost } from '../../features/post/postSlice'

function DeleteModal({modalOpened, setModalOpened, post}) {
    const theme = useMantineTheme();
    const [activeUser, setActiveUser] = useState({})
    const params = useParams();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const fetchProfileUser = async () => {
        setActiveUser(user);
    }

    useEffect(() => {
        fetchProfileUser()
    },[user]);

    const deleteThisPost = async () => {
        const postId = post.id

        await dispatch(deletePost(postId))
        .then((response) => {
            console.log(response.error)
        })
        .then(() => {
            setModalOpened(false)
            // navigate(`/home`, {replace: true})
            window.location.reload(); //! not clean
        })

    }

    return(
        <Modal
        overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
        overlayOpacity={0.55}
        overlayBlur={3}
        size='35%'
        opened={modalOpened}
        onClose={() => { setModalOpened(false);}}
        >
        <div className="DeleteModal">
            <div className='content'>
                <h3>Delete this post?</h3>
                <div className="buttons">
                    <button onClick={deleteThisPost}>Confirm</button>
                </div>
            </div>
        </div>
        </Modal>
    );
}

export default DeleteModal