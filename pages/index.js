import React, {useContext,useState} from 'react'
import Header from "../components/Header"
import Board from '../components/Board'
import { DatosContext } from "../context/useContext"
import { Button, Grid, Snackbar, Tooltip } from '@mui/material'
import { DragDropContext } from '@hello-pangea/dnd';
import Buttons from '../components/Button'
import Modal from '../components/Modal'
import { FilterList} from '@mui/icons-material'
import Filter from '../components/Filter'

export default function Home() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const openFilter = Boolean(anchorEl);
  const {open, controlModal,color,ActualizarEstado} = useContext(DatosContext)
/*
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
  
   return result
  };
  */

  return (
    <main style={ color !== '' ?{ backgroundColor:color} : {backgroundColor:'rgb(0, 121, 191)'}}>
      <Header/>
      <div className='main'>
        <div className='buttons'>
        <Buttons
          titulo={'Crear Tarea'}
          action={controlModal}
        />
        <Tooltip title="Filtrar tarjetas" arrow>
          <Button variant="outlined" className='button' startIcon={<FilterList/>} onClick={handleClick}>
          Filtrar
          </Button>
      </Tooltip>
        </div>
        <Modal open={open}/>
        <Filter
          open={openFilter}
          anchorEl={anchorEl}
          onClose={handleClose}
          
          />
        {/*DragDropContext onDragend es requerido*/}
        <DragDropContext onDragEnd={(result) => {
            const {destination, source, draggableId} = result
            //console.log(source)
            if(!destination ){
              return
            } 
            if(source.index === destination.index 
              && source.droppableId === destination.droppableId){
                return
            } 
            let Estado = destination.droppableId
            ActualizarEstado(draggableId,Estado)      
        }}>
          <Grid container spacing={4} marginTop={1} marginBottom={4} >
            <Board titulo="pendiente" />
            <Board titulo="curso"/>
            <Board titulo="listo"/>
          </Grid>    
        </DragDropContext>
      </div>  
    </main>
  )
}
