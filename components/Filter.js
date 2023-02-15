import React, {useContext, useState} from 'react'
import { Checkbox, Divider, FormControl, FormControlLabel, FormGroup, FormLabel, Popover, Radio, RadioGroup, TextField } from '@mui/material';
import { DatosContext } from '../context/useContext';
const Filter = ({open, anchorEl, onClose}) => {
    const {buscar, setBuscar, fPrioridad, setfPrioridad, state, setState} = useContext(DatosContext)
    const { Urgente, Alta, Baja } = fPrioridad
    const {pendiente,listo,curso} = state
  return (
    <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={onClose}
        anchorOrigin={{vertical: 'bottom', horizontal: 'center',}}
        transformOrigin={{vertical: 'top',horizontal: 'center', }}
        PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.2,
              padding:'0.5rem 1rem',
              width:300,
            },
          }}
    >
        <div style={{margin:'5px 0',  textAlign:'center'}}>
        <FormLabel component="legend">Filtrar</FormLabel>
        </div>
        <Divider className='divider'/>
        <FormLabel component="legend">Palabra clave</FormLabel>
        <TextField fullWidth placeholder='Introduzca una palabra clave...' size='small' margin='dense' value={buscar} onChange={e => setBuscar(e.target.value)}/>
        <Divider className='divider'/>
        <FormLabel component="legend">Prioridad</FormLabel>
        <FormGroup margin="dense">
            <FormControlLabel control={<Checkbox  
                onChange={e => setfPrioridad({
                    ...fPrioridad,
                     [e.target.name]: e.target.checked,
                })}
                name={"Urgente"}
                checked={Urgente}
            />} label="Urgente" />
            <FormControlLabel control={<Checkbox 
                onChange={e => setfPrioridad({
                    ...fPrioridad,
                     [e.target.name]: e.target.checked,
                })}
                name={"Alta"}
                checked={Alta}
            />} label="Alta" />
            <FormControlLabel control={<Checkbox 
                onChange={e => setfPrioridad({
                    ...fPrioridad,
                     [e.target.name]: e.target.checked,
                })}
                name={"Baja"}
                checked={Baja}
            />} label="Baja" />
        </FormGroup>
        <Divider className='divider'/>
        <FormControl>
        <FormLabel>Estado</FormLabel>
        <FormGroup margin="dense">
            <FormControlLabel control={<Checkbox 
                onChange={e => setState({
                    ...state,
                     [e.target.name]: e.target.checked,
                })}
                name={"pendiente"}
                checked={pendiente}
                
             />} label="Pendiente" />
            <FormControlLabel control={<Checkbox
                 onChange={e => setState({
                    ...state,
                     [e.target.name]: e.target.checked,
                })}
                name={"curso"}
                checked={curso}
            />} label="Curso" />
            <FormControlLabel control={<Checkbox
                 onChange={e => setState({
                    ...state,
                     [e.target.name]: e.target.checked,
                })}
                name={"listo"}
                checked={listo}
            />} label="Listo" />
        </FormGroup>
        </FormControl>
    </Popover>
  )
}

export default Filter