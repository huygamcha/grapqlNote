import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
import './index.css'
import { RouterProvider} from 'react-router-dom'
import router from './router/index.jsx'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Container } from '@mui/system';
import './firebase/config.jsx'
import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

ReactDOM.createRoot(document.getElementById('root')).render(
 <Container maxWidth='lg' sx={{ textAlign: 'center', marginTop: '50px' }}>
  <RouterProvider router={router} />
 </Container>

 

)
