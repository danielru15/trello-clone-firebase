import { createContext, useState, useEffect } from "react";
export { useContext } from "react";
import { db} from '../firebase'
import { collection,addDoc,onSnapshot,query,doc,updateDoc, deleteDoc, serverTimestamp, where, orderBy} from "firebase/firestore";
import { getStorage,getDownloadURL, ref} from "firebase/storage";
import Swal from 'sweetalert2'
export const DatosContext = createContext()

export const DatosProvider = ({ children }) => {
    const [color, setcolor] = useState('')
    const [open, setOpen] = useState(false)
    const [tareas, setTareas] = useState([])
    const [Titulo, setTitulo] = useState('')
    const [Tarea, setTarea] = useState('')
    const [editar, setEditar] = useState(null)
    const [prioridad, setPrioridad] = useState('')
    const [Estado, setEstado] = useState('pendiente')
    const [file, setFile] = useState({
      file:'',
      prevUrl:'',
    })
    let controlModal = () => setOpen(!open)

    // Funcion filtrar
    const [buscar, setBuscar] = useState('')
    const [fPrioridad, setfPrioridad] = useState({
      Urgente: false,
      Alta: false,
      Baja: false,
    })
    const [state, setState] = useState({
      pendiente: false,
      curso: false,
      listo: false,
    });
    // Funcion Crear tarea
    const storage = getStorage()
      const storageRef = ref(storage,`${1111+'s'}/${file.file?.name}`)
    const CrearTarea = async (Titulo,Tarea,prioridad) => {
        try {
          const newUrl = file.file !== '' ? await getDownloadURL(storageRef) : null
            await addDoc(collection(db, "tareas"), {
                titulo:Titulo,
                tarea:Tarea,
                estado:Estado,
                imagen:newUrl ? newUrl : null,
                prioridad:prioridad,
                creado:serverTimestamp()
            })
            setOpen(!open)
            setFile({ file:'', prevUrl:''})
            setTitulo("")
            setTarea("")
            setPrioridad("")
            Swal.fire({
              toast: true,
              icon: 'success',
              position: 'top-end',
              title: 'Tarea creada',
              showConfirmButton: false,
              timer: 1500
            })
            
        } catch (error) {
            console.log(error)
        }
    }
    //Actualizar tarea
    const ActualizarEstado = async (draggableId, Estado) => {
        const taskDocRef =  doc(db,'tareas', draggableId)
       try {
        
          await updateDoc(taskDocRef, {
            estado:Estado,
            actualizado:serverTimestamp()
           })
  
       } catch (error) {
        console.log(error)
       }
    }

    const ActualizarTarea = async (editar) => {
      const newUrl = file.file !== '' ? await getDownloadURL(storageRef) : null
      const taskDocRef =  doc(db,'tareas', editar)
      const url = file.prevUrl !== '' ? file.prevUrl : newUrl
     try {
      
        await updateDoc(taskDocRef, {
          titulo:Titulo,
          tarea:Tarea,
          estado:Estado,
          imagen:url,
          prioridad:prioridad,
          actualizado:serverTimestamp()
         })
         setOpen(!open)
         setFile({ file:'', prevUrl:''})
         setTitulo("")
         setTarea("")
         setPrioridad("")
         Swal.fire({
           toast: true,
           icon: 'success',
           position: 'top-end',
           title: 'Tarea actualizada',
           showConfirmButton: false,
           timer: 1500
         })


     } catch (error) {
      console.log(error)
     }
  }


    //Eliminar tarea
    const EliminarTarea = async (id) => {
        const taskDocRef = doc(db, 'tareas', id)
        try{
          await deleteDoc(taskDocRef)
        } catch (err) {
          alert(err)
        }
    }    

    useEffect(() => {
      const listaTareas = query(collection(db, 'tareas'))//where("users", "array-contains", "1"))
      onSnapshot(listaTareas, (querySnapshot) => {
        setTareas(querySnapshot.docs.map(doc => ({
          id: doc.id,
          estado:doc.data().estado,
          titulo:doc.data().titulo,
          imagen:doc.data().imagen,
          tarea:doc.data().tarea,
          prioridad:doc.data().prioridad,
          creado:doc.data().creado?.toDate().getTime(),
          //users:doc.data().users,
          actualizado: doc.data().actualizado !== undefined ? doc.data().actualizado?.toDate().getTime() : null
        })))
      }) 
    }, [])


    return (
        <DatosContext.Provider value={{
            state, 
            setState,
            fPrioridad, 
            setfPrioridad,
            buscar, 
            setBuscar,
            ActualizarTarea,
            editar, 
            setEditar,
            controlModal,
            open, 
            setOpen,
            color, 
            setcolor,
            CrearTarea,
            EliminarTarea,
            ActualizarEstado,
            tareas,
            setTareas,
            Titulo, 
            setTitulo,
            Tarea, 
            setTarea,
            Estado, 
            setEstado,
            prioridad, 
            setPrioridad,
            file, setFile
        }}>
            {children}
        </DatosContext.Provider>
    )
}