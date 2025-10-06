import React from 'react'
import Button, {
  BUTTON_TYPE_CLASSES,
} from '../button/button.component'
import { LuListFilter } from "react-icons/lu";
import styled from 'styled-components';


const FilterIcon = styled.i`
    color: #003889;
    font-size: 20px;
`;

const FilterBtn = styled(Button)`
    width: 140px;
    height: 49px;
    border-radius: 50px;
    align-items: center;
    border: 1px solid #8C97FD;
    background-color: #fff;
    color: #1B1B1B;
    font-size: 20px;

    &:hover {
        border: 1px solid #8C97FD;
    }
`;

const FilterButton = ({handleFilter}) => {
  return (
    <FilterBtn buttonType={BUTTON_TYPE_CLASSES.curved} onClick={handleFilter}>
        <FilterIcon><LuListFilter /></FilterIcon>
        Filter
    </FilterBtn>
  )
}

export default FilterButton