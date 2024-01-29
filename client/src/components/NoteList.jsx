import {
    List,
    Card,
    CardContent,
    Box,
    Typography,
    Grid,
    Tooltip,
    IconButton,
  
} from "@mui/material";
import { useEffect, useState } from "react";
import {
    Outlet,
    useParams,
    Link,
    useLoaderData,
    useSubmit,
    useNavigate,
} from "react-router-dom";
import { NoteAddOutlined } from "@mui/icons-material";
import moment from "moment";
import ConfirmDelete from "./ConfirmDelete";
// import { deleteNote } from "../utils/notes";

function NoteList() {
    // lấy giá trị từ loader bên router
    const { data } = useLoaderData();

    const { noteId, folderId } = useParams();
    const folder = { notes: data.folder.notes };

    const [activeNote, setActiveNote] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        if (noteId) {
            setActiveNote(noteId);
            return;
        }

        if (folder.notes.length > 0) {
            navigate(`notes/${folder.notes[0].id}`);
        }
    }, [noteId, folder.notes]);

    const submit = useSubmit();

    // gửi dữ liệu qua action của router
    const handleAddNewNote = () => {
        submit(
            {
                content: "",
                folderId,
            },
            { method: "POST", action: `/home/folders/${folderId}` }
        );
    };

   
    return (
        <Grid container height="100%">
            <Grid
                item
                xs={4}
                sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: "#F0EBE3",
                    height: "100%",
                    overflowY: "auto",
                    padding: "10px",
                    textAlign: "left",
                }}
            >
                <List
                    subheader={
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <Typography sx={{ fontWeight: "bold", color: "Black" }}>
                                Notes
                            </Typography>
                            <Tooltip title="Add Note" onClick={handleAddNewNote}>
                                <IconButton size="small">
                                    <NoteAddOutlined />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    }
                >
                    {folder.notes.map(({ id, content, updatedAt }) => (
                        <Link
                            to={`notes/${id}`}
                            key={id}
                            style={{ textDecoration: "none" }}
                        >
                            <Card
                                style={{
                                    marginBottom: "15px",
                                    background: activeNote === id ? "#7af47a" : " white",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <CardContent>
                                    {/*  giới hạn chiều ngang của nội dung */}
                                    <div
                                        style={{ fontSize: 18, fontWeight: "bold" }}
                                        dangerouslySetInnerHTML={{
                                            __html: `${content.substring(0, 30) || "Empty"}`,
                                        }}
                                    />
                                    <Typography sx={{ fontSize: "10px", marginTop: "10px" }}>
                                        {moment(updatedAt).format("MMMM Do YYYY, h:mm:ss a")}
                                    </Typography>
                                </CardContent>

                                <ConfirmDelete text='note'/>
                            </Card>
                        </Link>
                    ))}
                </List>
            </Grid>
            <Grid item xs={8}>
                <Outlet />
            </Grid>
        </Grid>
    );
}

export default NoteList;
