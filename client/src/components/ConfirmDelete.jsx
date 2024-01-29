import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
    Button,
    CardContent
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useState } from "react";
import { useNavigate, useParams} from 'react-router-dom'
import { deleteFolder } from "../utils/folders";
import { deleteNote } from "../utils/notes";
// eslint-disable-next-line react/prop-types
function ConfirmDelete({text}) {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate()
    const {folderId, noteId} = useParams();

    const handleClickOpen = () => {
        setOpen(true);
    }
    // khi xác nhận sẽ chạy query xoá folder
    const handleClose = async (e) => {
        setOpen(false);
        if (e.target.value == '1') {
            if (text == 'folder'){
                const data = await deleteFolder({ id: folderId });
                navigate(`/home`);
                window.location.reload();
                console.log('««««« data »»»»»', data);
            }
            else {
                const data = await deleteNote({ id: noteId });
                navigate(`/home/folders/${folderId}`);
                window.location.reload();
                console.log('««««« data »»»»»', data);
            }
        }
      
    };


    return (
        <CardContent>
            <DeleteOutlineIcon onClick={handleClickOpen} />
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title"></DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Bạn có muốn xoá folder này không?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button value="0" onClick={handleClose}>
                        Không
                    </Button>
                    <Button
                        value="1"
                        style={{ color: "red" }}
                        onClick={handleClose}
                        autoFocus
                    >
                        Có
                    </Button>
                </DialogActions>
            </Dialog>
        </CardContent>
    );
}

export default ConfirmDelete;
