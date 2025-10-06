import { LuSearch } from "react-icons/lu";
import styled from "styled-components";
import InputCard from "../input-card/input-card.component";
import { useState } from "react";

const Input = styled.input`
  border: none;
  width: 100%;
  font-size: 18px;
  color: #1b1b1b;
  border-radius: 12px;
  margin-left: 10px;

  &:focus {
    outline: none;
    border-color: unset;
    box-shadow: unset;
  }
`;

const InputIcon = styled.i`
`;

const Search = ({ iconColor, searchTitle }) => {
  const [searchInput, setSearchInput] = useState("");

  return (
    <InputCard iconColor={iconColor}>
      <InputIcon>
        <LuSearch />
      </InputIcon>
      <Input
        placeholder="Search"
        type="text"
        onChange={(e) => setSearchInput(e.target.value)}
      />
    </InputCard>
  );
};

export default Search;
