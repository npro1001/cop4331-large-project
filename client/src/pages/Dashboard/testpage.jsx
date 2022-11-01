import React from "react";
import { useContext } from "react";
import { Marginer} from '../../components/marginer/index.jsx';


function Testpage() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const onClick = (e) => {
        e.preventDefault()
        navigate('/spotifylogin')
    }

    return (
        <>
            <section className="heading">
                <button onClick={onClick} className='btn btn-block'>Connect to spotify</button>
            </section>
        </>
    )
} 

export default Testpage
