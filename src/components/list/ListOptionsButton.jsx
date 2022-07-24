import { useState } from 'react'
import {
  Button,
  Menu,
  MenuItem,
  Divider,
  IconButton
} from '@mui/material'

import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import styled from 'styled-components'
import DeleteIcon from '@mui/icons-material/Delete';
const MenuButtonStyles = styled.span`
  
`;

export default function ListOptionsButton() {
  const navigate = useNavigate()
  const projects = useSelector(state => state.projects)
  const [anchor, setAnchor] = useState(null);

  const handleClick = (e) => {}

  const handleClose = () => {}

  return (
    <MenuButtonStyles>
        <IconButton color="secondary" onClick={handleClick}>
          <DeleteIcon/>
        </IconButton>

    </MenuButtonStyles>
  );
}