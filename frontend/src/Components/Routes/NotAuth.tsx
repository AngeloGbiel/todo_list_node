import { Link } from "react-router-dom"
import styled from "styled-components"

const NotAuthStyled = styled.div`
    font-size: 2rem;
    margin: 2rem;
`

export default function NotAuth(){
    return(
        <NotAuthStyled>
            <p>Session expired, please <Link style={{color:'#2400FF'}} to={'/login'}> log in again to continue</Link></p>
        </NotAuthStyled>
    )
}