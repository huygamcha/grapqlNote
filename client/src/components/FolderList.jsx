/* eslint-disable react/prop-types */
import { List, Card, CardContent ,Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import NewFolder from './NewFolder';

// eslint-disable-next-line react/prop-types
function FolderList({ folders }) {
    const [activeFolder, setActiveFolder] = useState();
    const {folderId} = useParams();
  
    useEffect(() => {
        setActiveFolder(folderId);
    },[folderId])
    
  return (
    <List  sx={{
        width: '100%',
        bgcolor: '#7D9D9C',
        height: '100%',
        padding: '10px',
        textAlign: 'left',
        overflowY: 'auto',
        
      }}
      subheader={
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography sx={{ fontWeight: 'bold', color: 'white' }}>
            Folders
          </Typography>
          <NewFolder />
        </Box>
      }
      >
      {folders.map(({ id, name }) => (
        <Link to={`folders/${id}`}  key={id} style={{textDecoration: 'none'}}>
          <Card style={{fontSize: '18px', marginBottom: '15px', background : activeFolder === id ? '#fc9c9c' : 'white'}} >
            <CardContent>{name}</CardContent>
          </Card>
        </Link>
      ))}
    </List>
  );
}

export default FolderList;
