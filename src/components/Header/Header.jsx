import React from 'react'
import {useSelector} from 'react-redux'
import {LogoutBtn, Logo,Container} from '../index'
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


function Header() {

  const authStatus = useSelector((state)=> state.auth.status)
  const navigate = useNavigate()
  const navItems = [
    {
      name:"Home",
      slug: '/',
      active:true
    },
    {
      name:"Login",
      slug: '/login',
      active: !authStatus
    },
    {
      name:"Signup",
      slug: '/signup',
      active: !authStatus
    },
    {
      name:"All Posts",
      slug: '/all-posts',
      active: authStatus
    },
    {
      name:"Add Posts",
      slug: '/add-post',
      active: authStatus
    }, 
  ]
  return (
    <div className='flex justify-center'>
    <header className='py-3  bg-[#775B59] w-[1000px] m-[10px] rounded-[9px] shadow-2xl'>
      <Container>
      <nav className='flex'>
        
        <div className='mr-4 h-[50px] w-[50px] rounded-[30px]'>
          <Link to='/'>
          <Logo  />
          </Link>
        </div>
        
          <ul className='flex ml-auto'>
            {navItems.map((item) => item.active ?  (
              <li key={item.name}>
              <button onClick={()=>navigate(item.slug)}
                className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'>
              {item.name}
              </button>
              </li>
            ): null)}
            {
              authStatus && (
                <li>
                <LogoutBtn/>
                </li>
              )
            }
          </ul>

        </nav>
      </Container>
    </header>
    </div>
  )
}

export default Header
