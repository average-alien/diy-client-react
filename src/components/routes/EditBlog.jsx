import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import BlogForm from '../partials/BlogForm'

export default function EditBlog() {
    const [editBlog, setEditBlog] = useState({
        title: '',
        author: '',
        content: ''
    })
    const [errorMessage, setErrorMessage] = useState('')

    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/blogs/${id}`)
                setEditBlog(response.data)
            } catch (error) {
                console.warn(error)
                if (error.response) {
                    setErrorMessage(error.response.data.message)
                }
            }
        }
        fetchBlog()
    }, [id])

    const handleFormChange = e => {
        setEditBlog({...editBlog, [e.target.name]: e.target.value})
    }

    const handleSubmit = async e => {
        try {
            e.preventDefault()
            const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/blogs/${id}`, editBlog)
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
            <h1>Edit Post</h1>

            <p>{errorMessage}</p>
            
            <BlogForm
                blog={editBlog}
                handleFormChange={handleFormChange}
                handleSubmit={handleSubmit}
            />

            <Link to={`/blogs/${id}`}>Cancel Edit</Link>
        </div>
    )
}