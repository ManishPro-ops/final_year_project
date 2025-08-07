import React from 'react'
import { useNavigate } from 'react-router-dom'
import {Link} from useNavigate;
const signup = () => {
  return (
    <div>
      im sign up
      <Link to="/" elements={<Home/>}>click to get to home page</Link>
    </div>
  )
}

export default signup
