import { Modal, useMantineTheme } from '@mantine/core'
import { useParams } from 'react-router-dom';
import './DeleteModal.css'
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

function DeleteModal({modalOpened, setModalOpened, post}) {
    const theme = useMantineTheme();
    const [activeUser, setActiveUser] = useState({})
    const params = useParams();
    const { user } = useSelector((state) => state.auth);

    const fetchProfileUser = async () => {
        setActiveUser(user);
    }

    useEffect(() => {
        fetchProfileUser()
    },[user]);

    const deletePost = async () => {
        const postId = post.id
        console.log(post.id)

        await fetch(`/api/post/delete`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${user.token}` },
            body: JSON.stringify({postId})
        }).then(response => {
            return response.json()
        })
        .then(data => 
            console.log(data) 
        );
        setModalOpened(false)
        window.location.reload()
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
                    <button onClick={deletePost}>Confirm</button>
                </div>
            </div>
        </div>
        </Modal>
    );
}

export default DeleteModal