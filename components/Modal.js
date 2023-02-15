import React, {useRef, useState, useContext, useEffect} from 'react'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button, Select, FormControl
, InputLabel, MenuItem, FormGroup} from '@mui/material'
import Image from 'next/image'
import { DatosContext } from '../context/useContext';
import { getStorage,getDownloadURL, ref, uploadBytes } from "firebase/storage";

const Modal = ({open}) => {
    const {setOpen,ActualizarTarea,file,setFile,CrearTarea,Titulo, setTitulo,Tarea, setTarea,prioridad, setPrioridad, editar, setEditar,tareas} = useContext(DatosContext)
    const input = useRef(null)
    let id
    //Funcion cerrar 
    const closed = () => {
        setOpen(!open)
        setFile({ file:'',prevUrl:''})
        setTitulo("")
        setTarea("")
        setPrioridad("")
        setEditar(null)
    }
    const storage = getStorage()
    const storageRef = ref(storage,`${1111+'s'}/${file.file.name}`);

    //subir archivo
    const subirArchivo =  async () => {
        try {
            await uploadBytes(storageRef, file.file)
        } catch (error) {
            Console.log(error)
        }
    }
    //Crear tarea
    const handelSubmit = async(e) => {
        e.preventDefault()
        // archivo es igual a vacio
        if (file.file === "" || file.file === undefined) {
            CrearTarea(Titulo,Tarea,prioridad)
        }
        else if (file.file !== '' || file.file !== undefined) {
            await subirArchivo()
            await CrearTarea(Titulo,Tarea,prioridad,file)
        }
    }
    useEffect(() => {
        if(editar !== null){
            id = editar
            const enc = tareas.find(dato => dato.id === editar)
            setTitulo(enc.titulo)
            setTarea(enc.tarea)
            setPrioridad(enc.prioridad)
            setFile({
                file:'',
                prevUrl:enc.imagen
            })
        }
        

      }, [editar])

    // Editar
    const editarTarea = async (e) => {
        e.preventDefault()
        if (file.file === "" || file.file === undefined) {
            ActualizarTarea(editar)
        }
        else if (file.file !== '' || file.file !== undefined) {
            await subirArchivo()
            ActualizarTarea(editar)
        }
       
           
    }
   
    
  return (
    <Dialog open={open} onClose={closed} fullWidth maxWidth={'md'}>
        <DialogTitle>Crear Tarea</DialogTitle>
        <form  ref={input} style={{display:'flex' , flexDirection:'column', justifyContent:'center'}} onSubmit={editar !== null ? editarTarea :handelSubmit  }>
            <FormGroup>
        <DialogContent>
          <DialogContentText>
            Llena el formulario para añadir una tarea
          </DialogContentText>
            <TextField
            id="filled-error-helper-text"
            label="Titulo"
            required
            fullWidth
            variant="outlined"
            margin='dense'
            value={Titulo}
            onChange={e => setTitulo(e.target.value)}
            />
            <TextField
            id="filled-error-helper-text"
            label="tarea"
            required
            fullWidth
            variant="outlined"
            margin='dense'
            maxlenght='200'
            value={Tarea}
            onChange={e => setTarea(e.target.value)}
            />
            <input accept="image/*"  type="file" className="input-file" onChange={e => setFile({
                file:e.target.files[0],
                prevUrl:URL.createObjectURL(e.target.files[0])
            })} margin="dense"/>
            {file.prevUrl !== ""  && file.prevUrl !== null ? <Image
                className='img'
                placeholder='vista previa'
                alt={file.file?.name || ''}
                src={file?.prevUrl}
                width={500}
                height={300}
            /> :
             null}
            <FormControl fullWidth >
            <InputLabel id="demo-simple-select-label">Prioridad</InputLabel>
            <Select
                    labelId="demo-simple-select-label"
                    value={prioridad}
                    onChange={e => setPrioridad(e.target.value)}
                    required
                  >
                <MenuItem key={'Urgente'} value={'Urgente'}>Urgente</MenuItem>
                <MenuItem key={'Alta'} value={'Alta'}>Alta</MenuItem>
                <MenuItem key={'Baja'} value={'Baja'}>Baja</MenuItem>
                
        </Select>
            </FormControl>       
        </DialogContent>
        <DialogActions>
          <Button onClick={closed}>Cancel</Button>
          <Button variant='contained' color='primary' type='submit'>{editar !== null ? 'Actualizar' : 'Crear'}</Button>
        </DialogActions>
        </FormGroup>
        </form>
    </Dialog>
  )
}

export default Modal