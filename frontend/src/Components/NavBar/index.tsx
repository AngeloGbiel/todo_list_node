import Profile from "../Assets/Profile.png";
import * as Ai from "react-icons/ai";
import * as Fi from "react-icons/fi";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NavBarStyled = styled.div`
  height: 100vh;
  width: 20rem;
  background-color: #031621;
  header {
    display: flex;
    width: 100%;
    padding: 30px 20px;
    align-items: center;
    gap: 21px;
    border-bottom: 1px solid #fff;
    img {
      width: 15%;
    }
    h2 {
      font-size: 1.4rem;
    }
  }
  main {
    display: flex;
    flex-direction: column;
    width: 100%;
    border-bottom: 1px solid #fff;
    padding: 30px 20px;
    gap: 15px;
  }
`;

const LinkStyled = styled(Link)`
    color: white;
    display: flex;
    gap: 10px;
    text-decoration: none;
    font-size: 1.2rem;
`


export default function SignUp() {
  return (
    <NavBarStyled>
      <header>
        <img src={Profile} alt="Profile" />
        <h2>Welcome!!</h2>
      </header>
      <main>
        <LinkStyled to={'register'} className="register">
          <p>Sign Up</p>
          <Ai.AiOutlineRead />
        </LinkStyled>
        <LinkStyled to={'login'} className="login">
          <p>Sign In</p>
          <Fi.FiLogIn />
        </LinkStyled>
      </main>
    </NavBarStyled>
  );
}
