import React, {useContext} from 'react'
import { Grid, List, Typography } from '@mui/material'
import { Box } from '@mui/system'
import CardTarea from './CardTarea'
import { Droppable } from '@hello-pangea/dnd';
import { DatosContext } from '../context/useContext';


const Board = ({titulo}) => {
  const {tareas, buscar, fPrioridad,state} = useContext(DatosContext)
  let filtro
  let datosEstado = tareas.filter(tarea => tarea.estado === titulo)
  if (!buscar) {
        filtro = datosEstado
  }else {
    filtro =  datosEstado.filter((dato) =>  fPrioridad[dato.prioridad] || state[dato.estado] || dato.titulo.toLowerCase().includes(buscar.toLocaleLowerCase())  ) 
  }


  return (
    <Droppable droppableId={titulo}>
         {/*  Droppabe require el droppable id, se le pasa el argumento provided */
         (provided, snapShot) => ( 
                <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                    <Box className="board"    {...provided.droppableProps} ref={provided.innerRef} >
                        <Typography variant='h5'>{titulo}</Typography>
                        <Box style={{maxHeight:'25rem', overflow: 'auto'}}>
                        {filtro.map((d,index) => (
                            <CardTarea tarea={d} key={d.id} index={index}/>
                        ))}
                        </Box>
                        
                        {provided.placeholder}
                        
                    </Box>

                </Grid>
            )
         }
    </Droppable>
  )
}

export default Board