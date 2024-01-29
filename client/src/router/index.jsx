import { createBrowserRouter, Outlet } from 'react-router-dom'
import Login from '../pages/Login'
import Home from '../pages/Home'
import AuthProvider from '../context/AuthProvider'
import ProtectRouter from './ProtectRouter'
import ErrorPage from '../pages/ErrorPage'
import NoteList from '../components/NoteList'
import Note from '../components/Note'
import { folderList } from '../utils/folders'
import { addNewNote, noteItem, notesList, updateNote } from '../utils/notes'

// eslint-disable-next-line react-refresh/only-export-components

// outlet gọi chung của các component của AuthLayout phần children
// eslint-disable-next-line react-refresh/only-export-components
const AuthLayout = () => {
    return <AuthProvider>
        <Outlet />
    </AuthProvider>
}

// eslint-disable-next-line react-refresh/only-export-components
export default createBrowserRouter([
    {
        element: <AuthLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                element: <Login />,
                path: '/login'
            },
            {
                element: <ProtectRouter />,
                children: [
                    {
                        element: <Home />,
                        path: '/home',
                        loader: folderList,
                        children: [
                            {
                                element: <NoteList />,
                                path: `folders/:folderId`,
                                loader: notesList,
                                action: addNewNote,
                                children: [
                                    {
                                        element: <Note />,
                                        action: updateNote,
                                        loader: noteItem,
                                        path: `notes/:noteId`,
                                    }

                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
])