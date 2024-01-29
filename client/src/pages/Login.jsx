// import React from 'react'
import { Button, Typography } from "@mui/material";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Navigate } from "react-router-dom";
import { requestGraphql } from "../utils/request";

function Login() {
  const auth = getAuth();
  const { user } = useContext(AuthContext)

  // đoạn mã lấy dữ liệu user được lưu ở component login
  const handleWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const { user : {uid, displayName} } = await signInWithPopup(auth, provider)

    //tạo endpoint lưu author vào mỗi khi đăng nhập google
    const query = `
    mutation Mutation($name: String!, $uid: String!) {
      register(name: $name, uid: $uid) { 
        uid
        name 
      }
    }`;
    const data = await requestGraphql({ query, variables: { uid, name: displayName } })
    return data;
    // return data;
  }

  if (user.uid) {
    return <Navigate to='/home' />
  }

  return (
    <>
      <Typography variant="h5" >welcome to my note</Typography>
      <Button variant="outlined" onClick={handleWithGoogle} >Sign in with google</Button>
    </>
  );
}

export default Login;
