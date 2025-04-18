import React,{useEffect, useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {Container, PostForm} from '../components/index';
import appwriteService from '../Appwrite/conf';

function EditPost() {
    const {slug} = useParams();
    const [post, setPost] = useState(null)
    const navigate = useNavigate()

    useEffect(()=>{
        if(slug){
        appwriteService.getPost(slug).then((post)=>{
            if(post){
                setPost(post)
            }
        }).catch((error)=>{
            console.log("Error",error)
        })
    }else{
        navigate('/')
    }
    },[slug, navigate])
    return post ? (
        <div className='py-8'>
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
      ) : null
    
}

export default EditPost
