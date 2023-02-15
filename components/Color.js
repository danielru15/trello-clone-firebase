import React, {useContext} from 'react'
import { Divider, Drawer, Grid, IconButton, Box, Paper} from '@mui/material'
import { Close } from '@mui/icons-material'
import {purple, grey,blue, pink, brown, teal,deepOrange,lightBlue, deepPurple} from '@mui/material/colors';
import { DatosContext } from '../context/useContext'


const Color = ({open,funcion}) => {
    const colores = [
        blue[900],
        teal[900],
        deepOrange[900],
        lightBlue[900],
        purple[900],
        brown[900],
        pink[900],
        deepPurple[900],
        grey[800] 
    ]

    const {color, setcolor} = useContext(DatosContext)
  return (
    <Drawer
    onClose={funcion}
    sx={{
        width:340,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width:340,
        },
      }}
        variant="persistent"
        anchor="right"
        open={open}
        
      >
        <div style={{ padding:'0 10px',margin:'5px 0', display:'flex', justifyContent:'space-between' , alignItems:'center'}}>
            <IconButton onClick={funcion}>
                <Close/>
            </IconButton>
            <h2>Colores</h2>
        </div>
        <Divider />
        <Box className="box-color">
        <Grid container spacing={1}>
            { colores.map( c =>
            <Grid item xs={6} key={c}>
                <Paper elevation={1} className="color" style={{ backgroundColor:c}}  value={color} onClick={(e) => setcolor(e.target.style.backgroundColor)} />
            </Grid>
            )
            }
        </Grid>       
        </Box>
      </Drawer>

  )
}

export default Color