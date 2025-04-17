import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import store from './store/store.js'
import { AuthLayout as Authlayout} from './components/index.js'
import { createBrowserRouter } from 'react-router-dom'
import Signup from './pages/Signup.jsx'
import {Login} from './components/index.js'
import AddPost from './pages/AddPost.jsx'
import AllPosts from './pages/AllPosts.jsx'
import Post from './pages/Post.jsx'
import EditPost from './pages/EditPost.jsx'
import Home from './pages/Home.jsx'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {
      path:'/',
      element:<Home/>
      },
      {
        path: '/login',
        element: (
          <Authlayout authentication={false}>
            <Login/>
          </Authlayout>
        )
      },
      {
        path: '/signup',
        element: (
          <Authlayout authentication={false}>
            <Signup/>
          </Authlayout>
        )
      },
      {
        path: "/all-posts",
        element: (
            <Authlayout authentication={true}>
                {" "}
                <AllPosts />
            </Authlayout>
        ),
    },
    {
        path: "/add-post",
        element: (
            <Authlayout authentication={true}>
                {" "}
                <AddPost />
            </Authlayout>
        ),
    },
    {
        path: "/edit-post/:slug",
        element: (
            <Authlayout authentication={true}>
                {" "}
                <EditPost />
            </Authlayout>
        ),
    },
    {
        path: "/post/:slug",
        element: <Post />,
    },
    ],
  },
 ])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
