import React, {useContext} from 'react'
import { Card, CardHeader, CardContent, Typography, CardMedia, CardActions, Chip } from '@mui/material'
import Buttons from './Button'
import { DatosContext } from '../context/useContext';
import { Draggable } from '@hello-pangea/dnd';


const CardTarea = ({tarea, index}) => {
  const {EliminarTarea, controlModal, setEditar} = useContext(DatosContext)
  let fechahoy = new Intl.DateTimeFormat('es-CO',{
    day:'2-digit',
    month:'2-digit',
    year:'numeric',
    hour:'2-digit',
    minute:'numeric',
    hour12:true
})
const editar = () => {
  controlModal()
  setEditar(tarea.id)
}
  return (
    <Draggable draggableId={tarea.id.toString()} index={index}>
      {(provided, snapShot) => (
           <Card sx={{ maxWidth: 410 }} variant="outlined"
            {...provided.draggableProps}
           {...provided.dragHandleProps}
           ref={provided.innerRef}
           className={snapShot.isDragging ? 'isDragging' : ''}
           >
           <CardHeader
               title={tarea.titulo}
               subheader={fechahoy.format(tarea.creado)}
               
               action={
                 <>
                 <Buttons variante="eliminar" action={() => EliminarTarea(tarea.id)} />
                 <Buttons variante="editar" action={editar}/>
                 </>
               }
           /> 
           { tarea.imagen !== null ?
            <CardMedia
              component="img"
              height="auto"
              image={tarea.imagen !== '' ?tarea.imagen : null}
              alt={tarea.imagen !== '' ?tarea.imagen : null}
            />
            : null}
           <CardContent>
           <Typography variant="body2" color="text.secondary">
           {tarea.tarea}
           </Typography>
         </CardContent>   
         <CardActions>
            <Chip label={tarea.prioridad} color={tarea.prioridad == 'Urgente' ? 'error' : tarea.prioridad == 'Alta' ? 'warning' : 'success'} />
        </CardActions>
       </Card>       
      )}
    </Draggable>
  )
}

export default CardTarea