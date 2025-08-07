import React from 'react'
import { Link } from 'react-router-dom'
import Home from './Home'

const Login = () => {
  return (
    <div>
        <h1>im login</h1>
        <Link to="/" elements={<Home/>}>click to get to home page</Link>
    </div>
  )
}

export default Login
