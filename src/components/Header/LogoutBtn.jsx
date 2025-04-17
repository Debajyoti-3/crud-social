import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../Appwrite/auth'
import { logout } from '../../store/authSlice'

function LogoutBtn() {
    const dispatch = useDispatch();
    const handleLogout =()=>{
        authService.logout().then(
            dispatch(logout())
            .catch((error)=>{
                console.log(":: System Error ::",error);
            })
        )
    }
  return (
    <button className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full' onClick={handleLogout}>
        logout
    </button>
  )
}

export default LogoutBtn
