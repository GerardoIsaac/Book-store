import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const Update = () => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    price: null,
    cover: "",
  });

  const navigate = useNavigate()
  const location = useLocation()

  const bookId = location.pathname.split("/")[2]
  
  const handleChange = (e) => {
    setBook((prev) => ({...prev, [e.target.name]: e.target.value}))
  }

  const handleClick = async e => {
    e.preventDefault()
    try {
      await axios.put("http://localhost:8800/books/" + bookId, book)
      navigate("/")
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <h2>Update the Book</h2>
    <div className='form'>
      <input type="text" placeholder='title' onChange={handleChange} name='title' />
      <input type="text" placeholder='author' onChange={handleChange} name='author' />
      <input type="number" placeholder='price' onChange={handleChange} name='price' />
      <input type="text" placeholder='cover' onChange={handleChange} name='cover' />
      <button className='formButton' onClick={handleClick}>Update</button>
    </div>
    </>
  )
}

export default Update