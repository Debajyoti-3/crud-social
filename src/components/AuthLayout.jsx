import React,{useEffect,useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'


export default function Protected({children, authentication}) {

    const [loader, setLoader] = useState(true)
    const navigate = useNavigate()
    const authStatus = useSelector(state=> state.auth.status)

    useEffect(()=>{
        // ToDo: make it more easy

         // if (authStatus ===true){
        //     navigate("/")
        // } else if (authStatus === false) {
        //     navigate("/login")
        // }
        
        //let authValue = authStatus === true ? true : false


        if(authentication && authStatus !== authentication){
            navigate("/login")
        } else if(!authentication && authStatus !== authentication){
            navigate("/")
        }
        setLoader(false)
    },[authStatus, authentication, navigate])

 return loader ? <h1>Loading...</h1> : <>{children}</>
}


