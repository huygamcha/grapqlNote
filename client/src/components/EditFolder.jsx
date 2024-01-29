/* eslint-disable react/prop-types */
import { Tooltip, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material'
import { IconButton } from '@mui/material'
import { Fragment,  useState } from 'react';
import {  editFolder } from '../utils/folders';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';

function EditFolder({name, id}) {
    console.log('««««« name »»»»»', name);
  const [open, setOpen] = useState(false)
  const [newFolderName, setNewFolderName] = useState(name)


  const handleClose = () => {
    setOpen(false)
    setNewFolderName(name)

  }
  const handleOpenPopup = () => {
    setOpen(true)
  }
  const handleNewFolderNameChange = (e) => {
    setNewFolderName(e.target.value)
  }
  
  const handleAddNewFolder = async () => {
    const addSuccess = await editFolder({id:id ,name: newFolderName})
    console.log('«««««  addSuccess»»»»»', addSuccess);
    window.location.reload()
    handleClose()
  }

 
  return (
    <Fragment>
      <Tooltip title='Edit Folder' onClick={handleOpenPopup}>
        <IconButton size='small'>
          <ModeEditOutlineIcon sx={{ color: 'black' }} />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Folder</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Folder Name'
            fullWidth
            size='small'
            variant='standard'
            sx={{ width: '400px' }}
            autoComplete='off'
            value={newFolderName}
            onChange={handleNewFolderNameChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddNewFolder}>OK</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}

export default EditFolder