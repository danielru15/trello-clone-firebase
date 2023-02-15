import { Stack, Avatar, IconButton, Badge, AppBar, Tooltip } from '@mui/material'
import React, {useContext, useState} from 'react'
import { DatosContext } from '../context/useContext'
import { Notifications, Tune } from '@mui/icons-material';
import { grey} from '@mui/material/colors';
import Color from './Color';
import MenuAccount from './MenuAccount';
const Header = () => {
    const {color, setcolor} = useContext(DatosContext)
    const [first, setfirst] = useState(false)
    const controlDrawer = () => setfirst(!first)
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => setAnchorEl(event.currentTarget)
    const handleClose = () => setAnchorEl(null)


    
  return (
    <>
    <header>
        <h1>trello clone firebase</h1>
        <Stack direction="row" spacing={1} alignItems="center">
        <Tooltip title="Notificaciones">
          <IconButton sx={{ color: grey[50]}} >
            <Badge badgeContent={4} color={'secondary'}>
              <Notifications/>
            </Badge>
          </IconButton>
          </Tooltip>
          <Tooltip title="configuraciones">
            <IconButton sx={{ color: grey[50]}} onClick={controlDrawer}  >
            <Tune/>
            </IconButton>
          </Tooltip>
          <Tooltip title="Cuenta">
            <IconButton sx={{ color: grey[50]}} onClick={handleClick}   
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}>
                <Avatar>DR</Avatar>
            </IconButton>
          </Tooltip>
        </Stack>
        
    </header>
    <Color  funcion={controlDrawer} open={first}/>
    <MenuAccount open={open} anchorEl={anchorEl} onClose={handleClose} />
    </>
  )
}

export default Header