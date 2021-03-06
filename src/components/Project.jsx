import { useEffect } from "react";
import styled from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";
import List from "./List";
import { useDispatch, useSelector } from 'react-redux'
import { setLists } from '../reducers/projectReducer'
import { useParams } from 'react-router-dom'
import { IconButton, Grid, Box } from '@mui/material'
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import AddListButton from './project/AddListButton'
import AddUserButton from './project/AddUserButton'
import UserIcons from './project/UserIcons'

import DeleteProjectButton from './project/DeleteProjectButton'
import { Rowing } from "@mui/icons-material";

const projectStyle = {

  height: 500,
  marginLeft: 7,
  textTransform: 'uppercase',
  fontWeight: 'bold',
  overflow: scroll,
}

const UserBarStyle = styled.div`
  margin-left: 20px;
  margin-top: 30px;
  margin-bottom: 30px;
  display: flex;
`

const HeaderStyle = styled.div`
  color: gray;
  margin-bottom: 10px;
  margin-top: 10px;
  margin-left: 6px;
`

const removeFromList = (list, index) => {
  let issuesCopy = [...list.issues]
  const removed = issuesCopy[index]
  issuesCopy.splice(index, 1)
  return [removed, {...list, issues: issuesCopy}]
}

const addToList = (list, index, element) => {
  let issuesCopy =[...list.issues]
  issuesCopy.splice(index, 0, element)
  return {...list, issues: issuesCopy}
}

function Project({project}) {

  const lists = project.lists
  const projectId = project.id


  const dispatch = useDispatch()

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    let listsCopy = [...lists]
    const sourceListId = result.source.droppableId
    const destinationListId =  result.destination.droppableId
    const sourceIndex = result.source.index
    const destinationIndex = result.destination.index

    const sourceList = listsCopy.find(list => list.id === sourceListId)
    const [removedIssue, newSourceList] = removeFromList(sourceList, sourceIndex)
    listsCopy = listsCopy.map(list => list.id === sourceListId ? newSourceList : list)

    const destinationList = listsCopy.find(list => list.id === destinationListId)
    const newDestinationList = addToList(destinationList, destinationIndex, removedIssue)
    listsCopy = listsCopy.map(list => list.id === destinationListId ? newDestinationList : list)

    dispatch(setLists({lists: listsCopy, projectId: projectId}))
  }

  return (
    <Box sx={projectStyle}>
    <Box sx={{ display: 'flex' }}>
      <HeaderStyle>projects / {project.title}</HeaderStyle>
      <DeleteProjectButton project={project}/>
     </Box>
     <Box>
      <UserBarStyle>
        <UserIcons/>
        <AddUserButton/>
      </UserBarStyle>
     </Box>
      <DragDropContext onDragEnd={onDragEnd}>
          {lists !== null && lists.map((list) => <List list={list} key={list.id}/>)}
      </DragDropContext>
      <AddListButton projectId={projectId}/>
    </Box>
  );
}

export default Project;
