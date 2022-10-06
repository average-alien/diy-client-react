import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import axios from "axios"
import BlogForm from "../partials/BlogForm"

export default function NewBlog() {
    const [newBlog, setNewBlog] = useState({
        title: '',
        author: '',
        content: ''
    })
    const [errorMessage, setErrorMessage] = useState()

    const navigate = useNavigate()

    const handleFormChange = e => {
        setNewBlog({...newBlog, [e.target.name]: e.target.value})
    }

    const handleSubmit = async e => {
        try {
            e.preventDefault()
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/blogs`, newBlog)
            navigate(`/blogs/${response.data._id}`)
        } catch (error) {
            console.warn(error)
            if (error.response) {
                setErrorMessage(error.response.data.message)
            }
        }
    }

    return (
        <div>
            <h1>Make a new Post</h1>

            <p>{errorMessage}</p>

            <BlogForm
                blog={newBlog}
                handleFormChange={handleFormChange}
                handleSubmit={handleSubmit}
            />
        </div>
    )
}