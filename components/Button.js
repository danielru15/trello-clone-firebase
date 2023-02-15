import React from 'react'
import { IconButton,Button } from '@mui/material'
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Buttons = ({titulo,action,variante}) => {
  return (
      variante === 'editar' ? 
      <Tooltip title="editar">
        <IconButton aria-label="edit" onClick={action} color="warning">
         <EditIcon />
        </IconButton>
      </Tooltip>  
    : variante === 'eliminar' ?
    <Tooltip title="eliminar">
      <IconButton aria-label="eliminar" onClick={action} color="error">
        <DeleteIcon />
      </IconButton>
    </Tooltip>
   
    :
    <Button className='button' variant="outlined" onClick={action}>{titulo}</Button>
  )
}

export default Buttons