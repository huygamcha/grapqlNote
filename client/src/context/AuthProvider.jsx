import { createContext, useEffect, useState } from "react";
import { getAuth } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export default function AuthProvider({ children }) {

    // fix lỗi refresh token, vì loader của các route luôn chạy trước, nó không kiểm tra refresh token
    const [isLoading, setIsLoading] = useState(true);

    // đoạn mã này sử dụng để đăng nhập và lưu user trên firebase
    const auth = getAuth();
    const navigate = useNavigate();
    useEffect(() => {
        const unsubscribe = auth.onIdTokenChanged((user) => {
            // hàm kiểm tra có còn phiên đăng nhập hay là đã thực hiện logout
            if (user?.uid) {
                setUser(user);
                if (user.accessToken != localStorage.getItem('accessToken')) {
                    localStorage.setItem('accessToken', user.accessToken);
                    window.location.reload();
                }
                setIsLoading(false)
            }
            else {
                // reset user when logout
                setIsLoading(false)
                setUser({});
                localStorage.clear();
                navigate('/');
            }
        })
        // unmount
        return () => {
            unsubscribe();
        }
    }, [auth])
    const [user, setUser] = useState({})
    return <AuthContext.Provider value={{ user, setUser }}>
       {isLoading ?<CircularProgress /> : children}
    </AuthContext.Provider>
}