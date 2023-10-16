import { useContext } from "react";
import Profile from "../Assets/Profile.png";
import * as Ai from "react-icons/ai";
import * as Fi from "react-icons/fi";
import * as Md from "react-icons/md";
import * as Bi from "react-icons/bi";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../Context/Context";

const HeaderLinkStyled = styled(Link)`
  display: flex;
  width: 100%;
  padding: 30px 20px;
  align-items: center;
  gap: 21px;
  border-bottom: 1px solid #fff;
  color: white;
  text-decoration: none;
  .image {
    height: 4rem;
    width: 4rem;
    border-radius: 50%;
    overflow: hidden; /* Oculta qualquer conteúdo que ultrapasse os limites da div */
  }
  img {
    height: 100%;
  }
  h2 {
    font-size: 1.4rem;
  }
`;

const NavBarStyled = styled.div`
  height: 100vh;
  width: 20rem;
  background-color: #031621;
  position: fixed;
  header {
    display: flex;
    width: 100%;
    padding: 30px 20px;
    align-items: center;
    gap: 21px;
    border-bottom: 1px solid #fff;
    color: white;
    text-decoration: none;
    .image {
      height: 4rem;
      width: 4rem;
      border-radius: 50%;
      overflow: hidden; /* Oculta qualquer conteúdo que ultrapasse os limites da div */
    }
    img {
      height: 100%;
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
  footer {
    position: absolute;
    bottom: 0;
    width: 20rem;
    div {
      display: flex;
      width: 100%;
      align-items: center;
      border-top: 1px solid #fff;
      padding: 30px 20px;
      gap: 15px;
      font-size: 1.1rem;
      .icon {
        font-size: 1.3rem;
      }
      h2,
      .icon {
        cursor: pointer;
      }
    }
  }
`;

const LinkStyled = styled(Link)`
  color: white;
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  font-size: 1.2rem;
`;

export default function SignUp() {
  const { authorization, userData, logout, setEdit } = useContext(UserContext);
  let Image = "";
  let Name = "";
  "image" in userData
    ? (Image = `http://localhost:3000/images/${userData.image}`)
    : "";
  "name" in userData ? (Name = `${userData.name}`) : "";
  return (
    <NavBarStyled>
      {authorization ? (
        <>
          <HeaderLinkStyled to={"edituser"}>
            <div className="image">
              {/* <img src={userData.image ? Image : Profile} alt="Profile" /> */}
              <img
                src={"image" in userData && userData.image ? Image : Profile}
              />
            </div>
            <h2>{"name" in userData && userData.name ? Name : ""}</h2>
          </HeaderLinkStyled>
          <main>
            <LinkStyled to={"todo"} className="register">
              <p>To Do List</p>
              <Ai.AiOutlineUnorderedList />
            </LinkStyled>
            <LinkStyled to={"priority"} onClick={()=>setEdit(false)} className="login">
              <p>Priority</p>
              <Md.MdPriorityHigh />
            </LinkStyled>
          </main>
          <footer>
            <div onClick={logout}>
              <h2>Logout</h2>
              <Bi.BiLogOut className="icon" />
            </div>
          </footer>
        </>
      ) : (
        <>
          <header>
            <img src={Profile} alt="Profile" />
            <h2>Welcome!!</h2>
          </header>
          <main>
            <LinkStyled to={"register"} className="register">
              <p>Sign Up</p>
              <Ai.AiOutlineRead />
            </LinkStyled>
            <LinkStyled to={"login"} className="login">
              <p>Sign In</p>
              <Fi.FiLogIn />
            </LinkStyled>
          </main>
        </>
      )}
    </NavBarStyled>
  );
}
