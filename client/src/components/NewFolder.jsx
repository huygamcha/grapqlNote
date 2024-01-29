import { Tooltip, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material'
import { IconButton } from '@mui/material'
import { CreateNewFolderOutlined } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { addNewFolder } from '../utils/folders';
import { useSearchParams, useNavigate } from 'react-router-dom';

function NewFolder() {
  const [open, setOpen] = useState(false)
  const [newFolderName, setNewFolderName] = useState('')
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate();

  const popupName = searchParams.get('popup')

  const handleClose = () => {
    // setOpen(false)
    setNewFolderName('')
    navigate(-1);

  }
  const handleOpenPopup = () => {
    // setOpen(true)
    setSearchParams({ popup: 'add-folder' });
  }
  const handleNewFolderNameChange = (e) => {
    setNewFolderName(e.target.value)
  }
  
  const handleAddNewFolder = async () => {
    const addSuccess = await addNewFolder({name: newFolderName})
    console.log('«««««  addSuccess»»»»»', addSuccess);
    handleClose()
  }

  useEffect(() => {
    if (popupName == 'add-folder') {
        setOpen(true);
        return
    }

    // khi add mới thì 'add-folder' không tồn tại nên close thẻ Input
    setOpen(false);

  }, [popupName])
  return (
    <div>
      <Tooltip title='Add Folder' onClick={handleOpenPopup}>
        <IconButton size='small'>
          <CreateNewFolderOutlined sx={{ color: 'white' }} />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Folder</DialogTitle>
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
    </div>
  )
}

export default NewFolder