import { Modal, useMantineTheme } from '@mantine/core'

function ImageModal({modalOpened, setModalOpened}) {
    const theme = useMantineTheme();

    return(
        <Modal
            overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
            overlayOpacity={0.55}
            overlayBlur={3}
            size='auto'
            opened = {modalOpened}
            onClose={()=>setModalOpened(false)}
        >
        {/* <img></img> */}
        </Modal>
    );
}

export default ImageModal