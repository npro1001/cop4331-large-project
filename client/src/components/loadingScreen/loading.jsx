import loadingani from '../../img/loadingani.gif'
import styled from 'styled-components'

const LoadingContainer = styled.div`
 
    position: relative;
    top:350px;
    left: 525px;

`

const LoadingIcon = styled.img`
`

function LoadingScreen()
{
    return(
    <LoadingContainer>
        <LoadingIcon src={loadingani} alt="loading..."/>
    </LoadingContainer>
    )
}

export default LoadingScreen