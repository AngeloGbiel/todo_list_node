import { useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../Context/Context";

const SearchPriorityStyled = styled.div`
  display: flex;
  justify-content: center;
  /* background-color: yellow; */
  padding-bottom: 1.5rem;
  form {
    width: 55%;
    background-color: #ffffff;
    padding: 10px;
    display: flex;
    gap: 10px;
    border-radius: 5px;
    background: #fff;
    input[type="text"] {
      width: 100%;
      height: 2.3rem;
      /* margin: 10px; */
      border-radius: 10px;
      border: none;
      outline: none;
      padding-left: 10px;
      background: #031621;
      color: white;
      font-size: 1.06rem;
    }
  }
`;

export default function SearchPriority() {
    const {setSearch} = useContext(UserContext)
  return (
    <SearchPriorityStyled>
      <form>
        <input
          type="text" 
          placeholder="Search Task" 
          className="form"
          onChange={(e)=>setSearch(e.target.value)}
        />
      </form>
    </SearchPriorityStyled>
  );
}
